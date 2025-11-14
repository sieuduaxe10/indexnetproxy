# Internationalization (i18n) Setup

This project now supports multiple languages using `next-intl` v4.5.3.

## 🌍 Supported Languages

- **English (en)** - Default language
- **Vietnamese (vi)** - Tiếng Việt

## 📁 Project Structure

```
├── app/
│   ├── [locale]/              # Locale-specific pages
│   │   ├── layout.tsx         # Layout with i18n provider
│   │   ├── page.tsx           # Home page
│   │   ├── cookie-policy/
│   │   ├── privacy-policy/
│   │   ├── refund-service/
│   │   └── term-service/
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Redirects to default locale
├── i18n/
│   ├── request.ts             # i18n configuration
│   └── routing.ts             # Routing configuration & navigation
├── messages/
│   ├── en.json                # English translations
│   └── vi.json                # Vietnamese translations
├── components/
│   ├── LanguageSwitcher/      # Dropdown language switcher
│   ├── LocaleSwitcher/        # Simple select language switcher
│   └── ExampleI18nComponent/  # Example usage
└── middleware.ts              # Locale detection & routing
```

## 🚀 How to Use

### 1. Using translations in components

**Server Component:**

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("hero");

  return <h1>{t("title")}</h1>;
}
```

**Client Component:**

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyClientComponent() {
  const t = useTranslations("common");

  return <button>{t("getStarted")}</button>;
}
```

### 2. Adding the Language Switcher

Add to your header or navigation:

```tsx
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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

Or use the simpler select version:

```tsx
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
```

### 3. Using i18n-aware Navigation

Always use the navigation utilities from `@/i18n/routing`:

```tsx
import { Link, useRouter, usePathname } from "@/i18n/routing";

// Link component
<Link href="/about">About</Link>;

// Router hooks
const router = useRouter();
router.push("/contact");

// Get current pathname
const pathname = usePathname();
```

### 4. Adding New Translations

1. Add keys to both language files:

**messages/en.json:**

```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**messages/vi.json:**

```json
{
  "mySection": {
    "title": "Tiêu Đề Của Tôi",
    "description": "Mô Tả Của Tôi"
  }
}
```

2. Use in your component:

```tsx
const t = useTranslations("mySection");
return (
  <div>
    <h1>{t("title")}</h1>
    <p>{t("description")}</p>
  </div>
);
```

## 🔧 Configuration

### Adding a New Language

1. Add locale to `i18n/routing.ts`:

```tsx
export const routing = defineRouting({
  locales: ["en", "vi", "ja"], // Add "ja" for Japanese
  defaultLocale: "en",
  localeDetection: true,
});
```

2. Create `messages/ja.json` with translations

3. Update the language switchers in `components/LanguageSwitcher/` and `components/LocaleSwitcher/`

### Middleware Configuration

The middleware in `middleware.ts` handles:

- Automatic locale detection from browser settings
- Redirecting root `/` to default locale
- Maintaining locale in URLs

## 🌐 URL Structure

- `/` → Redirects to `/en` (or user's preferred locale)
- `/en` → English pages
- `/vi` → Vietnamese pages
- `/en/pricing` → English pricing page
- `/vi/pricing` → Vietnamese pricing page

## 📝 Translation Namespaces

Current translation namespaces in `messages/*.json`:

- `metadata` - Page metadata (title, description)
- `common` - Common UI elements (buttons, actions)
- `nav` - Navigation items
- `hero` - Hero section
- `pricing` - Pricing section
- `contact` - Contact form
- `footer` - Footer content
- `faqs` - FAQ section
- `topCountries` - Top countries section
- `partnerships` - Partnerships section
- `caseStudies` - Case studies section
- `resellers` - Resellers section
- `trustedBy` - Trusted by section

## 🎯 Best Practices

1. **Always use namespaces** - Organize translations by section/component
2. **Use typed navigation** - Import from `@/i18n/routing` instead of `next/navigation`
3. **Keep keys consistent** - Use the same structure across all language files
4. **Test both locales** - Ensure translations work in all supported languages
5. **Use plural forms** - For dynamic content, use next-intl's plural support
6. **Keep translations in sync** - When adding new keys, update all language files

## 🧪 Testing

Run the development server:

```bash
pnpm dev
```

Visit:

- http://localhost:3000 (redirects to default locale)
- http://localhost:3000/en (English)
- http://localhost:3000/vi (Vietnamese)

## 📚 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Example Component](./components/ExampleI18nComponent/index.tsx)

## 🐛 Troubleshooting

**Issue: Translations not showing**

- Check that the translation key exists in the JSON file
- Verify the namespace matches the JSON structure
- Ensure you're using the correct locale

**Issue: Language switch not working**

- Make sure you're using navigation from `@/i18n/routing`
- Check that middleware is configured correctly
- Verify the locale is in the supported locales list

**Issue: Build errors**

- Ensure all locale folders have the same pages
- Check that translation files are valid JSON
- Verify imports are correct
