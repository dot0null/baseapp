import { style } from '@vanilla-extract/css';
import { sprinkles } from 'theme/sprinkles.css';
import { vars } from 'theme/vars.css';

export const themeSwitcher = sprinkles({
  display: 'flex',
  alignItems: 'center',
  borderWidth: '1x',
  borderStyle: 'solid',
  borderColor: { default: 'themeSwitcherBorder', hover: 'themeSwitcherBorderHover' },
  justifyContent: 'space-around',
  borderRadius: '1x',
  w: '20x',
  h: '9x',
});

export const sun = style({
  display: 'block',
  color: vars.colors.themeSwitcherSun,
  selectors: {
    [`${themeSwitcher}:hover &`]: {
      color: vars.colors.themeSwitcherSunHover,
    },
  },
});

export const moon = style({
  display: 'block',
  color: vars.colors.themeSwitcherMoon,
});
