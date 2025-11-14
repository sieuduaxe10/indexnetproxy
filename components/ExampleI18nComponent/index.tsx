"use client";

import { useTranslations } from "next-intl";

/**
 * Example component demonstrating how to use translations with next-intl
 *
 * This is a client component example. For server components, you can remove "use client"
 * and the component will work the same way.
 */
export function ExampleI18nComponent() {
  // Get translations for a specific namespace
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{t("subtitle")}</h2>
      <p className="mb-6">{t("description")}</p>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          {t("cta")}
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded">
          {tCommon("learnMore")}
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Translation Keys Used:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>hero.title</li>
          <li>hero.subtitle</li>
          <li>hero.description</li>
          <li>hero.cta</li>
          <li>common.learnMore</li>
        </ul>
      </div>
    </div>
  );
}
