# Fixing i18n Display Issue - Why /vi Still Shows English

## 🔍 The Problem

When visiting `/vi`, the page still displayed English text even though the i18n infrastructure was correctly set up.

## 🎯 Root Cause

The **i18n infrastructure is working perfectly** - the translations are loading correctly. However, **your components still have hardcoded English text** instead of using the translation system.

### What Was Working ✅

- Middleware detecting locale correctly
- Translation files loading properly
- NextIntlClientProvider passing messages to components
- Locale routing functioning as expected

### What Was Missing ❌

- Components not using `useTranslations()` hook
- Hardcoded text in components like Hero, Header, Footer, etc.

## 🔧 The Solution

### Test First (Verify i18n is Working)

Visit these test pages to confirm i18n infrastructure works:

- http://localhost:3000/en/test - Should show English
- http://localhost:3000/vi/test - Should show Vietnamese

If the test page works correctly, your i18n setup is fine! ✅

### Update Components to Use Translations

Here's the pattern for updating components:

#### Before (Hardcoded):

```tsx
"use client";

export const Hero = () => {
  return (
    <div>
      <h1>Residential P2P Proxies</h1>
      <p>The Best Proxy Solution for MMO</p>
      <button>GET STARTED</button>
    </div>
  );
};
```

#### After (Using i18n):

```tsx
"use client";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
      <button>{tCommon("getStarted").toUpperCase()}</button>
    </div>
  );
};
```

## ✅ Example: Updated Hero Component

I've already updated the Hero component as an example. Here's what changed:

### Changes Made:

1. ✅ Added `useTranslations` imports
2. ✅ Replaced hardcoded title with `t("title") + " " + t("subtitle")`
3. ✅ Replaced hardcoded description with `t("description")`
4. ✅ Replaced "GET STARTED" button with `tCommon("getStarted")`
5. ✅ Updated translation files with the full description text

### File: `components/Hero/index.tsx`

```tsx
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  // Now uses translations instead of hardcoded text
  const text = t("title") + " " + t("subtitle");

  // Description now uses: {t("description")}
  // Button now uses: {tCommon("getStarted").toUpperCase()}

  // ... rest of component
};
```

## 📋 Components That Still Need Updating

You need to update these components to use translations:

### High Priority (User-Facing):

- [ ] **Header** - Navigation links, logo text
- [ ] **Footer** - All footer text and links
- [ ] **Pricing** - Plan names, prices, features
- [ ] **Contact** - Form labels and placeholders
- [ ] **FAQs** - Questions and answers
- [ ] **TopBar** (if exists) - Any notification text

### Medium Priority:

- [ ] **TopCountries** - Section title and content
- [ ] **CaseStudies** - Case study titles and descriptions
- [ ] **Resellers** - Reseller information
- [ ] **Partnerships** - Partnership information
- [ ] **TrustedBy** - Section title

### Policy Pages:

- [ ] **Cookie Policy** - All policy text
- [ ] **Privacy Policy** - All policy text
- [ ] **Terms of Service** - All terms text
- [ ] **Refund Service** - All refund policy text

## 🎨 Pattern for Updating Each Component

Follow this checklist for each component:

### Step 1: Add Import

```tsx
import { useTranslations } from "next-intl";
```

### Step 2: Initialize Hook

```tsx
export function MyComponent() {
  const t = useTranslations("mySection"); // Use appropriate namespace
  // ...
}
```

### Step 3: Replace Hardcoded Text

```tsx
// Before:
<h1>My Title</h1>

// After:
<h1>{t("title")}</h1>
```

### Step 4: Add to Translation Files

```json
// messages/en.json
{
  "mySection": {
    "title": "My Title"
  }
}

// messages/vi.json
{
  "mySection": {
    "title": "Tiêu Đề Của Tôi"
  }
}
```

### Step 5: Test Both Locales

- Visit `/en/page` - Check English
- Visit `/vi/page` - Check Vietnamese

## 🧪 Testing Instructions

1. **Test the i18n infrastructure:**

   ```bash
   # Visit test page
   http://localhost:3000/en/test  # Should show English
   http://localhost:3000/vi/test  # Should show Vietnamese
   ```

2. **Test updated Hero component:**

   ```bash
   http://localhost:3000/en  # Hero should show English
   http://localhost:3000/vi  # Hero should show Vietnamese
   ```

3. **After updating each component:**
   - Refresh `/en` and `/vi` pages
   - Switch languages using the language switcher
   - Verify all text changes correctly

## 💡 Quick Tips

### For Long Text Content:

If you have a lot of text (like FAQs or policy pages), structure it hierarchically:

```json
{
  "faqs": {
    "question1": {
      "q": "What is a proxy?",
      "a": "A proxy is..."
    },
    "question2": {
      "q": "How does it work?",
      "a": "It works by..."
    }
  }
}
```

### For Lists/Arrays:

```json
{
  "features": {
    "list": {
      "0": "Fast speeds",
      "1": "Secure connection",
      "2": "24/7 support"
    }
  }
}
```

Then map in component:

```tsx
{
  [0, 1, 2].map((i) => <li key={i}>{t(`features.list.${i}`)}</li>);
}
```

### For Dynamic Values:

```json
{
  "pricing": {
    "perMonth": "${price} per month"
  }
}
```

```tsx
t("pricing.perMonth", { price: "9.99" });
```

## 🚀 Next Steps

1. ✅ Test the `/en/test` and `/vi/test` pages to confirm i18n works
2. ✅ Review the updated Hero component as an example
3. ⬜ Update Header component (add LanguageSwitcher here!)
4. ⬜ Update Footer component
5. ⬜ Update remaining components one by one
6. ⬜ Update policy pages
7. ⬜ Test all pages in both languages
8. ⬜ Deploy!

## 📚 Resources

- See `I18N_INTEGRATION_CHECKLIST.md` for detailed checklist
- See `I18N_QUICK_REFERENCE.md` for code snippets
- See `components/ExampleI18nComponent/` for example usage

## ✨ Summary

**The i18n setup is complete and working!** Now you just need to update each component to use `useTranslations()` instead of hardcoded text. Start with the Hero component (already done as example), then move to Header, Footer, and other components.

The translation infrastructure handles everything automatically - you just need to replace the hardcoded strings with translation keys.
