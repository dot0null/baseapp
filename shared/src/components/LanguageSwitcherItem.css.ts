import { style } from '@vanilla-extract/css';
import { sprinkles } from 'theme/sprinkles.css';
import { vars } from 'theme/vars.css';

export const item = style([
  sprinkles({
    color: {
      default: 'dropdownItemText',
      hover: 'dropdownItemHoverText',
    },
    mr: '6x',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    h: '14x',
    px: '5x',
    border: 'none',
    borderBottomWidth: '2x',
    borderBottomStyle: 'solid',
    borderBottomColor: 'dropdownItemBorderBottom',
    bg: {
      default: 'dropdownItem',
      hover: 'dropdownItemHover',
    },
  }),
  {
    position: 'relative',
    width: '100%',
    selectors: {
      '&:last-child': {
        borderBottomColor: 'transparent',
      },
    },
  },
]);

export const itemActive = style([
  sprinkles({
    color: 'dropdownItemActiveText',
    bg: 'dropdownItemHover',
  }),
  {
    selectors: {
      '&::before': {
        backgroundColor: vars.colors.dropdownItemActiveBefore,
        content: '',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: 3,
      },
    },
  },
]);

export const icon = style([
  sprinkles({
    color: 'dropdownItemIcon',
    size: '6x',
    mr: '4x',
  }),
  {
    selectors: {
      [`${item}:hover &`]: {
        color: vars.colors.dropdownItemHoverIcon,
      },
    },
  },
]);
