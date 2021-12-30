import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from 'theme/sprinkles.css';

export const button = recipe({
  base: sprinkles({
    display: 'inline-block',
    fontWeight: '600',
  }),

  variants: {
    color: {
      primary: sprinkles({
        bg: {
          default: 'btnPrimaryBg',
          hover: 'btnPrimaryBgHover',
          active: 'btnPrimaryBgActive',
        },
        boxShadow: {
          focusVisible: 'btnPrimaryFocus',
        },
        color: 'btnPrimaryText',
      }),
      secondary: sprinkles({
        bg: {
          default: 'btnSecondaryBg',
          hover: 'btnSecondaryBgHover',
          active: 'btnSecondaryBgActive',
        },
        boxShadow: {
          focusVisible: 'btnSecondaryFocus',
        },
        color: 'btnSecondaryText',
      }),
    },
    size: {
      small: sprinkles({
        fontSize: 'small',
        px: '2x',
        h: '7x',
        borderRadius: '1x',
        // px: 4px
      }),
      medium: sprinkles({
        fontSize: 'medium',
        px: '4x',
        h: '9x',
        borderRadius: '1x',
        // px: 6px
      }),
      large: sprinkles({
        fontSize: 'large',
        px: '8x',
        h: '13x',
        borderRadius: '2x',
        // px: 6px
      }),
    },
    disabled: {
      true: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        color: 'primary',
        disabled: true,
      },
      style: sprinkles({
        bg: 'btnPrimaryBgDisabled',
        color: 'btnPrimaryTextDisabled',
      }),
    },
    {
      variants: {
        color: 'secondary',
        disabled: true,
      },
      style: sprinkles({
        bg: 'btnSecondaryBgDisabled',
        color: 'btnSecondaryTextDisabled',
      }),
    },
  ],

  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
