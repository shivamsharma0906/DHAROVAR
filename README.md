# Dharovar House — Youth Leadership, Social Welfare & Publication Platform

A luxury single-page website and headless Decap CMS portal built for **Dharovar House**, an international student leadership and policy institution in Mumbai, India.

---

## 🏛️ Tech Stack & Design System

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **CMS:** Decap CMS (Git-based headless admin at `/admin`)
- **Interactions:** Framer Motion + Lucide React Icons
- **Design Tokens:**
  - Primary: `#1A535C` / `#0F382C` (Deep Forest Green)
  - Accent: `#C8A35F` (Antique Gold)
  - Background: `#FAF8F5` (Ivory White / Soft Cream)
  - Fonts: `Playfair Display` (Serif Headings) & `Inter` (Sans-Serif Body)

---

## 🚀 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Access Decap CMS Admin Panel:**
   Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 🛠️ Deployment Steps (Netlify / Vercel)

### Deploying to Netlify (Recommended for Identity Auth)

1. Push your repository to **GitHub**.
2. Connect your repository on [Netlify](https://app.netlify.com).
3. Build Settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `.next`
4. **Enable Identity for CMS Portal (`/admin`):**
   - Go to **Site Settings > Identity > Enable Identity**.
   - Under **Registration Preferences**, set to **Invite only** (restricts signup to the client's email only).
   - Under **Services > Git Gateway**, enable **Git Gateway** to allow Decap CMS to publish commits back to GitHub automatically.

### Deploying to Vercel

1. Import your project into Vercel.
2. Vercel automatically detects Next.js build settings (`npm run build`).
3. Deploy!

---

## 📁 File Structure

```
dharovar-house/
├── public/
│   ├── admin/
│   │   ├── index.html        # Decap CMS script loader
│   │   └── config.yml        # CMS Collections & Fields config
│   └── images/
│       └── logo.png          # Dharovar House Emblem Crest
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind & Design tokens
│   │   ├── layout.tsx        # SEO & Netlify Identity widget
│   │   └── page.tsx          # Main Single-Page App layout
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky ivory nav with mobile drawer
│   │   ├── Hero.tsx          # Centered think-tank hero card
│   │   ├── About.tsx         # Founder bio & 3 key metrics cards
│   │   ├── WelfareGrid.tsx   # Dynamic social welfare initiatives grid
│   │   ├── PublicationsGrid.tsx # Dynamic publications with tab filters
│   │   ├── SocialsContact.tsx# Social pills & validated inquiry form
│   │   └── Footer.tsx        # Archival footer with crest logo
│   ├── content/
│   │   ├── publications/     # Markdown seed articles
│   │   └── welfare/          # Markdown seed welfare initiatives
│   └── lib/
│       └── markdown.ts       # Remark & Gray-Matter parser
└── package.json
```
