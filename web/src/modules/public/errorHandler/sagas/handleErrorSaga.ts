import Bugsnag from '@bugsnag/js';
import { call, put } from 'redux-saga/effects';
import { alertPush } from '../../alert';
import { ErrorHandlerFetch, getErrorData } from '../actions';

export function* handleErrorSaga(action: ErrorHandlerFetch) {
  const { processingType, extraOptions, error } = action.payload;

  if (extraOptions) {
    const { params, type, actionError } = extraOptions;

    if (type) {
      switch (type) {
        default:
          window.console.log(`Unexpected action with type: ${type}`);
          break;
      }
    }

    if (actionError) {
      params ? yield put(actionError(params)) : yield put(actionError(error));
    }
  }

  switch (processingType) {
    case 'sentry':
      yield call(handleCustomError, error);
      break;
    case 'alert':
      yield call(handleAlertError, error);
      break;
    case 'console':
      yield call(handleConsoleError, error);
      break;
    default:
      break;
  }

  yield put(getErrorData());
}

function* handleCustomError(error) {
  for (const item of error.message) {
    yield call(Bugsnag.notify, item);
  }
}

function* handleAlertError(error) {
  yield put(
    alertPush({
      message: error.message,
      code: error.code,
      type: 'error',
    }),
  );
}

function* handleConsoleError(error) {
  yield call(window.console.error, error.message[0]);
}
