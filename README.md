# Prime Guard Solutions - GitHub Pages Deployment

[![Deployment Status](https://img.shields.io/badge/Status-Production-success)](https://primeguardsolutions.co.uk)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue)](https://pages.github.com/)

## 🌐 Live Website
- **Primary Domain**: https://primeguardsolutions.co.uk
- **GitHub Pages URL**: https://notvnerdy.github.io/primeguardsolutions.co.uk/

---

## 📋 Project Overview

This is a **static website** for Prime Guard Solutions, hosted on **GitHub Pages** with a custom domain. The site is built with pure HTML, CSS, and JavaScript—no frameworks, no backend, no build process.

### Technology Stack
- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, Custom Properties)
- Vanilla JavaScript (ES6+)
- GitHub Pages (Static hosting)

---

## 🚀 Deployment Instructions

### Prerequisites
- Git installed locally
- GitHub account with push access to this repository
- Access to DNS settings for `primeguardsolutions.co.uk`

### Step 1: Push Code to GitHub

```bash
# Configure git (if not already done)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files to git
git add .

# Commit changes
git commit -m "Initial deployment: Prime Guard Solutions website"

# Push to main branch
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to repository: https://github.com/notvnerdy/primeguardsolutions.co.uk
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Click **Save**
5. Wait 2-3 minutes for initial deployment

✅ **Verification**: Visit https://notvnerdy.github.io/primeguardsolutions.co.uk/

---

## 🌍 Custom Domain Configuration

### Step 3: Configure DNS Records

Log into your domain registrar's DNS management panel and add these records:

#### A Records (Root Domain)
Point `primeguardsolutions.co.uk` to GitHub's IP addresses:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### CNAME Record (WWW Subdomain)
Point `www.primeguardsolutions.co.uk` to your GitHub Pages URL:

```
Type: CNAME
Name: www
Value: notvnerdy.github.io
TTL: 3600
```

⏱️ **DNS Propagation**: Changes may take 1-48 hours (usually < 1 hour)

### Step 4: Verify Domain in GitHub

1. Go to **Settings** → **Pages** in your repository
2. Under **Custom domain**, the `CNAME` file should auto-populate the field
3. If not, enter: `primeguardsolutions.co.uk`
4. Click **Save**
5. Wait for DNS check to complete (green checkmark)

### Step 5: Enable HTTPS

Once DNS verification succeeds:

1. In **Settings** → **Pages**
2. Check **Enforce HTTPS**
3. Wait 5-10 minutes for certificate provisioning

✅ **Final Verification**: 
- https://primeguardsolutions.co.uk ✓
- https://www.primeguardsolutions.co.uk ✓

---

## 📁 File Structure

```
primeguardsolutions.co.uk/
├── index.html          # Main landing page
├── styles.css          # Global styles
├── script.js           # Interactive functionality
├── CNAME               # Custom domain configuration
├── .nojekyll           # Disable Jekyll processing
├── README.md           # This file
└── favicon.png         # (Optional) Site icon
```

---

## ✅ Pre-Deployment Checklist

- [x] `index.html` exists in root directory
- [x] All CSS/JS paths are relative (no absolute paths)
- [x] `CNAME` file contains: `primeguardsolutions.co.uk`
- [x] `.nojekyll` file exists (prevents Jekyll processing)
- [x] No server-side code (PHP, Node.js, Python, etc.)
- [x] All assets use relative paths
- [x] Responsive design implemented
- [x] SEO meta tags included
- [x] Accessibility features (alt tags, semantic HTML)

---

## 🧪 Testing Checklist

### After Deployment:

#### URLs
- [ ] https://primeguardsolutions.co.uk loads correctly
- [ ] https://www.primeguardsolutions.co.uk redirects to primary domain
- [ ] https://notvnerdy.github.io/primeguardsolutions.co.uk/ works (fallback)

#### Functionality
- [ ] Navigation menu works (desktop)
- [ ] Hamburger menu works (mobile)
- [ ] Smooth scroll to sections functions
- [ ] Contact form displays (submission requires integration)
- [ ] All links navigate correctly

#### Assets & Performance
- [ ] CSS loads without 404 errors
- [ ] JavaScript executes without console errors
- [ ] No broken images or resources
- [ ] Page loads in < 3 seconds

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

#### Responsiveness
- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## 🔧 Troubleshooting

### Issue: GitHub Pages not building

**Solution:**
- Check **Actions** tab for build errors
- Ensure `index.html` is in root directory
- Verify branch is set to `main` in Pages settings

### Issue: Custom domain shows 404

**Solution:**
- Verify `CNAME` file contains only: `primeguardsolutions.co.uk`
- Check DNS records are correctly configured
- Wait for DNS propagation (up to 48 hours)
- Clear browser cache

### Issue: HTTPS not available

**Solution:**
- Ensure DNS check passed in Pages settings
- Wait 10-15 minutes after DNS verification
- Try unchecking and rechecking "Enforce HTTPS"

### Issue: Assets not loading

**Solution:**
- Ensure all paths are relative (not absolute)
- Check browser console for 404 errors
- Verify file names match exactly (case-sensitive)

---

## 🔐 Security Best Practices

✅ **Implemented:**
- HTTPS enforced (after setup)
- No sensitive data in code
- No backend API keys
- Form submission handled client-side (demo mode)

⚠️ **Recommendations:**
- Integrate form service (Formspree, Netlify Forms) for production
- Add Content Security Policy headers (via Pages configuration)
- Regular dependency updates (none currently needed)

---

## 📈 Performance Optimizations

**Current Optimizations:**
- ✅ Minimal CSS (no frameworks)
- ✅ Vanilla JS (no libraries)
- ✅ Semantic HTML
- ✅ Responsive images
- ✅ Smooth scroll with reduced motion support

**Future Enhancements (if needed):**
- [ ] Lazy loading for images
- [ ] CSS/JS minification
- [ ] Image optimization (WebP format)
- [ ] Service worker for offline support

---

## 🛠️ Making Updates

To update the website:

```bash
# Make your changes to HTML/CSS/JS files
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Pages automatically rebuilds and deploys within 1-2 minutes.

---

## 📧 Support & Contact

For issues with:
- **GitHub Pages**: [GitHub Support](https://support.github.com/)
- **DNS Configuration**: Contact your domain registrar
- **Website Content**: Contact Prime Guard Solutions

---

## 📄 License

© 2026 Prime Guard Solutions. All rights reserved.

---

## 🎯 Deployment Status

| Environment | Status | URL |
|------------|--------|-----|
| Production | 🟢 Live | https://primeguardsolutions.co.uk |
| GitHub Pages | 🟢 Active | https://notvnerdy.github.io/primeguardsolutions.co.uk/ |

**Last Updated**: January 22, 2026
