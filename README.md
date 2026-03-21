# npuliga.github.io — Personal Portfolio

Premium portfolio website for **Naga Puligadda**, built with [Astro](https://astro.build) and deployed automatically to GitHub Pages.

**Live site:** [npuliga.github.io](https://npuliga.github.io)

---

## What is this?

A fully static, high-performance personal portfolio site that transforms resume data into a visually compelling presentation. Update the resume JSON file, push to GitHub, and the site rebuilds and deploys automatically.

**Key features:**
- Premium, minimal design (Linear/Stripe-inspired)
- Dark/light theme toggle
- Fully responsive (mobile, tablet, desktop)
- SEO optimized with Open Graph + JSON-LD
- Print-friendly stylesheet
- Zero backend — fully static
- Scroll animations
- < 1 second load time

---

## Architecture

```
npuliga.github.io/
├── src/
│   ├── data/
│   │   └── resume.json          ← YOUR RESUME DATA (edit this!)
│   ├── components/
│   │   ├── Navigation.astro
│   │   ├── Hero.astro
│   │   ├── KeyImpact.astro
│   │   ├── Experience.astro
│   │   ├── CaseStudies.astro
│   │   ├── Skills.astro
│   │   ├── Education.astro
│   │   └── Contact.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── public/
│   └── favicon.svg
├── .github/workflows/
│   └── deploy.yml               ← Auto-deploy on push
├── astro.config.mjs
├── package.json
└── Resume_Naga_Puligadda_*.md   ← Original resume (reference)
```

---

## How to Update Your Resume

**All your resume data lives in one file:** `src/data/resume.json`

### Steps:

1. Open `src/data/resume.json` in any text editor
2. Edit the sections you want to change:
   - `meta` — Name, title, contact info
   - `hero` — Main headline and stats
   - `keyImpact` — Impact metrics displayed prominently
   - `experience` — Work history
   - `caseStudies` — Deep-dive case studies
   - `skills` — Technical skills by category
   - `education` — Degrees and certifications
3. Save the file
4. Push to GitHub (see deployment section below)
5. Your site updates automatically!

---

## Setup (for first-time users)

### Prerequisites

1. **Install Git:** Download from [git-scm.com](https://git-scm.com/downloads)
2. **Install Node.js (v18+):** Download from [nodejs.org](https://nodejs.org/)
3. Verify installation — open terminal and run:
   ```
   git --version
   node --version
   npm --version
   ```

### Run Locally

```bash
# Clone the repository
git clone https://github.com/npuliga/npuliga.github.io.git
cd npuliga.github.io

# Install dependencies
npm install

# Start development server (with live reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at **http://localhost:4321**

---

## Deployment to GitHub Pages

### How it works:

1. You push code to the `main` branch
2. GitHub Actions runs automatically (`.github/workflows/deploy.yml`)
3. It installs dependencies, builds the site, and deploys to GitHub Pages
4. Your site is live at `https://npuliga.github.io` within minutes

### First-time GitHub Pages setup:

1. Go to your repository on GitHub: `github.com/npuliga/npuliga.github.io`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**, set **Source** to **GitHub Actions**
4. Push your code to `main` — the workflow will run automatically

### Pushing updates:

```bash
git add .
git commit -m "Update resume"
git push origin main
```

That's it. The site will rebuild and deploy automatically.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build) (static site generator) |
| Styling | Custom CSS (CSS custom properties, no framework) |
| Fonts | Inter (Google Fonts) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Data | JSON (structured resume data) |

---

## Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| `npm install` fails | Make sure Node.js 18+ is installed. Run `node --version` to check. |
| Site looks broken locally | Run `npm run dev` not `npm run build`. Dev server has hot reload. |
| Changes not showing on GitHub Pages | Check Actions tab on GitHub. The workflow may still be running. |
| Build fails on GitHub | Check the Actions tab for error logs. Usually a JSON syntax error in `resume.json`. |
| Fonts not loading | Check internet connection. Fonts load from Google Fonts CDN. |

---

## License

MIT
    - [Node.js example app and courses](https://the-example-app-nodejs.contentful.com/courses)
    - Concept references: [Domain model](https://www.contentful.com/developers/docs/concepts/domain-model/), [Multiple environments](https://www.contentful.com/developers/docs/concepts/multiple-environments/)
    <br><br>
    

## 📌 On The Side

**Web Development Instructor** @ [ReDI School of Digital Integration](https://www.redi-school.org/) _(Aug 2017 - Present)_<br>
Non-profit digital school for tech-interested newcomers applying for asylum in Germany.
  - Building and continuously developing the course curriculum with a team of 4-8 other instructors
  - Leading classes to improve student comprehension of React, HTML, CSS and general web design principles
  - Mentoring students through presentations and job search
  - _Note: Took a break from teaching in 2019_
  <br><br>

**Co-Organizer** @ [QueerJS](https://queerjs.com/) _(Jun 2019 - Present)_<br>
🏳️‍🌈 A meetup for everyone where queer speakers take the stage.
  - Selecting speakers and scheduling events
  - Fostering an inclusive community and enforcing the code of conduct
  - 🐻 _Previously co-organized [BerlinJS](https://berlinjs.org/) from May 2018 - May 2020_
  <br><br>
  
**Workshop Lead** @ [New Devs on the Block](https://newdevs.org/) _(Jul 2019 - Present)_ <br>
Free, two-day workshops to help people build their first website.
  - Creating a curriculum that covers HTML, CSS and a bit of JavaScript 
  - Preparing supplemental presentations on topics like accessibility and animations
  - Events in Nürnberg and Vienna, now post-poned due to the COVID-19 outbreak 
  <br><br>

## 🎤 Public Speaking
    
### Recent Appearances

- **Women TechMakers Vienna Conference** _(streamed on Aug 7, 2020)_
<br>[How AI is Enhancing Journalism](https://www.youtube.com/watch?v=-qZCRHwnnbM)<br>

- **DevDiscuss Podcast** _(released on Dec 9, 2020)_
<br>[Improving Your Onboarding For Early Career Devs](https://dev.to/devteam/improving-your-onboarding-for-early-career-devs-with-carolyn-stransky-john-britton-2ec3)<br>
<br>

**Want me to speak at your event?**
<br>💖 [Check out my website](https://workwithcarolyn.com/speaking) for more information.
<br><br>
  
## 🏆 Accomplishments

**Top Author Recognition** @ [DEV](https://dev.to/) _(2019 - 2020)_ <br>
Named one of the Top 500 authors in 2019. Also wrote two articles that ranked in the weekly Top 7:
  - [How to remove condescending language from documentation](https://dev.to/meeshkan/how-to-remove-condescending-language-from-documentation-4a5p)
  - [Onboarding a junior developer to your team? Here's 12 tips.](https://dev.to/carolstran/onboarding-a-junior-developer-to-your-team-here-s-12-tips-4g3a)
<br><br>

**Won Best Project** @ [Geek Girl Carrots Berlin Hackathon](http://www.hacklikeagirl.co/) _(Oct 2017)_<br>
Created [Qarma](https://github.com/lcorr8/qarma), an online platform to report and retrieve lost & found objects for travelers abroad.
<br><br>

## 💬 Languages

**English**: Native <br>
**German**: A2.2
<br><br>

## 👩🏼‍🎓 Education

**12-week intensive coding course** focused on full-stack JavaScript<br>
[SPICED Academy](https://www.spiced-academy.com/) - Berlin, Germany _(Apr 2017 - Jun 2017)_ <br>

**Bachelor of Arts** in Journalism and Media Studies<br>
[Beloit College](https://www.beloit.edu/) - Beloit, Wisconsin, USA _(2011 - 2015)_

**Washington Semester Program** for Journalism and New Media<br>
[American University](https://www.american.edu/) - Washington DC, USA _(Fall 2014)_

**International Exchange** studying Political Science<br>
[Yeditepe Üniversitesi](https://yeditepe.edu.tr/en) - Istanbul, Turkey _(Spring 2013)_
