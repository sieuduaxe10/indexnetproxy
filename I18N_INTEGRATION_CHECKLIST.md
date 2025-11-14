# i18n Integration Checklist

Use this checklist to integrate i18n into your existing components.

## 🎯 Components to Update

### High Priority (User-Facing Text)

- [ ] **Header Component** (`components/Header/`)
  - [ ] Add `<LanguageSwitcher />` to navigation
  - [ ] Convert nav links to use translations from `nav` namespace
  - [ ] Use `Link` from `@/i18n/routing` instead of `next/link`

- [ ] **Hero Component** (`components/Hero/`)
  - [ ] Convert title, subtitle, description to use `hero` namespace
  - [ ] Update CTA buttons with translated text

- [ ] **Pricing Component** (`components/Pricing/`)
  - [ ] Use translations from `pricing` namespace
  - [ ] Translate plan names, features, and pricing labels

- [ ] **Contact Component** (`components/Contact/`)
  - [ ] Use translations from `contact` namespace
  - [ ] Translate form labels and placeholders

- [ ] **Footer Component** (`components/Footer/`)
  - [ ] Use translations from `footer` namespace
  - [ ] Update links to use `Link` from `@/i18n/routing`

- [ ] **FAQs Component** (`components/FAQs/`)
  - [ ] Add FAQ questions and answers to translation files
  - [ ] Use translations from `faqs` namespace

### Medium Priority

- [ ] **TopCountries Component** (`components/TopCountries/`)
  - [ ] Use `topCountries` namespace

- [ ] **CaseStudies Component** (`components/CaseStudies/`)
  - [ ] Use `caseStudies` namespace

- [ ] **Resellers Component** (`components/Resellers/`)
  - [ ] Use `resellers` namespace

- [ ] **Partnerships Component** (`components/Partnerships/`)
  - [ ] Use `partnerships` namespace

- [ ] **TrustedBy Component** (`components/TrustedBy/`)
  - [ ] Use `trustedBy` namespace

### Policy Pages

- [ ] **Cookie Policy** (`app/[locale]/cookie-policy/page.tsx`)
  - [ ] Add translations to messages files
  - [ ] Update component to use translations

- [ ] **Privacy Policy** (`app/[locale]/privacy-policy/page.tsx`)
  - [ ] Add translations to messages files
  - [ ] Update component to use translations

- [ ] **Terms of Service** (`app/[locale]/term-service/page.tsx`)
  - [ ] Add translations to messages files
  - [ ] Update component to use translations

- [ ] **Refund Service** (`app/[locale]/refund-service/page.tsx`)
  - [ ] Add translations to messages files
  - [ ] Update component to use translations

## 📝 Code Migration Pattern

### Before (Hardcoded Text)

```tsx
export function MyComponent() {
  return (
    <div>
      <h1>Welcome to NetProxy</h1>
      <button>Get Started</button>
    </div>
  );
}
```

### After (Using Translations)

```tsx
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <button>{tCommon("getStarted")}</button>
    </div>
  );
}
```

### Navigation Links

#### Before

```tsx
import Link from "next/link";

<Link href="/pricing">Pricing</Link>;
```

#### After

```tsx
import { Link } from "@/i18n/routing";

const t = useTranslations("nav");

<Link href="/pricing">{t("pricing")}</Link>;
```

## 📋 Translation File Pattern

When adding new content to translate:

### 1. Add to messages/en.json

```json
{
  "myNewSection": {
    "title": "My Title",
    "description": "My Description",
    "items": {
      "item1": "First Item",
      "item2": "Second Item"
    }
  }
}
```

### 2. Add Vietnamese translation to messages/vi.json

```json
{
  "myNewSection": {
    "title": "Tiêu Đề Của Tôi",
    "description": "Mô Tả Của Tôi",
    "items": {
      "item1": "Mục Đầu Tiên",
      "item2": "Mục Thứ Hai"
    }
  }
}
```

### 3. Use in Component

```tsx
const t = useTranslations("myNewSection");

return (
  <div>
    <h1>{t("title")}</h1>
    <p>{t("description")}</p>
    <ul>
      <li>{t("items.item1")}</li>
      <li>{t("items.item2")}</li>
    </ul>
  </div>
);
```

## ✅ Testing Checklist

After updating each component:

- [ ] Component renders without errors
- [ ] English translations display correctly
- [ ] Vietnamese translations display correctly
- [ ] Language switcher works
- [ ] Navigation maintains locale
- [ ] All links use locale-aware routing
- [ ] Metadata uses correct translations
- [ ] Build succeeds (`pnpm build`)
- [ ] No TypeScript errors

## 🚀 Deployment Checklist

Before deploying:

- [ ] All translation keys have both English and Vietnamese versions
- [ ] No hardcoded text remains in components
- [ ] Language switcher is visible and accessible
- [ ] All pages work in both locales
- [ ] SEO metadata is translated
- [ ] Build passes successfully
- [ ] Test on production build locally
- [ ] Verify locale detection works

## 💡 Tips

1. **Start with high-visibility components** (Hero, Header, Footer)
2. **Test each component** after converting to use translations
3. **Keep translation keys organized** by component/section
4. **Use descriptive key names** that make sense in both languages
5. **Don't forget nested content** like FAQs, lists, etc.
6. **Update one component at a time** to avoid overwhelming changes

## 📞 Need Help?

Refer to:

- `I18N_README.md` - Complete documentation
- `I18N_GUIDE.md` - Quick usage guide
- `I18N_SETUP_SUMMARY.md` - Setup summary
- `components/ExampleI18nComponent/` - Example implementation
