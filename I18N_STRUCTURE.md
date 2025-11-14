# Project Structure After i18n Setup

```
netproxy-index-v2/
│
├── 📱 app/                              # Next.js App Directory
│   ├── 🌍 [locale]/                     # ← Locale-specific routes
│   │   ├── layout.tsx                   # Layout with NextIntlClientProvider
│   │   ├── page.tsx                     # Home page
│   │   ├── not-found.tsx                # 404 page
│   │   ├── cookie-policy/
│   │   │   └── page.tsx
│   │   ├── privacy-policy/
│   │   │   └── page.tsx
│   │   ├── refund-service/
│   │   │   └── page.tsx
│   │   └── term-service/
│   │       └── page.tsx
│   │
│   ├── layout.tsx                       # Root layout (minimal)
│   ├── page.tsx                         # Redirects to locale
│   ├── globals.css                      # Global styles
│   ├── fonts.ts                         # Font definitions
│   └── fonts/                           # Font files
│
├── 🌐 i18n/                             # ← i18n Configuration
│   ├── request.ts                       # Request config (loads translations)
│   ├── routing.ts                       # Routing config & navigation helpers
│   └── types.ts                         # TypeScript type definitions
│
├── 💬 messages/                         # ← Translation Files
│   ├── en.json                          # English translations
│   └── vi.json                          # Vietnamese translations
│
├── 🧩 components/                       # React Components
│   ├── LanguageSwitcher/                # ← Dropdown language switcher
│   │   └── index.tsx
│   ├── LocaleSwitcher/                  # ← Simple select switcher
│   │   └── index.tsx
│   ├── ExampleI18nComponent/            # ← Example usage
│   │   └── index.tsx
│   │
│   ├── Header/
│   ├── Hero/
│   ├── Footer/
│   ├── Pricing/
│   ├── Contact/
│   ├── FAQs/
│   └── ... (other components)
│
├── 🔄 middleware.ts                     # ← Locale detection & routing
│
├── 📝 Configuration Files
│   ├── next.config.ts                   # Next.js config (with next-intl plugin)
│   ├── package.json                     # Dependencies (includes next-intl)
│   ├── tsconfig.json                    # TypeScript config
│   └── tailwind.config.ts               # Tailwind config
│
└── 📚 Documentation                     # ← i18n Documentation
    ├── I18N_README.md                   # Complete documentation
    ├── I18N_GUIDE.md                    # Quick usage guide
    ├── I18N_SETUP_SUMMARY.md            # Setup summary
    ├── I18N_INTEGRATION_CHECKLIST.md    # Integration checklist
    ├── I18N_QUICK_REFERENCE.md          # Quick reference card
    └── I18N_STRUCTURE.md                # This file
```

## 🔄 Request Flow

```
User visits site
    ↓
middleware.ts detects locale
    ↓
Redirects to /en or /vi (or user's browser language)
    ↓
app/[locale]/layout.tsx loads
    ↓
i18n/request.ts loads translation file
    ↓
Messages provided to NextIntlClientProvider
    ↓
Components use useTranslations() to get text
    ↓
Rendered page with translations
```

## 🌐 URL Structure

```
User Request          →  Actual Route           →  Page Rendered
────────────────────────────────────────────────────────────────
/                     →  /en                    →  English home
/about                →  /en/about              →  English about
                         (middleware redirects)

User clicks "VI" flag →  /vi                    →  Vietnamese home
/vi/pricing           →  /vi/pricing            →  Vietnamese pricing
```

## 🎯 Component Usage Flow

```
Component
    ↓
import { useTranslations } from "next-intl"
    ↓
const t = useTranslations("namespace")
    ↓
<h1>{t("key")}</h1>
    ↓
Looks up in messages/[locale].json
    ↓
Returns translated text
    ↓
Renders to user
```

## 🔀 Navigation Flow

```
User clicks Link
    ↓
import { Link } from "@/i18n/routing"
    ↓
<Link href="/about">About</Link>
    ↓
Automatically prefixes with current locale
    ↓
Navigates to /en/about or /vi/about
    ↓
Locale is maintained
```

## 📦 Key Files Explained

| File                           | Purpose                                               | When to Edit                                    |
| ------------------------------ | ----------------------------------------------------- | ----------------------------------------------- |
| `middleware.ts`                | Detects locale from browser, handles redirects        | Rarely (only to change locale detection logic)  |
| `i18n/routing.ts`              | Defines supported locales, exports navigation helpers | When adding new languages                       |
| `i18n/request.ts`              | Loads translation files based on locale               | Rarely (only if changing how translations load) |
| `messages/en.json`             | English translations                                  | Every time you add new text                     |
| `messages/vi.json`             | Vietnamese translations                               | Every time you add new text                     |
| `app/[locale]/layout.tsx`      | Provides translations to all pages                    | Rarely (structure is set)                       |
| `components/LanguageSwitcher/` | UI for changing language                              | When customizing appearance                     |

## 🎨 Adding New Language (e.g., Japanese)

```
1. Add to i18n/routing.ts:
   locales: ["en", "vi", "ja"]

2. Create messages/ja.json
   Copy structure from en.json and translate

3. Update language switchers:
   - components/LanguageSwitcher/index.tsx
   - components/LocaleSwitcher/index.tsx
   Add Japanese option

4. Test:
   Visit /ja to see Japanese version
```

## 🔧 Integration Points

Components that should be updated to use translations:

```
High Priority:
├── Header              → Add LanguageSwitcher + nav translations
├── Hero                → Translate title, subtitle, CTA
├── Pricing             → Translate plans and features
├── Contact             → Translate form labels
└── Footer              → Translate links and text

Medium Priority:
├── TopCountries        → Translate section title
├── CaseStudies         → Translate case study content
├── Resellers           → Translate reseller info
├── Partnerships        → Translate partnership info
└── TrustedBy           → Translate section

Policy Pages:
├── cookie-policy       → Add translations
├── privacy-policy      → Add translations
├── term-service        → Add translations
└── refund-service      → Add translations
```

## 🎯 Best Practices

1. **Always use namespace**: `useTranslations("namespace")` not `useTranslations()`
2. **Keep keys organized**: Group related translations together
3. **Use nested keys**: `t("section.subsection.key")` for better organization
4. **Sync translations**: Always add keys to both en.json and vi.json
5. **Use i18n navigation**: Import from `@/i18n/routing`, not `next/navigation`

## 🚀 Deployment Checklist

Before deploying to production:

✅ All pages work in both languages
✅ Language switcher is visible
✅ Translations are complete
✅ `pnpm build` succeeds
✅ No hardcoded text remains
✅ Links maintain locale
✅ SEO metadata is translated
