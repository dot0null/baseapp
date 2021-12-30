import { sprinkles } from 'theme/sprinkles.css';

export const item = sprinkles({
  display: {
    mobile: 'none',
    desktop: 'block',
  },
  color: {
    default: 'text',
    hover: 'textHighlighted',
  },
  textDecoration: {
    default: 'none',
    hover: 'underline',
  },
  cursor: 'pointer',
});

export const itemActive = sprinkles({
  color: 'textHighlighted',
});
