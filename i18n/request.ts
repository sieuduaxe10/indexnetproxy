import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  let translationFile;
  try {
    translationFile = await import(`../messages/${locale}.json`);
  } catch (error) {
    // Fall back to default locale if translation file doesn't exist
    console.warn(
      `Translation file for locale "${locale}" not found, falling back to "${routing.defaultLocale}"`
    );
    locale = routing.defaultLocale;
    translationFile = await import(`../messages/${locale}.json`);
  }

  return {
    locale,
    messages: translationFile.default,
  };
});
