import { FC, ReactNode } from 'react';
import ApiIcon from 'assets/svg/ApiIcon.svg';
import HistoryIcon from 'assets/svg/HistoryIcon.svg';
import LogoutIcon from 'assets/svg/LogoutIcon.svg';
import OrdersIcon from 'assets/svg/OrdersIcon.svg';
import P2PIcon from 'assets/svg/P2PIcon.svg';
import ProfileIcon from 'assets/svg/ProfileIcon.svg';
import QuickExchangeIcon from 'assets/svg/QuickExchangeIcon.svg';
import SignupIcon from 'assets/svg/SignupIcon.svg';
import TrandingIcon from 'assets/svg/TrandingIcon.svg';
import WalletsIcon from 'assets/svg/WalletsIcon.svg';
import { Link } from 'links';
import { RenderNavLinkComponent } from 'types';

import * as s from './DropDownMenuItem.css';
import { Box } from './Box';

interface Props extends Link {
  renderNavLinkComponent: RenderNavLinkComponent;
  onClick?: (() => void) | undefined;
}

const icons: Record<string, ReactNode> = {
  profile: <ProfileIcon />,
  signup: <SignupIcon />,
  quickExchange: <QuickExchangeIcon />,
  trading: <TrandingIcon />,
  wallets: <WalletsIcon />,
  orders: <OrdersIcon />,
  history: <HistoryIcon />,
  p2p: <P2PIcon />,
  api: <ApiIcon />,
  logout: <LogoutIcon />,
};

export const DropDownMenuItem: FC<Props> = ({
  renderNavLinkComponent,
  type,
  to,
  icon,
  children,
  onClick,
}) => {
  const body = (
    <>
      {icon && (
        <Box as="span" className={s.icon}>
          {icons[icon]}
        </Box>
      )}
      {children}
    </>
  );

  if (type === 'link') {
    return (
      <>
        {renderNavLinkComponent({
          key: to,
          className: s.item,
          activeClassName: s.itemActive,
          to,
          onClick,
          children: body,
        })}
      </>
    );
  }

  if (onClick) {
    return (
      <Box as="button" className={s.item} type="button" tabIndex={-1} onClick={onClick}>
        {body}
      </Box>
    );
  }

  return (
    <Box as="a" className={s.item} href={to} onClick={onClick}>
      {body}
    </Box>
  );
};
