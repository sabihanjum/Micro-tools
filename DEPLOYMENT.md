# Deployment Guide

Quick Split can be deployed to multiple platforms. Choose the one that best fits your needs.

## GitHub Pages (Recommended for beginners)

### Automatic Deployment

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The workflow in `.github/workflows/deploy.yml` will automatically deploy on every push to main
5. Your site will be available at `https://[username].github.io/[repository-name]/`

### Manual Deployment

```bash
npm run build
# Then manually upload the dist/ folder to your hosting provider
```

## Netlify

### Option 1: Automatic Deployment (Recommended)

1. Sign up at [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect your Git repository
4. Netlify will automatically detect the build settings from `netlify.toml`
5. Click "Deploy site"

### Option 2: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run deploy:netlify
```

## Vercel

### Option 1: Automatic Deployment (Recommended)

1. Sign up at [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the build settings from `vercel.json`
5. Click "Deploy"

### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
npm run deploy:vercel
```

## Testing Deployment Locally

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Visit http://localhost:4173 to test the production build.

## Deployment Checklist

- [ ] All tests pass (`npm run test`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Bundle size is under 50KB (check build output)
- [ ] Preview works correctly (`npm run preview`)
- [ ] Responsive design tested on mobile devices
- [ ] All functionality works in production mode

## Troubleshooting

### Assets not loading

If CSS or JS files don't load after deployment, check that the `base` path in `vite.config.js` is set correctly:
- For GitHub Pages: `base: './'` or `base: '/repository-name/'`
- For Netlify/Vercel: `base: './'` or `base: '/'`

### Build fails

Ensure all dependencies are installed:
```bash
npm ci
npm run build
```

### Tests fail in CI/CD

Make sure the GitHub Actions workflow has the correct Node.js version (18+).
