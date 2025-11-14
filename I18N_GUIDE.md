# i18n Setup Guide

This project uses `next-intl` for internationalization. Here's how to use it in your components:

## Using translations in Server Components

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

## Using translations in Client Components

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyClientComponent() {
  const t = useTranslations("hero");

  return <button>{t("cta")}</button>;
}
```

## Using the Language Switcher

Add the language switcher to your header or navigation:

```tsx
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
// or
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function Header() {
  return (
    <header>
      <nav>
        {/* Your navigation items */}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
```

## Using typed navigation

Use the i18n-aware navigation hooks instead of Next.js defaults:

```tsx
import { Link, useRouter, usePathname } from "@/i18n/routing";

// Use Link for navigation
<Link href="/about">About</Link>;

// Use useRouter for programmatic navigation
const router = useRouter();
router.push("/contact");

// Use usePathname to get current path
const pathname = usePathname();
```

## Adding new translations

1. Add keys to `messages/en.json` and `messages/vi.json`
2. Use the keys in your components with `useTranslations`

Example:

```json
// messages/en.json
{
  "mySection": {
    "title": "My Title",
    "subtitle": "My Subtitle"
  }
}
```

```tsx
const t = useTranslations("mySection");
return <h1>{t("title")}</h1>;
```

## Supported Locales

- `en` - English (default)
- `vi` - Vietnamese

## URL Structure

- `/en` - English pages
- `/vi` - Vietnamese pages
- `/` - Redirects to default locale (English)

The middleware automatically detects the user's preferred language from their browser settings.
