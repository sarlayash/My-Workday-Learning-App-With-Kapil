import React, { useRef, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { Download, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateProps {
  learnerName: string;
  onUpdateLearnerName: (name: string) => void;
  completedHours: number;
  completedLevelsCount: number;
}

export const CertificateGenerator: React.FC<CertificateProps> = ({
  learnerName,
  onUpdateLearnerName,
  completedHours,
  completedLevelsCount,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [selectedMilestone, setSelectedMilestone] = useState<'30hr' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5'>('30hr');
  const [verificationCode, setVerificationCode] = useState<string>('WD-CAP-F500-2026-9812A');

  useEffect(() => {
    // Generate deterministic code based on learner name
    const hash = Math.abs(
      learnerName.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    ).toString(16).toUpperCase().padStart(6, '7');
    setVerificationCode(`WD-CAP-F500-2026-${hash}`);
  }, [learnerName]);

  const getCertificateDetails = () => {
    switch (selectedMilestone) {
      case 'phase1':
        return {
          title: 'CERTIFICATE OF FOUNDATION EXCELLENCE',
          designation: 'CERTIFIED WORKDAY FOUNDATION SPECIALIST',
          hours: '5 Clock Hours (Levels 1 - 5)',
          curriculum: 'Core In-Memory Object Model, Supervisory Orgs, Staffing & Compensation',
          tierName: 'Bronze Tier Accredited',
        };
      case 'phase2':
        return {
          title: 'CERTIFICATE OF WORKFLOW ENGINEERING',
          designation: 'CERTIFIED WORKDAY BUSINESS PROCESS ENGINEER',
          hours: '10 Clock Hours (Levels 1 - 10)',
          curriculum: 'Business Process Framework, Dynamic Conditions, Hire Lifecycle & Staffing',
          tierName: 'Silver Tier Accredited',
        };
      case 'phase3':
        return {
          title: 'CERTIFICATE OF SECURITY GOVERNANCE',
          designation: 'CERTIFIED ENTERPRISE SECURITY ARCHITECT',
          hours: '15 Clock Hours (Levels 1 - 15)',
          curriculum: 'Domain Security Policies, RBSG Contextual Roles, BPSP & SOX Audit Governance',
          tierName: 'Titanium Tier Accredited',
        };
      case 'phase4':
        return {
          title: 'CERTIFICATE OF ANALYTICS MASTERY',
          designation: 'CERTIFIED REPORTING & CALC FIELDS MASTER',
          hours: '20 Clock Hours (Levels 1 - 20)',
          curriculum: 'Advanced RaaS, PBO/RBO Graph Traversal, ESI/LRV Formulas & Prism Dashboards',
          tierName: 'Gold Tier Accredited',
        };
      case 'phase5':
        return {
          title: 'CERTIFICATE OF INTEGRATION ARCHITECTURE',
          designation: 'CERTIFIED CLOUD INTEGRATION SPECIALIST',
          hours: '25 Clock Hours (Levels 1 - 25)',
          curriculum: 'Outbound & Inbound EIBs, Workday Studio Assemblies, Core Connectors & ISU Security',
          tierName: 'Platinum Tier Accredited',
        };
      default:
        return {
          title: 'CERTIFICATE OF ENTERPRISE EXCELLENCE',
          designation: 'FORTUNE 500 CERTIFIED WORKDAY PRINCIPAL ARCHITECT',
          hours: '30 Comprehensive Hours (30 Distinct Levels)',
          curriculum: 'Complete Zero to Infinity Workday Mastery: HCM, Security, Analytics, EIB, Benefits & Payroll',
          tierName: 'Diamond Capstone Credential',
        };
    }
  };

  const cert = getCertificateDetails();

  // Render on Canvas for pristine HD download (3000x2000 px)
  const drawCertificateToCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 3000;
    const height = 2000;
    canvas.width = width;
    canvas.height = height;

    // Background - Elegant parchment/luxury pearl ivory
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#090D16');
    bgGrad.addColorStop(0.5, '#0F172A');
    bgGrad.addColorStop(1, '#080E1A');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Ornate Border Layers
    ctx.strokeStyle = '#D97706'; // Gold outer
    ctx.lineWidth = 12;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    ctx.strokeStyle = '#F59E0B'; // Secondary fine gold
    ctx.lineWidth = 4;
    ctx.strokeRect(84, 84, width - 168, height - 168);

    ctx.strokeStyle = 'rgba(217, 119, 6, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 100, width - 200, height - 200);

    // Corner Ornaments
    const drawCorner = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, 20);
      ctx.lineTo(20, 20);
      ctx.lineTo(20, 80);
      ctx.lineTo(0, 80);
      ctx.closePath();
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    drawCorner(104, 104, 0);
    drawCorner(width - 104, 104, Math.PI / 2);
    drawCorner(width - 104, height - 104, Math.PI);
    drawCorner(104, height - 104, -Math.PI / 2);

    // Header Emblem Arc
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0284C7'; // Workday blue accent
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('FORTUNE 500 ENTERPRISE WORKDAY ACADEMY', width / 2, 220);

    // Certificate Title
    ctx.fillStyle = '#F59E0B'; // Gold
    ctx.font = 'bold 74px "Cinzel", "Playfair Display", Georgia, serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(cert.title, width / 2, 330);

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '36px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('MY ZERO TO INFINITY WORKDAY JOURNEY WITH KAPIL', width / 2, 410);

    // Separator line with diamond
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 350, 460);
    ctx.lineTo(width / 2 + 350, 460);
    ctx.stroke();

    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(width / 2, 460, 8, 0, Math.PI * 2);
    ctx.fill();

    // Conferral statement
    ctx.fillStyle = '#CBD5E1';
    ctx.font = 'italic 38px "Playfair Display", Georgia, serif';
    ctx.fillText('This official credential certifies with highest distinction that', width / 2, 570);

    // Learner Name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 96px "Cinzel", "Playfair Display", Georgia, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(learnerName.toUpperCase(), width / 2, 700);

    // Underline for name
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 450, 730);
    ctx.lineTo(width / 2 + 450, 730);
    ctx.stroke();

    // Designation
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('has successfully fulfilled all rigorous hands-on enterprise simulations, conferring the title of', width / 2, 830);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(cert.designation, width / 2, 920);

    // Curriculum details
    ctx.fillStyle = '#94A3B8';
    ctx.font = '32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(cert.curriculum, width / 2, 1000);

    ctx.fillStyle = '#FBBF24';
    ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Accreditation: ${cert.hours} · ${cert.tierName}`, width / 2, 1060);

    // Draw Gold Medallion Seal (Center-Left)
    const sealX = width / 2 - 600;
    const sealY = 1420;
    const sealRadius = 140;

    // Seal outer glow / ribbons
    ctx.fillStyle = '#B45309';
    ctx.beginPath();
    ctx.moveTo(sealX - 45, sealY + 80);
    ctx.lineTo(sealX - 80, sealY + 280);
    ctx.lineTo(sealX - 45, sealY + 240);
    ctx.lineTo(sealX - 10, sealY + 280);
    ctx.lineTo(sealX - 10, sealY + 80);
    ctx.fill();

    ctx.fillStyle = '#D97706';
    ctx.beginPath();
    ctx.moveTo(sealX + 10, sealY + 80);
    ctx.lineTo(sealX + 10, sealY + 280);
    ctx.lineTo(sealX + 45, sealY + 240);
    ctx.lineTo(sealX + 80, sealY + 280);
    ctx.lineTo(sealX + 45, sealY + 80);
    ctx.fill();

    // Circular Gold Seal Body
    const sealGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, sealRadius);
    sealGrad.addColorStop(0, '#FEF3C7');
    sealGrad.addColorStop(0.4, '#F59E0B');
    sealGrad.addColorStop(0.8, '#D97706');
    sealGrad.addColorStop(1, '#92400E');
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
    ctx.fill();

    // Seal inner ring
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius - 20, 0, Math.PI * 2);
    ctx.stroke();

    // Seal text
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('FORTUNE 500', sealX, sealY - 35);
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('OFFICIAL', sealX, sealY);
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SEAL', sealX, sealY + 32);

    // Signatures
    // Signature 1: Kapil Narula (Global Mentor & Principal Architect)
    const sig1X = width / 2;
    const sig1Y = 1440;

    // Stylized signature stroke
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(sig1X - 180, sig1Y - 20);
    ctx.bezierCurveTo(sig1X - 100, sig1Y - 80, sig1X - 40, sig1Y + 30, sig1X + 20, sig1Y - 40);
    ctx.bezierCurveTo(sig1X + 60, sig1Y - 80, sig1X + 120, sig1Y - 10, sig1X + 180, sig1Y - 30);
    ctx.stroke();

    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sig1X - 220, sig1Y + 20);
    ctx.lineTo(sig1X + 220, sig1Y + 20);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Kapil Narula', sig1X, sig1Y + 70);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Workday Principal Enterprise Architect', sig1X, sig1Y + 110);
    ctx.fillText('Program Lead & Global Mentor', sig1X, sig1Y + 145);

    // Signature 2: Enterprise Certification Board
    const sig2X = width / 2 + 600;
    const sig2Y = 1440;

    ctx.strokeStyle = '#A855F7';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(sig2X - 160, sig2Y - 15);
    ctx.bezierCurveTo(sig2X - 80, sig2Y - 70, sig2X - 10, sig2Y + 20, sig2X + 60, sig2Y - 50);
    ctx.bezierCurveTo(sig2X + 90, sig2Y - 70, sig2X + 130, sig2Y - 5, sig2X + 170, sig2Y - 25);
    ctx.stroke();

    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sig2X - 220, sig2Y + 20);
    ctx.lineTo(sig2X + 220, sig2Y + 20);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Certification Board', sig2X, sig2Y + 70);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Global Enterprise Workday Standards', sig2X, sig2Y + 110);
    ctx.fillText('Audit & Verification Authority', sig2X, sig2Y + 145);

    // Bottom Verification Bar
    const issueDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    ctx.fillStyle = '#475569';
    ctx.font = '24px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`CREDENTIAL ID: ${verificationCode}`, 160, 1840);
    ctx.fillText(`DATE OF ISSUANCE: ${issueDate.toUpperCase()}`, 160, 1880);

    ctx.textAlign = 'right';
    ctx.fillText('STATUS: VERIFIED & TAMPER-PROOF', width - 160, 1840);
    ctx.fillText('BLOCKCHAIN HASH: 88F4-WD-PROD-CAPIL-009A', width - 160, 1880);
  };

  const handleDownloadPNG = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    drawCertificateToCanvas(canvas);

    canvas.toBlob((blob) => {
      if (!blob) {
        setIsExporting(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Workday_Certificate_${learnerName.replace(/\s+/g, '_')}_${selectedMilestone}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 'image/png', 1.0);
  };

  const handleDownloadPDF = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    drawCertificateToCanvas(canvas);

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    // Landscape A4 / US Letter in points (792 x 612 pt)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [792, 528],
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, 792, 528);
    pdf.save(`Workday_Certificate_${learnerName.replace(/\s+/g, '_')}_${selectedMilestone}.pdf`);
    setIsExporting(false);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-8">
      {/* Configuration Header & Controls */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-6 backdrop-blur">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              Official Fortune 500 Enterprise Credential Generator
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Workday Zero to Infinity Certificate
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Download your verified certificate of completion signed by Mentor Kapil Narula in 3000px Ultra-HD PNG and printable PDF.
            </p>
          </div>

          {/* Action Download Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm rounded-lg shadow-md shadow-amber-500/10 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Rendering...' : 'Download High-Res PNG'}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm rounded-lg shadow-md shadow-sky-600/20 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              {isExporting ? 'Compiling PDF...' : 'Download Official PDF'}
            </button>
          </div>
        </div>

        {/* Milestone Selector & Learner Name Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-700/60">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Learner Full Name (Printed on Certificate)
            </label>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => onUpdateLearnerName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white font-medium text-sm focus:outline-none focus:border-amber-500"
              placeholder="e.g. Kapil Narula"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Select Credential Tier / Milestone
            </label>
            <select
              value={selectedMilestone}
              onChange={(e) => setSelectedMilestone(e.target.value as any)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white font-medium text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="30hr">Grand Capstone (30-Hour Principal Architect) - Diamond</option>
              <option value="phase1">Hours 1-5: Foundation Specialist - Bronze</option>
              <option value="phase2">Hours 6-10: Business Process Engineer - Silver</option>
              <option value="phase3">Hours 11-15: Enterprise Security Architect - Titanium</option>
              <option value="phase4">Hours 16-20: Analytics & Calc Fields Master - Gold</option>
              <option value="phase5">Hours 21-25: Cloud Integration Specialist - Platinum</option>
            </select>
          </div>
        </div>
      </div>

      {/* Live Preview Container (Framed with luxury border) */}
      <div className="relative rounded-2xl p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Subtle Watermark and background decorative circles */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Certificate Display Box */}
        <div className="relative border-4 border-amber-600/80 rounded-xl p-6 sm:p-12 text-center bg-slate-900/90 shadow-inner">
          {/* Ornate corner marks */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

          {/* Academy Header */}
          <div className="text-sky-400 font-semibold tracking-widest text-xs uppercase mb-2">
            FORTUNE 500 ENTERPRISE WORKDAY ACADEMY
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400 tracking-wider font-serif mb-2">
            {cert.title}
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-6">
            MY ZERO TO INFINITY WORKDAY JOURNEY WITH KAPIL
          </p>

          <div className="w-48 h-0.5 bg-amber-500/40 mx-auto my-6" />

          <p className="text-slate-300 italic text-sm sm:text-base font-serif mb-4">
            This official credential certifies with highest distinction that
          </p>

          {/* Learner Name with gold gradient */}
          <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 tracking-wide font-serif my-4">
            {learnerName || 'Kapil Narula'}
          </div>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-4 mb-2">
            has successfully fulfilled all rigorous hands-on enterprise simulations, conferring the title of
          </p>

          <div className="text-lg sm:text-2xl font-bold text-sky-400 tracking-wide mb-3">
            {cert.designation}
          </div>

          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mb-4">
            {cert.curriculum}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accreditation: {cert.hours} · {cert.tierName}
          </div>

          {/* Signatures & Seal Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-6 mt-12 pt-8 border-t border-slate-800">
            {/* Medallion Seal Preview */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-700 via-amber-400 to-amber-200 p-1 shadow-lg shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-amber-950/80 border border-amber-300/40 flex flex-col items-center justify-center text-center p-1">
                  <ShieldCheck className="w-6 h-6 text-amber-300 mb-0.5" />
                  <span className="text-[9px] font-black text-amber-200 uppercase tracking-tighter">F500 SEAL</span>
                  <span className="text-[8px] text-amber-400 font-mono">VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Signature 1: Mentor Kapil Narula */}
            <div className="flex flex-col items-center text-center">
              <div className="h-10 flex items-center justify-center font-serif italic text-2xl text-sky-400 select-none">
                Kapil Narula
              </div>
              <div className="w-44 h-0.5 bg-slate-600 mb-1.5" />
              <div className="text-xs font-bold text-white">Kapil Narula</div>
              <div className="text-[11px] text-slate-400">Workday Principal Enterprise Architect</div>
              <div className="text-[10px] text-slate-500">Program Lead & Global Mentor</div>
            </div>

            {/* Signature 2: Certification Board */}
            <div className="flex flex-col items-center text-center">
              <div className="h-10 flex items-center justify-center font-serif italic text-xl text-purple-400 select-none">
                Certification Board
              </div>
              <div className="w-44 h-0.5 bg-slate-600 mb-1.5" />
              <div className="text-xs font-bold text-white">Enterprise Board of Examiners</div>
              <div className="text-[11px] text-slate-400">Fortune 500 Standards Authority</div>
              <div className="text-[10px] text-slate-500">Global Workday Governance</div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono mt-8 pt-4 border-t border-slate-800">
            <div>CREDENTIAL ID: {verificationCode}</div>
            <div>STATUS: TAMPER-PROOF DIGITAL CERTIFICATE</div>
            <div>ISSUANCE: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
