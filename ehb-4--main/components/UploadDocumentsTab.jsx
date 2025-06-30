import React, { useState } from 'react';

// Mock data for demonstration
const mockCases = [
  { id: 'CASE-2741', title: 'Property Dispute' },
  { id: 'CASE-2742', title: 'Contract Drafting' },
];
const mockDocs = [
  {
    id: 'DOC1',
    title: 'FIR Copy',
    caseId: 'CASE-2741',
    uploadedOn: '2025-06-26',
    uploadedBy: 'User',
    status: 'Verified',
    fileType: 'pdf',
    url: '#',
  },
  {
    id: 'DOC2',
    title: 'Agreement Draft',
    caseId: 'CASE-2742',
    uploadedOn: '2025-06-25',
    uploadedBy: 'Lawyer',
    status: 'Pending',
    fileType: 'docx',
    url: '#',
  },
  {
    id: 'DOC3',
    title: 'Property Image',
    caseId: 'CASE-2741',
    uploadedOn: '2025-06-24',
    uploadedBy: 'User',
    status: 'Rejected',
    fileType: 'jpg',
    url: '#',
  },
];

const FILE_ICONS = {
  pdf: '📄',
  docx: '📝',
  jpg: '🖼️',
  png: '🖼️',
};
const STATUS_COLORS = {
  Pending: 'bg-gray-200 text-gray-700',
  Verified: 'bg-green-200 text-green-800',
  Rejected: 'bg-red-200 text-red-800',
};
const SQL_LIMITS = {
  Free: 1,
  Basic: 3,
  Normal: Infinity,
  High: Infinity,
  VIP: Infinity,
};

const UploadDocumentsTab = ({ userSQL = 'Normal', userCases = mockCases, userDocs = mockDocs }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    caseId: '',
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [docs, setDocs] = useState(userDocs);
  const [filterCase, setFilterCase] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Upload limit logic
  const uploadsForCase = docs.filter(d => d.caseId === form.caseId);
  const uploadLimit = SQL_LIMITS[userSQL] || 1;
  const canUpload = !form.caseId || uploadsForCase.length < uploadLimit;

  // Validation
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.caseId) errs.caseId = 'Select a case.';
    if (!form.file) errs.file = 'File is required.';
    else {
      const ext = form.file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'docx', 'jpg', 'jpeg', 'png'].includes(ext)) {
        errs.file = 'File type not allowed.';
      }
      if (form.file.size > 10 * 1024 * 1024) {
        errs.file = 'File must be less than 10MB.';
      }
    }
    if (!userCases.length) errs.caseId = 'You must have at least 1 active case.';
    if (!canUpload) errs.file = `Upload limit reached for this case (${uploadLimit} per case).`;
    return errs;
  };

  // Handle input changes
  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm(f => ({ ...f, file: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  // Handle submit
  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    // Simulate upload
    setTimeout(() => {
      setDocs(prev => [
        {
          id: 'DOC' + (prev.length + 1),
          title: form.title,
          caseId: form.caseId,
          uploadedOn: new Date().toISOString().slice(0, 10),
          uploadedBy: 'User',
          status: 'Pending',
          fileType: form.file.name.split('.').pop().toLowerCase(),
          url: '#',
        },
        ...prev,
      ]);
      setForm({ title: '', description: '', caseId: '', file: null });
      setSubmitting(false);
    }, 1200);
  };

  // Filtered docs
  const filteredDocs = docs.filter(doc =>
    (!filterCase || doc.caseId === filterCase) &&
    (!filterStatus || doc.status === filterStatus) &&
    (!search || doc.title.toLowerCase().includes(search.toLowerCase()))
  );

  // Actions
  const handleDelete = id => {
    setDocs(prev => prev.filter(d => d.id !== id));
  };
  const handleResubmit = id => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'Pending' } : d));
  };

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">📤 Upload Legal Documents</h2>
      {/* SQL-level note */}
      {userSQL === 'Free' && <div className="mb-2 text-yellow-700 bg-yellow-100 px-3 py-2 rounded text-xs font-semibold inline-block">More uploads unlocked at Normal SQL</div>}
      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white border rounded p-4 mb-6 space-y-4" noValidate>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Document Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Select Case *</label>
            <select name="caseId" value={form.caseId} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value="">-- Select --</option>
              {userCases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            {errors.caseId && <span className="text-red-500 text-xs">{errors.caseId}</span>}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={2} />
        </div>
        <div>
          <label className="block font-semibold mb-1">Upload File *</label>
          <input type="file" name="file" accept=".pdf,.docx,.jpg,.jpeg,.png" onChange={handleChange} className="w-full" required />
          <div className="text-xs text-gray-500">PDF, DOCX, JPG, PNG allowed. Max size: 10MB.</div>
          {errors.file && <span className="text-red-500 text-xs">{errors.file}</span>}
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow disabled:opacity-60" disabled={submitting || !canUpload}>
          {submitting ? 'Uploading...' : 'Upload and link to case'}
        </button>
      </form>
      {/* Filters/Search */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select value={filterCase} onChange={e => setFilterCase(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Cases</option>
          {userCases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input type="text" placeholder="Search by title..." value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-2 py-1 text-sm" />
      </div>
      {/* Uploaded Documents List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100 text-xs">
              <th className="p-2">File</th>
              <th className="p-2">Title</th>
              <th className="p-2">Linked Case</th>
              <th className="p-2">Uploaded On</th>
              <th className="p-2">Uploaded By</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.length === 0 && (
              <tr><td colSpan={7} className="text-center text-gray-400 py-4">No documents found.</td></tr>
            )}
            {filteredDocs.map(doc => (
              <tr key={doc.id} className="border-b text-sm">
                <td className="p-2 text-center text-xl">{FILE_ICONS[doc.fileType] || '📎'}</td>
                <td className="p-2">{doc.title}</td>
                <td className="p-2">{doc.caseId}</td>
                <td className="p-2">{doc.uploadedOn}</td>
                <td className="p-2">{doc.uploadedBy}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[doc.status] || 'bg-gray-100 text-gray-700'}`}>{doc.status}</span>
                </td>
                <td className="p-2 flex gap-2">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" title="View/Download">🔽</a>
                  {doc.status !== 'Verified' && (
                    <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:underline" title="Delete">🗑️</button>
                  )}
                  {doc.status === 'Rejected' && (
                    <button onClick={() => handleResubmit(doc.id)} className="text-yellow-600 hover:underline" title="Resubmit">📝</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UploadDocumentsTab; 