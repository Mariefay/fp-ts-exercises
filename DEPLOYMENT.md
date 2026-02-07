# Deployment Guide

## ✅ Fixed Deployment Issues

### 1. TypeScript Target
- Updated `tsconfig.json` target from `ES2017` → `ES2020`
- Fixes regex flag compatibility issues

### 2. ESLint Configuration
Disabled overly strict rules for educational content:
- `react/no-unescaped-entities` - Allow natural quotes in JSX
- `@typescript-eslint/no-unused-expressions` - Prevent false positives
- `@typescript-eslint/no-unused-vars` - Warn for vars starting with `_`

### 3. Pre-commit Hooks (Catch Issues Early)
Installed Husky + lint-staged to automatically lint staged files before commits.

## 🚀 Deploy to Vercel

```bash
# From root directory
cd playground

# Test build locally
npm run build

# Commit and push
git add .
git commit -m "Ready for deployment"
git push

# Deploy to Vercel
vercel --prod
```

Or use Vercel Dashboard:
1. Import GitHub repo
2. Set root directory to `playground/`
3. Deploy ✅

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Validation (runs before every commit)
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run typecheck    # Check TypeScript types
npm run validate     # Run both lint + typecheck

# Build
npm run build        # Production build
npm run start        # Start production server

# Testing
npm test             # Run Vitest in watch mode
npm run test:run     # Run tests once
```

## 🔍 Pre-commit Hook Details

**What it does:**
- Runs ESLint on staged `.ts` and `.tsx` files
- Auto-fixes issues when possible
- Blocks commit if unfixable errors exist

**Configuration files:**
- `.husky/pre-commit` - Pre-commit hook script
- `playground/package.json` - lint-staged configuration

**Skip hook (emergency only):**
```bash
git commit --no-verify -m "Emergency fix"
```

## 🛠️ Alternative Deployment Options

### Static Export (GitHub Pages, Cloudflare Pages)
Add to `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

Then:
```bash
npm run build
# Static files in playground/out/
```

### Netlify
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## 🔧 Troubleshooting

### Build fails on Vercel
- Check build logs for specific errors
- Run `npm run build` locally first
- Ensure all dependencies are in `package.json`
- Verify `next.config.ts` is valid

### Pre-commit hook not running
```bash
# Re-initialize Husky
cd /Users/marie/Documents/fp-ts-exercises
npx husky install

# Make hook executable
chmod +x .husky/pre-commit
```

### Linting errors locally but not in VS Code
- Install ESLint extension
- Restart VS Code
- Check `.vscode/settings.json` for ESLint config
