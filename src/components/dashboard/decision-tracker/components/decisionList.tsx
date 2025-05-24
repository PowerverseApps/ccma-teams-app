import React from 'react';
import { Decision } from './App';
import './DecisionList.css';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
 
interface Props {
  decisions: Decision[];
}
 
const DecisionList: React.FC<Props> = ({ decisions }) => {
  const exportDecisionAsPDF = async (decision: Decision) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 700]);
 
    const { width, height } = page.getSize();
    const fontSize = 14;
    let y = height - 30;
 
    page.drawText(`Decision: ${decision.title}`, { x: 50, y, size: fontSize + 2 });
    y -= 30;
 
    page.drawText(`Category: ${decision.category}`, { x: 50, y, size: fontSize });
    y -= 20;
    page.drawText(`Assigned To: ${decision.assignedTo}`, { x: 50, y, size: fontSize });
    y -= 20;
    page.drawText(`Date: ${decision.date}`, { x: 50, y, size: fontSize });
    y -= 20;
    page.drawText(`Status: ${decision.status}`, { x: 50, y, size: fontSize });
    y -= 20;
 
    page.drawText(`Description:`, { x: 50, y, size: fontSize });
    y -= 20;
    const descriptionLines = splitText(decision.description || 'No description provided', 70);
    descriptionLines.forEach(line => {
      page.drawText(line, { x: 60, y, size: fontSize - 1 });
      y -= 15;
    });
 
    if (decision.attachments.length > 0) {
      y -= 20;
      page.drawText(`Attachments:`, { x: 50, y, size: fontSize });
      y -= 20;
      decision.attachments.forEach(att => {
        page.drawText(`- ${att}`, { x: 60, y, size: fontSize - 1 });
        y -= 15;
      });
    }
 
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `${decision.title.replace(/\s+/g, '_')}.pdf`);
  };
 
  const splitText = (text: string, maxLength: number) => {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    words.forEach(word => {
      if ((line + word).length > maxLength) {
        lines.push(line);
        line = word + ' ';
      } else {
        line += word + ' ';
      }
    });
    if (line) lines.push(line);
    return lines;
  };
 
  // Handle opening the file preview
  const openFilePreview = (file: string) => {
    window.open(file, '_blank');  // Open the file in a new tab
  };
 
  return (
    <div className="decision-list">
      {decisions.map((decision) => (
        <div className="decision-card" key={decision.id}>
          <h3>{decision.title}</h3>
          <p><strong>Category:</strong> {decision.category}</p>
          <p><strong>Assigned To:</strong> {decision.assignedTo}</p>
          <p><strong>Date:</strong> {decision.date}</p>
          <p><strong>Status:</strong> {decision.status}</p>
          <p><strong>Description:</strong> {decision.description || 'No description provided'}</p>
 
          <div>
            <strong>Attachments:</strong>
            {decision.attachments && decision.attachments.length > 0 ? (
              <ul>
                {decision.attachments.map((file, index) => (
                  <li key={index}>
                    <a href="#" onClick={() => openFilePreview(file)}>
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attachments</p>
            )}
          </div>
 
          <button onClick={() => exportDecisionAsPDF(decision)}>Export as PDF</button>
        </div>
      ))}
    </div>
  );
};
 
export default DecisionList;
 
 