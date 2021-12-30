import { FC, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { useEscapeKeyDown } from 'hooks/useEscapeKeyDown';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { Language } from 'types';
import { Box } from './Box';

import * as s from './LanguageSwitcher.css';
import { LanguageSwitcherItem } from './LanguageSwitcherItem';

export interface Props {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const languages: Language[] = ['en', 'ru'];

export const getLanguageName = (code: Language) => {
  switch (code) {
    case 'en':
      return 'English';
    case 'ru':
      return 'Русский';
    // case 'zh':
    //   return '中国';
    default:
      return 'English';
  }
};

export const LanguageSwitcher: FC<Props> = ({ language, onLanguageChange }) => {
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
  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Box className={s.languageSwitcher} ref={elementRef}>
      <Box className={s.language} onClick={handleClick}>
        {language}
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
        {languages.map((item) => (
          <LanguageSwitcherItem
            key={item}
            language={item}
            isActive={item === language}
            onClick={handleItemClick}
            onLanguageChange={onLanguageChange}
          >
            {getLanguageName(item)}
          </LanguageSwitcherItem>
        ))}
      </Box>
    </Box>
  );
};
