# How to Generate Your Resume PDF

Your site now has PDF download buttons in two locations:
- **Hero section**: "Download Resume PDF" button
- **Navigation bar**: "Resume PDF ↓" link

## Quick Method (5 minutes)

Since your site already has print-optimized CSS, you can generate a professional PDF directly from your browser:

### Step 1: Visit Your Live Site
Open https://npuliga.github.io/ in Chrome or Edge

### Step 2: Open Print Dialog
- **Windows**: Press `Ctrl + P`
- **Mac**: Press `Cmd + P`

### Step 3: Configure Print Settings
1. **Destination**: Select "Save as PDF"
2. **Layout**: Portrait
3. **Paper size**: Letter or A4
4. **Margins**: Default
5. **Options**: 
   - ✅ Background graphics (capture colors and styling)
   - ❌ Headers and footers (removes URL and date)

### Step 4: Save the PDF
1. Click "Save" or "Print"
2. Name the file exactly: `resume.pdf`
3. Save it to: `C:\Workstation\Codebase\npuliga.github.io\public\resume.pdf`

### Step 5: Test Locally
```powershell
npm run dev
```
Visit http://localhost:4321 and click the "Download Resume PDF" button to test.

### Step 6: Deploy
```powershell
git add public/resume.pdf
git commit -m "Add downloadable resume PDF"
git push origin master
```

## Alternative: Professional PDF Generators

If you want a more polished PDF, you can use:

### Headless Chrome (Puppeteer)
```powershell
npm install puppeteer --save-dev
```

Create `scripts/generate-pdf.js`:
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://npuliga.github.io/', { waitUntil: 'networkidle2' });
  await page.pdf({
    path: 'public/resume.pdf',
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });
  await browser.close();
})();
```

Run: `node scripts/generate-pdf.js`

### Print to PDF Services
- **WeasyPrint**: HTML to PDF (Python)
- **wkhtmltopdf**: Command-line HTML to PDF
- **princexml**: Commercial PDF generator

## Tips for Best Results

1. **Review before saving**: Scroll through the print preview to ensure everything looks good
2. **Dark mode handling**: The site automatically switches to light theme for print
3. **Page breaks**: The print CSS already optimizes content layout
4. **File size**: The PDF should be under 2MB for fast downloads
5. **Update regularly**: Regenerate the PDF whenever you update your resume

## Current Status

✅ PDF download UI added (buttons and links)
✅ Print-optimized CSS already in place
❌ PDF file needed in `public/resume.pdf`

Once you place the PDF file, the download feature will work immediately!
