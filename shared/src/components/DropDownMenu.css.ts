import { style } from '@vanilla-extract/css';
import { vars } from 'theme/vars.css';

export const block = style({
  position: 'relative',
});

export const dropdown = style({
  position: 'absolute',
  top: 36,
  left: 0,
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease-out',
  width: 254,
  zIndex: 99990,
});

export const dropdownOpened = style({
  opacity: 1,
  pointerEvents: 'initial',
});

const hamburgerPadding = 16;
const hamburgerItemSize = 18;
const hamburgerSize = hamburgerItemSize + hamburgerPadding * 2;
export const hamburger = style({
  display: 'block',
  width: hamburgerSize,
  height: hamburgerSize,
  padding: hamburgerPadding,
  marginLeft: -hamburgerPadding,
});

export const hamburgerItem = style({
  display: 'block',
  backgroundColor: vars.colors.interactive,
  width: hamburgerItemSize,
  height: 2,
  marginBottom: 5,

  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
});
