import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Header as SharedHeader,
  USER_STATUS_NOT_AUTHORIZED,
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
} from 'shared/Header';
import {
  changeColorTheme,
  RootState,
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectUserInfo,
  selectUserLoggedIn,
  changeUserDataFetch,
  changeLanguage,
  selectUserFetching,
} from 'src/modules';
import { loginWithRedirect } from 'src/helpers/auth0';
import { logoutFetch } from 'src/modules';
import { MarketSelector } from 'src/containers/MarketSelector/MarketSelector';
import { HeaderToolbar } from 'src/containers/HeaderToolbar/HeaderToolbar';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { currentCode, isLoggedIn, user } = useSelector((state: RootState) => ({
    currentCode: selectCurrentLanguage(state),
    isLoggedIn: selectUserLoggedIn(state),
    user: selectUserInfo(state),
  }));
  const colorTheme = useSelector(selectCurrentColorTheme);
  const isUserFetching = useSelector(selectUserFetching);
  const { pathname } = useLocation();
  const isTradingPage = pathname.includes('/trading');

  const handleLanguageChange = (code: string) => {
    if (isLoggedIn) {
      const data = user.data && JSON.parse(user.data);

      if (data && data.language && data.language !== code) {
        dispatch(
          changeUserDataFetch({
            user: {
              ...user,
              data: JSON.stringify({
                ...data,
                language: code,
              }),
            },
          }),
        );
      }
    }

    dispatch(changeLanguage(code));
  };
  const handleThemeChange = () =>
    dispatch(changeColorTheme(colorTheme === 'light' ? 'dark' : 'light'));

  let userProps;
  if (isUserFetching) {
    userProps = { status: USER_STATUS_NOT_AUTHORIZED };
  } else if (!isLoggedIn) {
    userProps = {
      status: USER_STATUS_AUTHORIZATION_REQUIRED,
      onSignInClick: loginWithRedirect,
      onSignUpClick: loginWithRedirect,
    };
  } else {
    userProps = {
      status: USER_STATUS_AUTHORIZED,
      onLogoutClick: () => dispatch(logoutFetch()),
    };
  }

  return (
    <SharedHeader
      theme={colorTheme}
      language={currentCode}
      target="market"
      p2pUrl={`https://bitzlato.com/${currentCode}/p2p`}
      renderNavLinkComponent={(props: any) => <NavLink {...props} />}
      renderLinkComponent={(props: any) => <Link {...props} />}
      {...userProps}
      onThemeChange={handleThemeChange}
      onLanguageChange={handleLanguageChange}
    >
      {isTradingPage && (
        <>
          <MarketSelector />
          <HeaderToolbar />
        </>
      )}
    </SharedHeader>
  );
};

export default Header;
