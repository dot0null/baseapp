import { style } from '@vanilla-extract/css';
import { vars } from 'theme/vars.css';

export const languageSwitcher = style({
  position: 'relative',
});

export const dropdown = style({
  position: 'absolute',
  top: 36,
  right: 0,
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease-out',
  width: 160,
  zIndex: 99990,
});

export const dropdownOpened = style({
  opacity: 1,
  pointerEvents: 'initial',
});

export const language = style({
  color: vars.colors.languageSwitchText,
  cursor: 'pointer',
  fontWeight: '600',
  textTransform: 'capitalize',
  userSelect: 'none',

  selectors: {
    '&:hover': {
      color: vars.colors.languageSwitchTextHover,
    },
    '&::after': {
      borderBottom: '0',
      borderLeft: '.3em solid transparent',
      borderRight: '.3em solid transparent',
      borderTop: '.3em solid',
      content: '',
      display: 'inline-block',
      marginLeft: '.255em',
      verticalAlign: '.255em',
    },
  },
});
