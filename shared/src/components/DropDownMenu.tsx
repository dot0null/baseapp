import { FC, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { useEscapeKeyDown } from 'hooks/useEscapeKeyDown';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { getLinks, GetLinksParams } from 'links';
import { RenderNavLinkComponent } from 'types';
import { Box } from './Box';
import * as s from './DropDownMenu.css';
import { DropDownMenuItem } from './DropDownMenuItem';

export type Props = {
  renderNavLinkComponent: RenderNavLinkComponent;
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
  onLogoutClick?: () => void;
} & GetLinksParams;

export const DropDownMenu: FC<Props> = ({
  renderNavLinkComponent,
  onSignInClick,
  onSignUpClick,
  onLogoutClick,
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOutsideClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useOnClickOutside(elementRef, handleOnOutsideClick);
  useEscapeKeyDown(handleOnOutsideClick);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const links = getLinks('sidebar', props);
  const callbacks: Record<string, (() => void) | undefined> = {
    ':onclick:signin': onSignInClick,
    ':onclick:signup': onSignUpClick,
    ':onclick:logout': onLogoutClick,
  };

  const handleItemClick = (callback?: () => void) => () => {
    setIsOpen(false);
    callback?.();
  };

  return (
    <Box className={s.block} ref={elementRef}>
      <Box as="button" type="button" display="block" onClick={handleClick}>
        <Box as="span" className={s.hamburger}>
          <Box as="span" className={s.hamburgerItem} />
          <Box as="span" className={s.hamburgerItem} />
          <Box as="span" className={s.hamburgerItem} />
        </Box>
      </Box>
      <Box
        className={cn(s.dropdown, isOpen && s.dropdownOpened)}
        bg="dropdown"
        borderRadius="2x"
        borderWidth="1x"
        borderStyle="solid"
        borderColor="dropdownBorder"
        fontSize="medium"
        boxShadow="dropdown"
      >
        {links.map((item) => {
          let handleClick = undefined;
          if ((item.type === 'external' && item.to in callbacks) || item.type !== 'external') {
            handleClick = handleItemClick(
              item.type === 'external' && item.to in callbacks ? callbacks[item.to] : undefined,
            );
          }
          console.log(item, handleClick);

          return (
            <DropDownMenuItem
              key={item.to}
              renderNavLinkComponent={renderNavLinkComponent}
              {...item}
              onClick={handleClick}
            />
          );
        })}
      </Box>
    </Box>
  );
};
