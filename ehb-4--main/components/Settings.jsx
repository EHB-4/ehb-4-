import React, { useState } from 'react';

const mockSettings = {
  serviceFee: 5,
  sqlUpgradeFees: { Basic: 2, Normal: 5, High: 10, VIP: 20 },
  complaintWindows: { sub: 6, master: 6, corporate: 12 },
  autoFine: 10,
  minReqs: { Basic: 'KYC', Normal: 'EDR 60%', High: 'EDR 80%', VIP: 'Franchise Endorsement' },
  franchiseCommission: 20,
  complaintFine: 100,
  franchiseFees: { Sub: 50, Master: 100, Corporate: 200 },
  devAccessFee: 10,
  autoEscalate: 6,
  sqlDowngrade: 30,
  maxServices: 3,
  orderTimeout: 24,
  expiryDays: 365,
  notifications: {
    escalation: true,
    sqlApproval: true,
    kycExpiry: true,
    dailySummary: true,
    aiAlerts: false,
  },
};
const mockRoles = [
  { name: 'Corporate Admin', permissions: ['All'], special: false },
  { name: 'System Config Manager', permissions: ['Settings'], special: false },
  { name: 'Complaint Officer', permissions: ['Complaints'], special: true },
  { name: 'SQL Verifier', permissions: ['SQL'], special: true },
];

