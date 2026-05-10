import React, { useRef, useState } from 'react';
import { SummaryCards } from './SummaryCards';
import { MemberCard } from './MemberCard';
import { Charts } from './Charts';
import { Camera, Copy } from 'lucide-react';
import html2canvas from 'html2canvas';

export const Dashboard = ({ data, availableYears, selectedYear, onYearChange, availableMembers, selectedMember, onMemberChange }) => {
  const { totals, members } = data;
  const summaryAreaRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleCapture = () => {
    if (summaryAreaRef.current) {
      const buttons = summaryAreaRef.current.querySelectorAll('.no-capture');
      buttons.forEach(btn => btn.style.display = 'none');

      html2canvas(summaryAreaRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          const animatedElements = clonedDoc.querySelectorAll('.animate-fade-in');
          animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
          });
        }
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `summary-report.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        buttons.forEach(btn => btn.style.display = 'flex');
      });
    }
  };

  const handleCopy = () => {
    if (summaryAreaRef.current) {
      const buttons = summaryAreaRef.current.querySelectorAll('.no-capture');
      buttons.forEach(btn => btn.style.display = 'none');

      html2canvas(summaryAreaRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          const animatedElements = clonedDoc.querySelectorAll('.animate-fade-in');
          animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
          });
        }
      }).then(canvas => {
        canvas.toBlob(blob => {
          try {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(() => {
              setToast({ show: true, message: 'คัดลอกรูปภาพลง Clipboard สำเร็จ' });
              setTimeout(() => setToast({ show: false, message: '' }), 2000);
            }).catch(err => {
              console.error('Failed to copy image: ', err);
              setToast({ show: true, message: 'ไม่สามารถคัดลอกรูปภาพได้' });
              setTimeout(() => setToast({ show: false, message: '' }), 2000);
            });
          } catch (e) {
            console.error('ClipboardItem not supported or error: ', e);
            setToast({ show: true, message: 'เบราว์เซอร์ของคุณไม่สนับสนุนการคัดลอกรูปภาพโดยตรง' });
            setTimeout(() => setToast({ show: false, message: '' }), 2000);
          }
          buttons.forEach(btn => btn.style.display = 'flex');
        }, 'image/png');
      });
    }
  };

  return (
    <div style={{ padding: 'var(--spacing-md) 0', maxWidth: '1200px', margin: '0 auto' }}>
      <div ref={summaryAreaRef} style={{ position: 'relative', marginBottom: 'var(--spacing-md)' }}>
        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.4rem' }} className="no-capture">
          <button 
            onClick={handleCopy}
            title="Copy Image"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-secondary)', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={handleCapture}
            title="Capture Screenshot"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-secondary)', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <Camera size={14} />
          </button>
        </div>

        <header style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)', color: '#1d4ed8', display: 'inline-block' }}>
          REAL ESTATE (อสังหาริมทรัพย์)
        </h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {availableYears.length > 0 && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>ปี:</span>
              <select 
                value={selectedYear} 
                onChange={(e) => onYearChange(e.target.value)}
                style={{
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: 'none',
                  outline: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                <option value="All" style={{ color: '#000' }}>ทั้งหมด</option>
                {availableYears.map(year => (
                  <option key={year} value={year} style={{ color: '#000' }}>{year}</option>
                ))}
              </select>
            </div>
          )}

          {availableMembers && availableMembers.length > 0 && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>สมาชิก:</span>
              <select 
                value={selectedMember} 
                onChange={(e) => onMemberChange(e.target.value)}
                style={{
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: 'none',
                  outline: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                <option value="All" style={{ color: '#000' }}>ทั้งหมด</option>
                {availableMembers.map(member => (
                  <option key={member} value={member} style={{ color: '#000' }}>{member}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </header>

        <SummaryCards totals={totals} />
      </div>
      
      {toast.show && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '2rem', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            backgroundColor: '#15803d', 
            color: 'white', 
            padding: '0.6rem 1.2rem', 
            borderRadius: 'var(--radius-full)', 
            boxShadow: 'var(--shadow-xl)', 
            zIndex: 100000, 
            fontSize: '0.9rem',
            fontWeight: '600',
            animation: 'scaleIn 0.2s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }}></span>
          {toast.message}
        </div>
      )}
      
      <Charts data={data} />

      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          รายละเอียดสมาชิก
          <span style={{ fontSize: '0.875rem', fontWeight: 'normal', backgroundColor: 'var(--bg-hover)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)' }}>
            {members.length} ท่าน
          </span>
        </h2>
        
        <div className="grid grid-cols-1 gap-md">
          {members.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
