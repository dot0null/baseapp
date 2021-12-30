import { style } from '@vanilla-extract/css';
import { sprinkles } from 'theme/sprinkles.css';

export const userPanel = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: 16,
});

export const canBeHidden = sprinkles({
  display: {
    mobile: 'none',
    desktopXXXL: 'block',
  },
});
