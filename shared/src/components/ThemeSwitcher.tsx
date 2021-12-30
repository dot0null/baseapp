import { FC } from 'react';
import Moon from 'assets/svg/Moon.svg';
import Sun from 'assets/svg/Sun.svg';
import { Theme } from 'types';

import * as s from './ThemeSwitcher.css';
import { Box } from './Box';

export interface Props {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSwitcher: FC<Props> = ({ theme, onThemeChange }) => {
  const handleThemeChange = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Box as="button" className={s.themeSwitcher} type="button" onClick={handleThemeChange}>
      <Box as="span" className={s.sun}>
        <Sun />
      </Box>
      <Box as="span" className={s.moon}>
        <Moon />
      </Box>
    </Box>
  );
};
