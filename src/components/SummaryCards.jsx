import React from 'react';
import { formatCurrency } from '../utils/dataProcessor';
import { Wallet, TrendingUp, AlertCircle, Banknote, CreditCard, PiggyBank } from 'lucide-react';

export const SummaryCards = ({ totals }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-md" style={{ marginBottom: 'var(--spacing-lg)' }}>
      {/* ต้นทุนรวม (Total Cost) */}
      <div className="bg-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ color: '#db2777', opacity: 0.8, fontWeight: '500', fontSize: '0.875rem' }}>ต้นทุนทั้งหมด</h3>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(219, 39, 119, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <Wallet size={20} style={{ color: '#db2777' }} />
          </div>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#db2777' }}>
          {formatCurrency(totals.cost)}
        </div>
      </div>

      {/* ยอดจ่ายรวม (Total Paid) */}
      <div className="bg-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ color: '#15803d', opacity: 0.8, fontWeight: '500', fontSize: '0.875rem' }}>ยอดจ่ายทั้งหมด</h3>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(22, 163, 74, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <CreditCard size={20} style={{ color: '#15803d' }} />
          </div>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#15803d' }}>
          {formatCurrency(totals.paid)}
        </div>
      </div>

      {/* ค้างจ่ายรวม (Total Outstanding Pay) */}
      <div className="bg-card animate-fade-in" style={{ 
        animationDelay: '0.3s', 
        backgroundColor: totals.outstandingPay === 0 ? '' : 'rgba(254, 242, 242, 0.6)', 
        borderColor: totals.outstandingPay === 0 ? '' : 'rgba(254, 202, 202, 0.8)' 
      }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ color: totals.outstandingPay === 0 ? '#64748b' : '#dc2626', opacity: 0.8, fontSize: '0.875rem', fontWeight: '600' }}>ค้างจ่ายทั้งหมด</h3>
          <div style={{ padding: '0.5rem', backgroundColor: totals.outstandingPay === 0 ? 'rgba(148, 163, 184, 0.1)' : 'rgba(220, 38, 38, 0.15)', borderRadius: 'var(--radius-full)' }}>
            <AlertCircle size={20} style={{ color: totals.outstandingPay === 0 ? '#94a3b8' : '#dc2626' }} />
          </div>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: totals.outstandingPay === 0 ? '#94a3b8' : '#dc2626' }}>
          {formatCurrency(totals.outstandingPay)}
        </div>
      </div>

      {/* รายได้รวม (Total Income) */}
      <div className="bg-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ color: '#6d28d9', opacity: 0.8, fontWeight: '500', fontSize: '0.875rem' }}>รายได้ทั้งหมด</h3>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(109, 40, 217, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <TrendingUp size={20} style={{ color: '#6d28d9' }} />
          </div>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#6d28d9' }}>
          {formatCurrency(totals.income)}
        </div>
      </div>
      
      {/* ยอดรับรวม (Total Received) */}
      <div className="bg-card animate-fade-in col-span-1 lg:col-span-2" style={{ animationDelay: '0.45s' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ color: '#1d4ed8', opacity: 0.8, fontWeight: '500', fontSize: '0.875rem' }}>ยอดรับทั้งหมด</h3>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <Banknote size={20} style={{ color: '#1d4ed8' }} />
          </div>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1d4ed8' }}>
          {formatCurrency(totals.received)}
        </div>
      </div>
      
      {/* ค้างรับรวม (Total Outstanding Receive) */}
      <div className="bg-card animate-fade-in col-span-1 lg:col-span-2" style={{ animationDelay: '0.5s' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-sm)' }}>
          <h3 style={{ color: totals.outstandingReceive === 0 ? '#64748b' : '#ea580c', opacity: 0.8, fontWeight: totals.outstandingReceive === 0 ? '600' : '500', fontSize: '0.875rem' }}>ค้างรับทั้งหมด</h3>
          <div style={{ padding: '0.5rem', backgroundColor: totals.outstandingReceive === 0 ? 'rgba(148, 163, 184, 0.1)' : 'rgba(234, 88, 12, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <PiggyBank size={20} style={{ color: totals.outstandingReceive === 0 ? '#94a3b8' : '#ea580c' }} />
          </div>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: totals.outstandingReceive === 0 ? '#94a3b8' : '#ea580c' }}>
          {formatCurrency(totals.outstandingReceive)}
        </div>
      </div>

    </div>
  );
};
