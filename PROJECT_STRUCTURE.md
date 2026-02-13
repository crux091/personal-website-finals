# Portfolio Project Structure

## 📁 Directory Organization

```
Portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── chat/         # AI chat endpoint
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── not-found.tsx     # 404 page
│   └── page.tsx          # Home page
│
├── components/            # React components
│   ├── AIAgent.tsx       # RAIDA AI chat assistant
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact form with EmailJS
│   ├── ErrorBoundary.tsx # Error handling
│   ├── ExperienceTimeline.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx          # Hero section with profile
│   ├── Navbar.tsx        # Navigation
│   ├── ParticlesBackground.tsx
│   ├── PhotoGallery.tsx  # Image carousel
│   ├── ProjectCard.tsx
│   ├── Projects.tsx
│   ├── RaidaAvatar.tsx   # AI avatar component
│   ├── RepeatInView.tsx  # Animation wrapper
│   ├── Skills.tsx
│   └── motionConfig.ts   # Framer Motion configs
│
├── lib/                   # Utilities and data
│   ├── gallery.ts        # Gallery images data
│   ├── localAI.ts        # AI prompts and config
│   ├── portfolioContext.ts
│   └── projects.ts       # Projects data
│
├── public/               # Static assets
│   ├── images/          # Image assets
│   │   └── profile.jpg  # Profile picture
│   ├── gallery/         # Gallery photos
│   ├── favicon.svg
│   ├── og-image.svg     # Social sharing image
│   ├── robots.txt
│   └── sitemap.xml
│
├── docs/                 # Documentation
│   ├── email_template.html
│   ├── IMPROVEMENTS.md
│   ├── MOBILE-RESPONSIVE.md
│   └── build_log.txt
│
├── .env.local           # Environment variables (not in git)
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── NEXT_STEPS.md
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Key Files

### Environment Variables (`.env.local`)
```env
GOOGLE_AI_API_KEY=your_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_id
```

### Routes
- `/` - Home page (all sections)
- `/api/chat` - AI chat endpoint

### Sections (Anchors)
- `#home` - Hero section
- `#about` - About me
- `#projects` - Projects showcase
- `#skills` - Skills grid
- `#gallery` - Photo gallery
- `#contact` - Contact form

## 🎨 Theme
- **Colors**: Blue (#66c0ff) & Black (#000000)
- **Fonts**: System fonts (optimized for performance)
- **Animations**: Framer Motion

## 📦 Key Dependencies
- Next.js 14
- React 18
- Framer Motion (animations)
- EmailJS (contact form)
- Google AI (chat assistant)
- TailwindCSS (styling)
- TypeScript

## 🚀 Development
```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run start  # Start production server
```

## 📝 Notes
- All images should go in `public/images/` or `public/gallery/`
- Documentation files are in `docs/`
- Components are organized by feature
- All routes use Next.js App Router