const Settings = () => {
  const [settings, setSettings] = useState(mockSettings);
  const [roles, setRoles] = useState(mockRoles);
  const [newRole, setNewRole] = useState('');
  const [newPerm, setNewPerm] = useState('');

  // Handlers (mock, no backend)
  const handleSettingChange = (key, value) => setSettings(s => ({ ...s, [key]: value }));
  const handleFeeChange = (level, value) => setSettings(s => ({ ...s, sqlUpgradeFees: { ...s.sqlUpgradeFees, [level]: value } }));
  const handleMinReqChange = (level, value) => setSettings(s => ({ ...s, minReqs: { ...s.minReqs, [level]: value } }));
  const handleRoleAdd = () => {
    if (newRole) setRoles(r => [...r, { name: newRole, permissions: [], special: false }]);
    setNewRole('');
  };
  const handleRoleDelete = idx => setRoles(r => r.filter((_, i) => i !== idx));

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">⚙️ System Settings & Roles</h2>
      {/* Platform Settings Panel */}
      <div className="bg-white border rounded p-6 mb-6">
        <h3 className="font-semibold mb-2">Platform Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">🧾 Service Fee Structure (%)</label>
            <input type="number" value={settings.serviceFee} onChange={e => handleSettingChange('serviceFee', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">🛡 SQL Upgrade Fee (per level)</label>
            {Object.keys(settings.sqlUpgradeFees).map(l => (
              <div key={l} className="flex items-center gap-2 mb-1">
                <span className="text-xs w-12">{l}</span>
                <input type="number" value={settings.sqlUpgradeFees[l]} onChange={e => handleFeeChange(l, e.target.value)} className="border rounded px-2 py-1 w-16" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">⏳ Complaint Time Windows (h)</label>
            <div className="flex gap-2">
              <input type="number" value={settings.complaintWindows.sub} onChange={e => setSettings(s => ({ ...s, complaintWindows: { ...s.complaintWindows, sub: e.target.value } }))} className="border rounded px-2 py-1 w-16" placeholder="Sub" />
              <input type="number" value={settings.complaintWindows.master} onChange={e => setSettings(s => ({ ...s, complaintWindows: { ...s.complaintWindows, master: e.target.value } }))} className="border rounded px-2 py-1 w-16" placeholder="Master" />
              <input type="number" value={settings.complaintWindows.corporate} onChange={e => setSettings(s => ({ ...s, complaintWindows: { ...s.complaintWindows, corporate: e.target.value } }))} className="border rounded px-2 py-1 w-16" placeholder="Corporate" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">🚨 Auto-Fine Rule (%)</label>
            <input type="number" value={settings.autoFine} onChange={e => handleSettingChange('autoFine', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">🎓 Min Requirements (per SQL)</label>
            {Object.keys(settings.minReqs).map(l => (
              <div key={l} className="flex items-center gap-2 mb-1">
                <span className="text-xs w-12">{l}</span>
                <input type="text" value={settings.minReqs[l]} onChange={e => handleMinReqChange(l, e.target.value)} className="border rounded px-2 py-1 w-32" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">📊 Franchise Commission (%)</label>
            <input type="number" value={settings.franchiseCommission} onChange={e => handleSettingChange('franchiseCommission', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
        </div>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">Save Platform Settings</button>
      </div>
      {/* Role & Access Management */}
      <div className="bg-white border rounded p-6 mb-6">
        <h3 className="font-semibold mb-2">Role & Access Management</h3>
        <div className="flex flex-wrap gap-4 mb-2">
          {roles.map((r, i) => (
            <div key={i} className="border rounded p-3 flex flex-col items-start min-w-[180px]">
              <div className="font-bold mb-1">{r.name} {r.special && <span className="text-xs text-purple-600">(Special)</span>}</div>
              <div className="text-xs mb-1">Permissions: {r.permissions.join(', ') || 'None'}</div>
              <button className="text-xs text-red-600 hover:underline" onClick={() => handleRoleDelete(i)}>Delete</button>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <input type="text" placeholder="New Role Name" value={newRole} onChange={e => setNewRole(e.target.value)} className="border rounded px-2 py-1 text-xs" />
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded text-xs" onClick={handleRoleAdd}>Add Role</button>
          </div>
        </div>
        <div className="text-xs text-gray-500">Assign permissions and hierarchy in detail panel (future feature).</div>
      </div>
      {/* Notifications & Triggers */}
      <div className="bg-white border rounded p-6 mb-6">
        <h3 className="font-semibold mb-2">Notifications & Triggers</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs">Complaint Escalation</label>
            <input type="checkbox" checked={settings.notifications.escalation} onChange={e => setSettings(s => ({ ...s, notifications: { ...s.notifications, escalation: e.target.checked } }))} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs">SQL Upgrade Approval</label>
            <input type="checkbox" checked={settings.notifications.sqlApproval} onChange={e => setSettings(s => ({ ...s, notifications: { ...s.notifications, sqlApproval: e.target.checked } }))} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs">KYC Expiry</label>
            <input type="checkbox" checked={settings.notifications.kycExpiry} onChange={e => setSettings(s => ({ ...s, notifications: { ...s.notifications, kycExpiry: e.target.checked } }))} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs">Daily Summary</label>
            <input type="checkbox" checked={settings.notifications.dailySummary} onChange={e => setSettings(s => ({ ...s, notifications: { ...s.notifications, dailySummary: e.target.checked } }))} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs">AI Alerts</label>
            <input type="checkbox" checked={settings.notifications.aiAlerts} onChange={e => setSettings(s => ({ ...s, notifications: { ...s.notifications, aiAlerts: e.target.checked } }))} />
          </div>
        </div>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">Save Notification Settings</button>
      </div>
      {/* Fees & Fine Matrix Editor */}
      <div className="bg-white border rounded p-6 mb-6">
        <h3 className="font-semibold mb-2">Fees & Fine Matrix Editor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Complaint Fine ($)</label>
            <input type="number" value={settings.complaintFine} onChange={e => handleSettingChange('complaintFine', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Franchise Fees ($/mo)</label>
            {Object.keys(settings.franchiseFees).map(l => (
              <div key={l} className="flex items-center gap-2 mb-1">
                <span className="text-xs w-16">{l}</span>
                <input type="number" value={settings.franchiseFees[l]} onChange={e => setSettings(s => ({ ...s, franchiseFees: { ...s.franchiseFees, [l]: e.target.value } }))} className="border rounded px-2 py-1 w-16" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Developer Access Fee ($)</label>
            <input type="number" value={settings.devAccessFee} onChange={e => handleSettingChange('devAccessFee', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
        </div>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">Save Fees & Fines</button>
      </div>
      {/* System Behavior Controls */}
      <div className="bg-white border rounded p-6 mb-6">
        <h3 className="font-semibold mb-2">System Behavior Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Auto Escalate Time (h)</label>
            <input type="number" value={settings.autoEscalate} onChange={e => handleSettingChange('autoEscalate', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">SQL Downgrade Timeout (days)</label>
            <input type="number" value={settings.sqlDowngrade} onChange={e => handleSettingChange('sqlDowngrade', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Max Services Per User</label>
            <input type="number" value={settings.maxServices} onChange={e => handleSettingChange('maxServices', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Order Handling Timeout (h)</label>
            <input type="number" value={settings.orderTimeout} onChange={e => handleSettingChange('orderTimeout', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Expiry Handling (days)</label>
            <input type="number" value={settings.expiryDays} onChange={e => handleSettingChange('expiryDays', e.target.value)} className="border rounded px-2 py-1 w-24" />
          </div>
        </div>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow text-xs">Save System Behavior</button>
      </div>
    </section>
  );
};

export default Settings; 