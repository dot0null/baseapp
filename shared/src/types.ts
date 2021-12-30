import { ReactNode } from 'react';

export type Language = 'en' | 'ru';
export type Theme = 'light' | 'dark';
export type User = any;

export type RenderLinkComponent = (props: {
  key?: string | undefined;
  className?: string | undefined;
  to: string;
  title?: string | undefined;
  children: ReactNode;
  onClick?: (() => void) | undefined;
}) => ReactNode;

export type RenderNavLinkComponent = (props: {
  key?: string | undefined;
  className: string;
  activeClassName: string;
  to: string;
  children: ReactNode;
  onClick?: (() => void) | undefined;
}) => ReactNode;

export type OptionalWithUndefined<T> = {
  [P in keyof T]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};
