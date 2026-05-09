import React from 'react';
import { formatCurrency } from '../../utils/dataProcessor';
import { User, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

export const CentralMoneyMemberCard = ({ member, index }) => {
  const { name, totals, statuses } = member;

  const getProgressStyle = (percent) => {
    if (percent === 0) return { color: '#4b5563', bg: 'none' };
    if (percent > 0 && percent < 50) return { color: '#b91c1c', bg: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' };
    if (percent >= 50 && percent < 75) return { color: '#c2410c', bg: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)' };
    if (percent >= 75 && percent < 100) return { color: '#b45309', bg: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' };
    if (percent >= 100) return { color: '#15803d', bg: 'linear-gradient(135deg, #10b981 0%, #15803d 100%)' };
    return { color: '#4b5563', bg: 'none' };
  };

  const percentCollected = totals.called > 0 ? (totals.collected / totals.called) * 100 : 0;
  const collectedStyle = getProgressStyle(percentCollected);

  const percentReturned = totals.borrowed > 0 ? (totals.returned / totals.borrowed) * 100 : 0;
  const returnedStyle = getProgressStyle(percentReturned);

  return (
    <div className="bg-card animate-fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s`, marginBottom: 'var(--spacing-md)' }}>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center" style={{ marginBottom: 'var(--spacing-md)', paddingBottom: 'var(--spacing-sm)', borderBottom: '1px solid var(--border-color)', gap: 'var(--spacing-sm)' }}>
        <div className="flex items-center gap-sm">
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)' }}>
            <User size={20} style={{ color: 'var(--text-primary)' }} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>{name}</h2>
        </div>

      </div>

      {totals.called > 0 && (
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>ความคืบหน้ายอดเก็บ</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: collectedStyle.color }}>
              {percentCollected.toFixed(0)}%
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${Math.min(100, percentCollected)}%`, 
                backgroundColor: collectedStyle.color,
                backgroundImage: collectedStyle.bg,
                borderRadius: 'var(--radius-full)',
                transition: 'width 1s ease-in-out'
              }} 
            />
          </div>
        </div>
      )}

      {totals.borrowed > 0 && (
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>ความคืบหน้ายอดคืนเงิน</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: returnedStyle.color }}>
              {percentReturned.toFixed(0)}%
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${Math.min(100, Math.max(0, percentReturned))}%`, 
                backgroundColor: returnedStyle.color,
                backgroundImage: returnedStyle.bg,
                borderRadius: 'var(--radius-full)',
                transition: 'width 1s ease-in-out'
              }} 
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {totals.called !== 0 && (
          <>
            <div>
              <p style={{ color: 'var(--text-primary)', opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: '500' }}>ยอดเรียก</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(totals.called)}</p>
            </div>
            <div>
              <p style={{ color: 'var(--accent-success)', opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: '500' }}>ยอดเก็บ</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--accent-success)' }}>{formatCurrency(totals.collected)}</p>
            </div>
            <div>
              <p style={{ color: totals.outstanding === 0 ? '#94a3b8' : 'var(--accent-danger)', opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: '500' }}>ยอดค้าง</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: totals.outstanding === 0 ? '#94a3b8' : 'var(--accent-danger)' }}>{formatCurrency(totals.outstanding)}</p>
            </div>
          </>
        )}
        {totals.withdrawn !== 0 && (
          <div>
            <p style={{ color: 'var(--accent-warning)', opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: '500' }}>ยอดเบิกเงิน</p>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--accent-warning)' }}>{formatCurrency(totals.withdrawn)}</p>
          </div>
        )}
        {totals.borrowed !== 0 && (
          <>
            <div>
              <p style={{ color: 'var(--accent-secondary)', opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: '500' }}>ยอดยืมเงิน</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--accent-secondary)' }}>{formatCurrency(totals.borrowed)}</p>
            </div>
            <div>
              <p style={{ color: 'var(--accent-success)', opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: '500' }}>ยอดคืนเงิน</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--accent-success)' }}>{formatCurrency(totals.returned)}</p>
            </div>
            <div>
              <p style={{ color: totals.outstandingReturn === 0 ? '#94a3b8' : 'var(--accent-danger)', opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: '500' }}>ยอดค้างคืน</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: totals.outstandingReturn === 0 ? '#94a3b8' : 'var(--accent-danger)' }}>{formatCurrency(totals.outstandingReturn)}</p>
            </div>
          </>
        )}
      </div>
      

    </div>
  );
};
