import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { getCsrfToken } from '../../../../helpers';
import { API, RequestOptions, isSonicEnabled } from '../../../../api';
import { ConfigUpdate, configUpdateData, configUpdateError } from '../actions';

const configUpdateOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: 'sonic',
    headers: { 'X-CSRF-Token': csrfToken },
  };
};

export function* configUpdateSaga(action: ConfigUpdate) {
  try {
    const { scope, key, value } = action.payload;
    const payload = {
      scope,
      key,
      value,
    };

    if (isSonicEnabled()) {
      yield call(
        API.put(configUpdateOptions(getCsrfToken())),
        `/admin/${action.payload.component}/secret`,
        payload,
      );
    }
    yield put(configUpdateData(action.payload));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: configUpdateError,
        },
      }),
    );
  }
}
