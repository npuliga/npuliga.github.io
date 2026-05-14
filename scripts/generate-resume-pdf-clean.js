import PDFDocument from 'pdfkit';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load resume data
const resumeDataPath = join(__dirname, '..', 'src', 'data', 'resume.json');
const resumeData = JSON.parse(fs.readFileSync(resumeDataPath, 'utf-8'));

// PDF styling constants
const COLORS = {
  primary: '#2563eb',
  text: '#1f2937',
  subtitle: '#4b5563',
  border: '#e5e7eb'
};

const FONTS = {
  regular: 'Helvetica',
  bold: 'Helvetica-Bold',
  italic: 'Helvetica-Oblique'
};

function generateResumePDF() {
  console.log('Creating professional resume PDF...');
  
  const outputPath = join(__dirname, '..', 'public', 'resume.pdf');
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 50, bottom: 50, left: 50, right: 50 }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  let currentY = doc.y;

  // --- HEADER ---
  doc.font(FONTS.bold).fontSize(24).fillColor(COLORS.primary);
  doc.text(resumeData.meta.name, { align: 'center' });
  currentY = doc.y + 5;

  doc.font(FONTS.regular).fontSize(12).fillColor(COLORS.subtitle);
  doc.text(resumeData.meta.title, { align: 'center' });
  currentY = doc.y + 3;

  doc.fontSize(10);
  doc.text(`${resumeData.meta.location} | ${resumeData.meta.email} | ${resumeData.meta.phone}`, { align: 'center' });
  doc.text(`LinkedIn: linkedin.com/in/naga.puligadda | GitHub: github.com/npuliga`, { align: 'center' });
  
  currentY = doc.y + 20;
  doc.moveTo(50, currentY).lineTo(562, currentY).stroke(COLORS.border);
  currentY += 20;

  // --- PROFESSIONAL SUMMARY ---
  doc.y = currentY;
  addSectionHeader(doc, 'PROFESSIONAL SUMMARY');
  doc.font(FONTS.regular).fontSize(10).fillColor(COLORS.text);
  doc.text(resumeData.executiveSummary.summary, { align: 'justify', lineGap: 3 });
  doc.moveDown(0.5);

  // --- KEY IMPACT ---
  addSectionHeader(doc, 'KEY ACHIEVEMENTS');
  doc.font(FONTS.regular).fontSize(10);
  
  resumeData.selectedAchievements.slice(0, 6).forEach((impact, idx) => {
    doc.font(FONTS.bold).fillColor(COLORS.primary).text(impact.title, { continued: true });
    doc.font(FONTS.regular).fillColor(COLORS.text).text(` ${impact.description}`);
    if (idx < 5) doc.moveDown(0.3);
  });

  doc.moveDown(0.5);

  // --- PROFESSIONAL EXPERIENCE ---
  addSectionHeader(doc, 'PROFESSIONAL EXPERIENCE');
  
  resumeData.experience.forEach((exp, idx) => {
    // Check if we need a new page
    if (doc.y > 650) {
      doc.addPage();
    }

    doc.font(FONTS.bold).fontSize(11).fillColor(COLORS.text);
    doc.text(exp.company, { continued: true });
    doc.font(FONTS.regular).fontSize(10).fillColor(COLORS.subtitle);
    doc.text(` | ${exp.location}`, { continued: false });
    
    doc.font(FONTS.italic).fontSize(10).fillColor(COLORS.subtitle);
    doc.text(`${exp.role} | ${exp.period}`);
    doc.moveDown(0.3);

    doc.font(FONTS.regular).fontSize(10).fillColor(COLORS.text);
    doc.text(exp.summary, { lineGap: 2 });
    doc.moveDown(0.3);

    exp.highlights.slice(0, 4).forEach(highlight => {
      if (doc.y > 700) {
        doc.addPage();
      }
      doc.text(`• ${highlight}`, { indent: 10, lineGap: 2 });
    });

    if (idx < resumeData.experience.length - 1) {
      doc.moveDown(0.7);
    }
  });

  // --- SKILLS ---
  doc.addPage();
  addSectionHeader(doc, 'TECHNICAL SKILLS');
  
  resumeData.skills.categories.forEach(category => {
    doc.font(FONTS.bold).fontSize(10).fillColor(COLORS.text);
    doc.text(`${category.name}:`, { continued: true });
    doc.font(FONTS.regular).fillColor(COLORS.text);
    doc.text(` ${category.items.join(', ')}`);
    doc.moveDown(0.4);
  });

  doc.moveDown(0.3);

  // --- EDUCATION ---
  addSectionHeader(doc, 'EDUCATION');
  
  resumeData.education.forEach(edu => {
    doc.font(FONTS.bold).fontSize(10).fillColor(COLORS.text);
    doc.text(edu.degree);
    doc.font(FONTS.regular).fontSize(10);
    doc.text(edu.institution + (edu.score ? ` | ${edu.score}` : ''));
    if (edu.focus) {
      doc.font(FONTS.italic).fontSize(9).fillColor(COLORS.subtitle);
      doc.text(`Focus: ${edu.focus}`);
    }
    doc.moveDown(0.5);
  });

  // --- CERTIFICATIONS ---
  addSectionHeader(doc, 'CERTIFICATIONS');
  
  doc.font(FONTS.bold).fontSize(10).fillColor(COLORS.text);
  doc.text('Professional Certifications:');
  doc.moveDown(0.3);
  doc.font(FONTS.regular).fontSize(9);
  
  resumeData.certifications.professional.forEach(cert => {
    const status = cert.expiryDate.includes('Expired') ? '(Expired)' : `(Valid until ${cert.expiryDate})`;
    doc.text(`• ${cert.name} - ${cert.issuer} ${status}`);
  });

  doc.moveDown(0.5);
  doc.font(FONTS.bold).fontSize(10);
  doc.text('Continuous Learning:');
  doc.moveDown(0.3);

  // Finish the document
  doc.end();

  stream.on('finish', () => {
    console.log('Resume PDF generated successfully!');
    console.log(`Location: ${outputPath}`);
    process.exit(0);
  });

  stream.on('error', (err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
}

function addSectionHeader(doc, title) {
  const currentY = doc.y;
  doc.font(FONTS.bold).fontSize(12).fillColor(COLORS.primary);
  doc.text(title);
  doc.moveTo(50, doc.y + 3).lineTo(562, doc.y + 3).lineWidth(1.5).stroke(COLORS.primary);
  doc.moveDown(0.7);
}

// Run generator
generateResumePDF();
