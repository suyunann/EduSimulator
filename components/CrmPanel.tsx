import React from 'react';
import type { Customer } from '../types';

interface CrmPanelProps {
  customer: Customer;
}

const CrmInfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-slate-500">{label}</dt>
    <dd className={`mt-1 text-sm text-slate-900 transition-colors duration-500 ${value === '未知' ? 'text-slate-400 italic' : 'font-semibold'}`}>
      {value}
    </dd>
  </div>
);

const CrmPanel: React.FC<CrmPanelProps> = ({ customer }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mr-4">
          <i className="fa-solid fa-user text-3xl text-slate-500"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{customer.name}</h3>
          <p className="text-sm text-slate-500">潛在客戶</p>
        </div>
      </div>
      <dl className="space-y-4">
        <CrmInfoRow label="諮詢項目" value={customer.interest} />
        <CrmInfoRow label="客戶背景" value={customer.background} />
        <CrmInfoRow label="學習動機" value={customer.motivation} />
        <CrmInfoRow label="主要痛點" value={customer.painPoint} />
        <CrmInfoRow label="預算考量" value={customer.budget} />
        <CrmInfoRow label="期望時程" value={customer.timeline} />
      </dl>
    </div>
  );
};

export default CrmPanel;
