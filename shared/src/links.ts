import { Language } from './types';

type ItemMap = Record<Language, string>;

type LinkItems = {
  type: 'market' | 'p2p' | 'external';
  viewer?: 'any' | 'user' | 'unknown';
  icon?: string | undefined;
  content: string | ItemMap;
  link: string | ItemMap;
  // children?: LinkItem[];
}[];

type LinkType = 'link' | 'external';
export type Link = {
  type: LinkType;
  icon?: string | undefined;
  to: string;
  children: string;
};
type Links = Link[];

const links: LinkItems = [
  {
    type: 'market',
    link: '/quick-exchange',
    content: {
      ru: 'Быстрый обмен',
      en: 'Quick Exchange',
    },
  },
  {
    type: 'market',
    link: '/trading',
    content: {
      ru: 'Торговля',
      en: 'Trade',
    },
  },
  {
    type: 'market',
    viewer: 'user',
    link: '/wallets',
    content: {
      ru: 'Кошельки',
      en: 'Wallets',
    },
  },
  {
    type: 'market',
    viewer: 'user',
    link: '/orders',
    content: {
      ru: 'Ордера',
      en: 'Orders',
    },
  },
  {
    type: 'market',
    viewer: 'user',
    link: '/history',
    content: {
      ru: 'История',
      en: 'History',
    },
  },
  {
    type: 'p2p',
    link: '/',
    content: {
      ru: 'P2P Торговля',
      en: 'P2P Trading',
    },
  },
  // {
  //   type: 'market',
  //   link: '',
  //   content: {
  //     'ru': 'Отчеты',
  //     en: 'Reports',
  //   }
  // }
];

export const signIn: ItemMap = {
  ru: 'Войти',
  en: 'Sign In',
};

export const signUp: ItemMap = {
  ru: 'Регистрация',
  en: 'Sign Up',
};

export const profile: ItemMap = {
  ru: 'Профиль',
  en: 'Profile',
};

export const logout: ItemMap = {
  ru: 'Выйти',
  en: 'Logout',
};

const sidebarLinks: LinkItems = [
  {
    type: 'market',
    viewer: 'user',
    icon: 'profile',
    link: '/profile',
    content: {
      ru: 'Профиль',
      en: 'Profile',
    },
  },
  {
    type: 'external',
    viewer: 'unknown',
    icon: 'profile',
    link: ':onclick:signin',
    content: signIn,
  },
  {
    type: 'external',
    viewer: 'unknown',
    icon: 'signup',
    link: ':onclick:signup',
    content: signUp,
  },
  {
    type: 'market',
    viewer: 'any',
    icon: 'quickExchange',
    link: '/quick-exchange',
    content: {
      ru: 'Быстрый обмен',
      en: 'Quick Exchange',
    },
  },
  {
    type: 'market',
    viewer: 'any',
    icon: 'trading',
    link: '/trading',
    content: {
      ru: 'Торговля',
      en: 'Trade',
    },
  },
  {
    type: 'market',
    viewer: 'user',
    icon: 'wallets',
    link: '/wallets',
    content: {
      ru: 'Кошельки',
      en: 'Wallets',
    },
  },
  {
    type: 'market',
    viewer: 'user',
    icon: 'orders',
    link: '/orders',
    content: {
      ru: 'Ордера',
      en: 'Orders',
    },
  },
  {
    type: 'market',
    viewer: 'user',
    icon: 'history',
    link: '/history',
    content: {
      ru: 'История',
      en: 'History',
    },
  },
  {
    type: 'p2p',
    viewer: 'any',
    icon: 'p2p',
    link: '/',
    content: {
      ru: 'P2P Торговля',
      en: 'P2P Trading',
    },
  },
  {
    type: 'market',
    viewer: 'any',
    icon: 'api',
    link: '/docs',
    content: {
      ru: 'API Документация',
      en: 'API Documentation',
    },
  },
  {
    type: 'external',
    viewer: 'user',
    icon: 'logout',
    link: ':onclick:logout',
    content: logout,
  },
];

const resolveItem = (item: string | ItemMap, language: Language) => {
  if (typeof item === 'string') {
    return item;
  }

  return item[language];
};

export type TargetParams =
  | {
      target: 'p2p';
      marketUrl: string;
    }
  | {
      target: 'market';
      p2pUrl: string;
    }
  | {
      target: undefined;
      marketUrl: string;
      p2pUrl: string;
    };
export type GetLinksParams = { language: Language; isAuthorized: boolean } & TargetParams;

export const getLinks = (type: 'nav' | 'sidebar', params: GetLinksParams): Links =>
  (type === 'nav' ? links : sidebarLinks)
    .filter((item) => {
      switch (item.viewer) {
        case 'user':
          return params.isAuthorized;

        case 'unknown':
          return !params.isAuthorized;

        default:
          return true;
      }
    })
    .map((item) => {
      let to = resolveItem(item.link, params.language);
      let type: LinkType = 'external';
      if (item.type === 'market') {
        if (params.target === 'market') {
          type = 'link';
        } else {
          type = 'external';
          to = `${params.marketUrl}${to}`;
        }
      } else if (item.type === 'p2p') {
        if (params.target === 'p2p') {
          type = 'link';
        } else {
          type = 'external';
          to = `${params.p2pUrl}${to}`;
        }
      }

      return {
        type,
        icon: item.icon,
        to,
        children: resolveItem(item.content, params.language),
      };
    });
