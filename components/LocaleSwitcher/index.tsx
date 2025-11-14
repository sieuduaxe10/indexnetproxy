"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <select
      value={locale}
      onChange={onSelectChange}
      disabled={isPending}
      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 cursor-pointer text-sm font-medium"
      aria-label="Select language"
    >
      <option value="en">🇺🇸 EN</option>
      <option value="vi">🇻🇳 VI</option>
      <option value="zh">🇨🇳 ZH</option>
      <option value="hi">🇮🇳 HI</option>
    </select>
  );
}
