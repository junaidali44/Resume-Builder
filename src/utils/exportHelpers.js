import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const exportToPDF = async (element, filename = 'resume.pdf') => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: false,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width * 0.75, canvas.height * 0.75]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75);
    pdf.save(filename);
    
    return { success: true };
  } catch (error) {
    console.error('PDF export failed:', error);
    return { success: false, error: error.message };
  }
};

export const exportToWord = async (data, filename = 'resume.docx') => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: data.personalInfo.fullName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun(data.personalInfo.email),
              new TextRun(' | '),
              new TextRun(data.personalInfo.phone),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: 'Professional Summary',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph(data.professionalSummary),
          
          // Education Section
          new Paragraph({
            text: 'Education',
            heading: HeadingLevel.HEADING_2,
          }),
          ...data.education.flatMap(edu => [
            new Paragraph({
              text: edu.degree,
              heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph(`${edu.institute}, ${edu.year} - ${edu.grade}`),
          ]),
          
          // Experience Section
          new Paragraph({
            text: 'Work Experience',
            heading: HeadingLevel.HEADING_2,
          }),
          ...data.experience.flatMap(exp => [
            new Paragraph({
              text: exp.company,
              heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph(`${exp.position} | ${exp.duration}`),
            new Paragraph(exp.description),
          ]),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
    return { success: true };
  } catch (error) {
    console.error('Word export failed:', error);
    return { success: false, error: error.message };
  }
};