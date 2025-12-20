import html2pdf from 'html2pdf.js'

export const generateCertificatePDF = (
  studentName,
  courseName,
  completionDate,
  certificateId
) => {
  try {
    // Create a temporary div to hold the certificate HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = `
      <div style="width: 11.7in; height: 8.3in; padding: 0; margin: 0; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f5f7fa 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; position: relative; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-shadow: inset 0 0 60px rgba(59, 130, 246, 0.05);">
        
        <!-- Decorative Top Border -->
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 8px; background: linear-gradient(to right, #3b82f6, #06b6d4, #3b82f6); width: 100%;"></div>
        
        <!-- Subtle Background Pattern -->
        <div style="position: absolute; top: 0; right: 0; width: 300px; height: 300px; background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 400px; height: 400px; background: radial-gradient(circle, rgba(6, 182, 212, 0.02) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
        
        <!-- Main Content -->
        <div style="padding: 60px 80px; position: relative; z-index: 1; text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
          
          <!-- Logo/Icon Area -->
          <div style="margin-bottom: 30px; font-size: 48px;">🎓</div>
          
          <!-- Header Text -->
          <div style="margin-bottom: 15px;">
            <div style="font-size: 14px; letter-spacing: 3px; color: #3b82f6; font-weight: 600; text-transform: uppercase; margin-bottom: 20px;">Certificate of Achievement</div>
            <div style="font-size: 12px; letter-spacing: 2px; color: #64748b; text-transform: uppercase; font-weight: 500; margin-bottom: 35px;">This certifies that</div>
          </div>
          
          <!-- Student Name -->
          <div style="font-size: 52px; font-weight: 700; color: #1e293b; margin-bottom: 35px; letter-spacing: 0.5px; position: relative;">
            ${studentName}
            <div style="position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); width: 120px; height: 3px; background: linear-gradient(to right, transparent, #3b82f6, transparent);"></div>
          </div>
          
          <!-- Achievement Text -->
          <div style="margin-top: 40px; margin-bottom: 30px;">
            <div style="font-size: 14px; color: #475569; line-height: 1.8; margin-bottom: 15px;">has successfully completed the professional course</div>
            <div style="font-size: 32px; font-weight: 700; color: #0ea5e9; margin-bottom: 15px;">${courseName}</div>
            <div style="font-size: 12px; color: #64748b; line-height: 1.6;">Demonstrating comprehensive knowledge, skills development, and mastery of all course content and learning objectives. This achievement represents dedication, commitment, and excellence in learning.</div>
          </div>
        </div>
        
        <!-- Footer Section -->
        <div style="padding: 40px 80px; position: relative; z-index: 1; border-top: 1px solid rgba(59, 130, 246, 0.15);">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px;">
            
            <!-- Date -->
            <div style="text-align: center; flex: 1;">
              <div style="font-size: 11px; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; font-weight: 600;">Date of Completion</div>
              <div style="font-size: 14px; color: #1e293b; font-weight: 500;">${completionDate}</div>
            </div>
            
            <!-- Center Signature/Seal Area -->
            <div style="text-align: center; flex: 1;">
              <div style="font-size: 28px; margin-bottom: 5px;">✓</div>
              <div style="font-size: 13px; font-weight: 700; color: #3b82f6; letter-spacing: 0.5px;">EDVORA</div>
              <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Learning Platform</div>
            </div>
            
            <!-- Certificate ID -->
            <div style="text-align: center; flex: 1;">
              <div style="font-size: 11px; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; font-weight: 600;">Certificate ID</div>
              <div style="font-size: 11px; color: #3b82f6; font-family: 'Courier New', monospace; letter-spacing: 1px; font-weight: 600;">${certificateId}</div>
            </div>
          </div>
          
          <!-- Bottom Decorative Line -->
          <div style="width: 100%; height: 1px; background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.2), transparent); margin-top: 20px; padding-top: 15px;">
            <div style="font-size: 9px; color: #94a3b8; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Verified Professional Achievement</div>
          </div>
        </div>
      </div>
    `

    const options = {
      margin: 0,
      filename: `${studentName.replace(/\s+/g, '_')}_${courseName.replace(/\s+/g, '_')}_Certificate.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { 
        orientation: 'landscape', 
        unit: 'in', 
        format: 'a4'
      }
    }

    // Generate and download the PDF
    html2pdf(tempDiv, options)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate certificate. Please try again.')
  }
}

// Generate unique certificate ID
export const generateCertificateId = (userId, courseId, timestamp) => {
  const date = new Date(timestamp)
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `EDVORA-${dateStr}-${randomStr}`
}
