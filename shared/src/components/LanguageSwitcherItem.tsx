import { FC } from 'react';
import cn from 'classnames';
import EnIcon from 'assets/svg/en.svg';
import RuIcon from 'assets/svg/ru.svg';
import { Language } from 'types';

import * as s from './LanguageSwitcherItem.css';
import { Box } from './Box';

interface Props {
  isActive: boolean;
  language: Language;
  onClick: () => void;
  onLanguageChange: (language: Language) => void;
}

const iconByCode = {
  en: <EnIcon />,
  ru: <RuIcon />,
};

export const LanguageSwitcherItem: FC<Props> = ({
  children,
  isActive,
  language,
  onClick,
  onLanguageChange,
}) => {
  const handleClick = () => {
    onClick();
    onLanguageChange(language);
  };

  return (
    <Box
      as="button"
      className={cn(s.item, isActive && s.itemActive)}
      type="button"
      tabIndex={-1}
      onClick={handleClick}
    >
      <Box as="span" className={s.icon}>
        {iconByCode[language]}
      </Box>
      {children}
    </Box>
  );
};
