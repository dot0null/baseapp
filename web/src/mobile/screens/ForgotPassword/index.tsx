import * as React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { ForgotPasswordScreen } from '../../../screens/ForgotPassword';
import { MobileModal } from '../../components';

const ForgotPasswordMobileScreen: React.FC = () => {
  const history = useHistory();
  const intl = useIntl();

  return (
    <div>
      <MobileModal
        isOpen={true}
        onClose={() => history.push('/trading')}
        onBack={() => history.push('/signin')}
        backTitle={intl.formatMessage({ id: 'page.body.landing.header.button2' })}
        title={intl.formatMessage({ id: 'page.forgotPassword' })}
      >
        <ForgotPasswordScreen />
      </MobileModal>
    </div>
  );
};

export { ForgotPasswordMobileScreen };
