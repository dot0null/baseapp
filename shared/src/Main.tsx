import { FC, useEffect, useState } from 'react';
import {
  Header,
  USER_STATUS_NOT_AUTHORIZED,
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
} from './components/Header';
import { Language, Theme } from './types';

export const Main: FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  const [language, setLanguage] = useState<Language>('en');
  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
  };

  const [status, setStatus] = useState<
    | typeof USER_STATUS_NOT_AUTHORIZED
    | typeof USER_STATUS_AUTHORIZATION_REQUIRED
    | typeof USER_STATUS_AUTHORIZED
  >('not_authorized');
  const handleSignInClick = () => {
    setStatus('authorized');
  };
  const handleSignUpClick = () => {
    setStatus('authorized');
  };
  const hangleLogoutClick = () => {
    setStatus('authorization_required');
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus('authorization_required');
    }, 5000);
  }, []);

  let userProps;
  if (status === USER_STATUS_AUTHORIZATION_REQUIRED) {
    userProps = {
      status: USER_STATUS_AUTHORIZATION_REQUIRED,
      onSignInClick: handleSignInClick,
      onSignUpClick: handleSignUpClick,
    };
  } else if (status === 'authorized') {
    userProps = {
      status: USER_STATUS_AUTHORIZED,
      onLogoutClick: hangleLogoutClick,
    };
  } else {
    userProps = { status: USER_STATUS_NOT_AUTHORIZED };
  }

  return (
    <>
      <Header
        theme={theme}
        language={language}
        target={undefined}
        marketUrl="https://market.bitzlato.com"
        p2pUrl="https://bitzlato.com/en/p2p"
        renderNavLinkComponent={({ key, className, to, children, onClick }) => {
          return (
            <a key={key} className={className} href={to} onClick={onClick}>
              {children}
            </a>
          );
        }}
        renderLinkComponent={({ key, className, to, children }) => {
          return (
            <a key={key} className={className} href={to}>
              {children}
            </a>
          );
        }}
        {...userProps}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
};
