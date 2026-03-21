import { mdToPdf } from 'md-to-pdf';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertMarkdownToPDF() {
  console.log('Converting resume markdown to PDF...');
  
  const inputPath = join(__dirname, '..', 'docs', 'resume-source.md');
  const outputPath = join(__dirname, '..', 'public', 'resume.pdf');

  try {
    const pdf = await mdToPdf(
      { path: inputPath },
      {
        dest: outputPath,
        pdf_options: {
          format: 'Letter',
          margin: {
            top: '0.75in',
            right: '0.75in',
            bottom: '0.75in',
            left: '0.75in'
          },
          printBackground: true
        },
        stylesheet_encoding: 'utf-8',
        css: `
          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #1a1a1a;
            max-width: 100%;
          }
          
          h1 {
            font-size: 22pt;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 8pt;
            text-align: center;
            border-bottom: none !important;
          }
          
          h1 + p {
            text-align: center;
            font-size: 10pt;
            color: #4b5563;
            margin-bottom: 12pt;
          }
          
          h2 {
            font-size: 12pt;
            font-weight: bold;
            color: #2563eb;
            margin-top: 16pt;
            margin-bottom: 8pt;
            padding-bottom: 4pt;
            border-bottom: 2px solid #2563eb;
          }
          
          h3 {
            font-size: 11pt;
            font-weight: bold;
            color: #1f2937;
            margin-top: 10pt;
            margin-bottom: 4pt;
          }
          
          p {
            margin-bottom: 6pt;
            text-align: justify;
          }
          
          strong {
            font-weight: bold;
            color: #1f2937;
          }
          
          em {
            font-style: italic;
            color: #4b5563;
          }
          
          ul {
            margin-left: 20pt;
            margin-bottom: 8pt;
          }
          
          li {
            margin-bottom: 3pt;
            line-height: 1.4;
          }
          
          hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 16pt 0;
          }
          
          code {
            font-family: inherit;
            background: none;
            padding: 0;
            font-size: inherit;
          }
          
          h2 {
            page-break-after: avoid;
          }
          
          h3 {
            page-break-after: avoid;
          }
          
          @page {
            margin: 0.75in;
          }
        `,
        launch_options: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    );

    if (pdf) {
      console.log('✓ Resume PDF generated successfully!');
      console.log(`Location: ${outputPath}`);
    }
  } catch (error) {
    console.error('Error converting markdown to PDF:', error);
    process.exit(1);
  }
}

convertMarkdownToPDF();
