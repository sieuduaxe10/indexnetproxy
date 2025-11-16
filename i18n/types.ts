/**
 * Type definitions for i18n
 * This provides better type safety when using translations
 */

import type en from "../messages/en.json";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

export type TranslationNamespace = keyof Messages;

export type TranslationKeys<T extends TranslationNamespace> = keyof Messages[T];
