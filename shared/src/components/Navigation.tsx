import { FC } from 'react';
import { getLinks, GetLinksParams } from 'links';
import { RenderNavLinkComponent } from 'types';
import { Box } from './Box';
import * as s from './Navigation.css';
import { Stack } from './Stack';

export type Props = {
  renderNavLinkComponent: RenderNavLinkComponent;
} & GetLinksParams;

export const Navigation: FC<Props> = ({ renderNavLinkComponent, ...props }) => {
  const links = getLinks('nav', props);

  return (
    <Box flexShrink={0} fontSize="medium" pl="3x" mr="auto">
      <Stack marginRight="6x">
        {links.map(({ type, to, children }) =>
          type === 'link' ? (
            renderNavLinkComponent({
              key: to,
              className: s.item,
              activeClassName: s.itemActive,
              to,
              children,
            })
          ) : (
            <Box as="a" key={to} className={s.item} href={to}>
              {children}
            </Box>
          ),
        )}
      </Stack>
    </Box>
  );
};
