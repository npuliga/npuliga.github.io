import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateResumePDF() {
  console.log('🚀 Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    });

    console.log('📄 Loading website...');
    
    // Load the live website
    await page.goto('https://npuliga.github.io/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for animations to complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Apply professional PDF styles - clean, simple, no icons/emojis
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `
        /* Hide navigation, buttons, and decorative elements */
        .nav,
        .theme-toggle,
        .nav-mobile-toggle,
        .hero-actions,
        .icon-moon,
        .icon-sun {
          display: none !important;
        }

        /* Ensure light theme and clean typography */
        * {
          animation: none !important;
          transition: none !important;
        }

        body {
          font-size: 11pt !important;
          line-height: 1.4 !important;
          color: #1a1a1a !important;
          background: #ffffff !important;
        }

        /* Optimize hero section for PDF */
        .hero {
          min-height: auto !important;
          padding: 40px 0 30px 0 !important;
        }

        .hero-headline {
          font-size: 24pt !important;
          line-height: 1.2 !important;
          margin-bottom: 12px !important;
        }

        .hero-description {
          font-size: 11pt !important;
          line-height: 1.4 !important;
          margin-bottom: 20px !important;
        }

        .hero-stats {
          display: flex !important;
          gap: 20px !important;
          margin-top: 20px !important;
        }

        .hero-stat-value {
          font-size: 18pt !important;
          font-weight: 700 !important;
          color: #2563eb !important;
        }

        .hero-stat-label {
          font-size: 9pt !important;
          color: #666 !important;
        }

        /* Section headers */
        .section-title {
          font-size: 16pt !important;
          margin-bottom: 16px !important;
          border-bottom: 2px solid #2563eb !important;
          padding-bottom: 8px !important;
        }

        /* Cards and content */
        section {
          padding: 24px 0 !important;
          page-break-inside: avoid !important;
        }

        .card {
          border: 1px solid #e0e0e0 !important;
          box-shadow: none !important;
          padding: 16px !important;
          margin-bottom: 12px !important;
          page-break-inside: avoid !important;
        }

        .card-header {
          font-size: 12pt !important;
          margin-bottom: 8px !important;
        }

        .card-meta {
          font-size: 9pt !important;
          color: #666 !important;
        }

        /* Skills and tags */
        .skills-grid,
        .skill-tags {
          gap: 8px !important;
        }

        .skill-tag {
          font-size: 9pt !important;
          padding: 4px 10px !important;
          border: 1px solid #d1d5db !important;
          background: #f9fafb !important;
        }

        /* Certifications */
        .cert-card {
          padding: 12px !important;
          border: 1px solid #e0e0e0 !important;
        }

        .cert-name {
          font-size: 10pt !important;
        }

        .cert-issuer {
          font-size: 9pt !important;
          color: #666 !important;
        }

        /* Contact section - simple text only */
        .contact-links {
          display: flex !important;
          gap: 20px !important;
          flex-wrap: wrap !important;
        }

        .contact-link {
          font-size: 10pt !important;
          color: #1a1a1a !important;
          text-decoration: none !important;
        }

        /* Remove all emojis and icons */
        *::before,
        *::after {
          content: none !important;
        }

        /* Clean lists */
        ul, ol {
          margin: 8px 0 !important;
          padding-left: 20px !important;
        }

        li {
          margin: 4px 0 !important;
          font-size: 10pt !important;
        }
      `;
      document.head.appendChild(style);
      
      // Ensure light theme for PDF
      document.documentElement.setAttribute('data-theme', 'light');
    });

    console.log('💾 Generating PDF...');
    
    const outputPath = join(__dirname, '..', 'public', 'resume.pdf');
    
    await page.pdf({
      path: outputPath,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.4in',
        right: '0.5in',
        bottom: '0.4in',
        left: '0.5in'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      scale: 0.95 // Slightly reduce scale for more compact layout
    });

    console.log('✅ PDF generated successfully!');
    console.log(`📍 Location: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the generator
generateResumePDF()
  .then(() => {
    console.log('\n✨ Resume PDF is ready for download!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to generate PDF:', error.message);
    process.exit(1);
  });
