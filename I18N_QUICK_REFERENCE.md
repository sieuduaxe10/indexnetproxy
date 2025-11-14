# i18n Quick Reference Card

## 🚀 Most Common Tasks

### Import Translation Hook

```tsx
import { useTranslations } from "next-intl";
```

### Use Translations

```tsx
const t = useTranslations("namespace");
return <h1>{t("key")}</h1>;
```

### Import i18n Navigation

```tsx
import { Link, useRouter, usePathname } from "@/i18n/routing";
```

### Get Current Locale

```tsx
import { useLocale } from "next-intl";
const locale = useLocale(); // "en" or "vi"
```

## 📁 File Locations

| Purpose                 | Path                           |
| ----------------------- | ------------------------------ |
| English translations    | `messages/en.json`             |
| Vietnamese translations | `messages/vi.json`             |
| i18n config             | `i18n/request.ts`              |
| Routing config          | `i18n/routing.ts`              |
| Middleware              | `middleware.ts`                |
| Language switcher       | `components/LanguageSwitcher/` |
| Simple switcher         | `components/LocaleSwitcher/`   |

## 🔤 Translation Namespaces

```
metadata     - Page metadata
common       - Common UI (buttons, actions)
nav          - Navigation
hero         - Hero section
pricing      - Pricing
contact      - Contact form
footer       - Footer
faqs         - FAQs
topCountries - Top countries
partnerships - Partnerships
caseStudies  - Case studies
resellers    - Resellers
trustedBy    - Trusted by section
```

## 💻 Code Snippets

### Server Component with Translations

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("hero");
  return <h1>{t("title")}</h1>;
}
```

### Client Component with Translations

```tsx
"use client";
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("common");
  return <button>{t("getStarted")}</button>;
}
```

### Nested Translation Keys

```tsx
const t = useTranslations("section");
// Access: section.subsection.key
<p>{t("subsection.key")}</p>;
```

### Link with Locale

```tsx
import { Link } from "@/i18n/routing";
<Link href="/about">About</Link>;
```

### Programmatic Navigation

```tsx
import { useRouter } from "@/i18n/routing";

const router = useRouter();
router.push("/contact");
```

### Language Switcher

```tsx
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

<LanguageSwitcher />;
```

### Get Current Path

```tsx
import { usePathname } from "@/i18n/routing";
const pathname = usePathname();
```

## 🌐 URL Examples

```
/           → Redirects to /en
/en         → English home
/vi         → Vietnamese home
/en/pricing → English pricing
/vi/pricing → Vietnamese pricing
```

## ⚡ Quick Commands

```bash
# Start dev server
pnpm dev

# Build project
pnpm build

# Type check
pnpm exec tsc --noEmit

# Lint
pnpm lint
```

## 📝 Adding New Translations

1. Add to `messages/en.json`:

```json
{
  "mySection": {
    "title": "My Title"
  }
}
```

2. Add to `messages/vi.json`:

```json
{
  "mySection": {
    "title": "Tiêu Đề"
  }
}
```

3. Use in component:

```tsx
const t = useTranslations("mySection");
<h1>{t("title")}</h1>;
```

## ⚠️ Common Mistakes to Avoid

❌ Don't use `next/link` - Use `@/i18n/routing`
❌ Don't use `next/navigation` - Use `@/i18n/routing`
❌ Don't hardcode text - Use `useTranslations()`
❌ Don't forget to add translations in both language files

✅ Do use `Link` from `@/i18n/routing`
✅ Do use `useRouter` from `@/i18n/routing`
✅ Do use `useTranslations()` for all text
✅ Do keep translation files in sync

## 🐛 Troubleshooting

**Translation not showing?**

- Check key exists in JSON file
- Verify namespace is correct
- Ensure JSON is valid

**Link not maintaining locale?**

- Use `Link` from `@/i18n/routing`
- Don't use `next/link`

**Language not switching?**

- Check middleware is configured
- Use navigation from `@/i18n/routing`

## 📚 Documentation

- Full docs: `I18N_README.md`
- Usage guide: `I18N_GUIDE.md`
- Setup summary: `I18N_SETUP_SUMMARY.md`
- Integration checklist: `I18N_INTEGRATION_CHECKLIST.md`
