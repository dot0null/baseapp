import { FC } from 'react';
import { signIn, signUp, profile } from 'links';
import { /* User */ RenderLinkComponent } from 'types';
import { Box } from './Box';
import { Button } from './Button';
import { LanguageSwitcher, Props as LanguageSwitcherProps } from './LanguageSwitcher';
import { ThemeSwitcher, Props as ThemeSwitcherProps } from './ThemeSwitcher';
import ToProfileIcon from 'assets/svg/ToProfileIcon.svg';
import LogoutIcon from 'assets/svg/LogoutIcon.svg';

import * as s from './UserPanel.css';
import { Spinner } from './Spinner';
import { sprinkles } from 'theme/sprinkles.css';
import { Stack } from './Stack';

export const USER_STATUS_NOT_AUTHORIZED = 'not_authorized' as const;
export const USER_STATUS_AUTHORIZATION_REQUIRED = 'authorization_required' as const;
export const USER_STATUS_AUTHORIZED = 'authorized' as const;

export type Props = {
  responsiveMode?: boolean;
  renderLinkComponent: RenderLinkComponent;
} & LanguageSwitcherProps &
  ThemeSwitcherProps &
  (
    | {
        status: typeof USER_STATUS_NOT_AUTHORIZED;
      }
    | {
        status: typeof USER_STATUS_AUTHORIZATION_REQUIRED;
        onSignInClick: () => void;
        onSignUpClick: () => void;
      }
    | {
        status: typeof USER_STATUS_AUTHORIZED;
        // user: User;
        onLogoutClick: () => void;
      }
  );

export const UserPanel: FC<Props> = ({
  responsiveMode = false,
  language,
  theme,
  renderLinkComponent,
  onLanguageChange,
  onThemeChange,
  ...props
}) => {
  if (props.status === USER_STATUS_NOT_AUTHORIZED) {
    return (
      <div className={s.userPanel}>
        <Spinner />
      </div>
    );
  }

  return (
    <Box className={s.userPanel}>
      {props.status === 'authorization_required' && (
        <>
          <Box className={responsiveMode ? s.canBeHidden : undefined} mr="5x">
            <Button onClick={props.onSignInClick}>{signIn[language]}</Button>
          </Box>
          <Box className={responsiveMode ? s.canBeHidden : undefined} mr="5x">
            {/* signup ID is needed for GA event */}
            <Button id="signup" color="secondary" onClick={props.onSignUpClick}>
              {signUp[language]}
            </Button>
          </Box>
        </>
      )}
      <Stack alignItems="center" marginRight="5x">
        <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
        <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
        {props.status === 'authorized' && (
          <Box cursor="pointer">
            {renderLinkComponent({
              className: sprinkles({
                color: { default: 'interactive', hover: 'interactiveHighlighted' },
              }),
              to: '/profile',
              title: profile[language],
              children: <ToProfileIcon />,
            })}
          </Box>
        )}
        {props.status === 'authorized' && (
          <Box
            as="button"
            type="button"
            color={{ default: 'interactive', hover: 'interactiveHighlighted' }}
            onClick={props.onLogoutClick}
          >
            <LogoutIcon />
          </Box>
        )}
      </Stack>
    </Box>
  );
};
