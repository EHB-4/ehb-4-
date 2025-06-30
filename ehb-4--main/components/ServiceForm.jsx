import React, { useState } from 'react';

/**
 * ServiceForm Component
 * Props:
 * - onSubmit: function (called with form data)
 * - prefillData: object (optional, prefill user info)
 * - SQLUserLevel: string (user's SQL level, controls lawyer type options)
 */

const SERVICE_TYPES = [
  'Civil Case',
  'Criminal Case',
  'Family Law',
  'Business Contract',
  'Public Complaint',
  'Other',
];

const LAWYER_TYPES = ['Normal', 'High', 'VIP'];

const MAX_FILE_SIZE_MB = 10;
const MIN_DESC_LENGTH = 50;
const MAX_DESC_LENGTH = 1000;

const ServiceForm = ({ onSubmit, prefillData = {}, SQLUserLevel = 'Normal' }) => {
  const [form, setForm] = useState({
    fullName: prefillData.fullName || '',
    contact: prefillData.contact || '',
    city: prefillData.city || '',
    serviceType: '',
    subject: '',
    description: '',
    files: [],
    preferredLawyer: '',
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  // Validation
  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!form.contact.trim() || (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contact) && !/^\+?\d{7,15}$/.test(form.contact))) {
      errs.contact = 'Valid email or phone required.';
    }
    if (!form.city.trim()) errs.city = 'City is required.';
    if (!form.serviceType) errs.serviceType = 'Service type is required.';
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    if (!form.description.trim() || form.description.length < MIN_DESC_LENGTH) {
      errs.description = `Description must be at least ${MIN_DESC_LENGTH} characters.`;
    }
    if (form.files.some(f => f.size > MAX_FILE_SIZE_MB * 1024 * 1024)) {
      errs.files = `Each file must be less than ${MAX_FILE_SIZE_MB}MB.`;
    }
    if (!form.agree) errs.agree = 'You must confirm the request is true.';
    return errs;
  };

  // Handle input changes
  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm(f => ({ ...f, files: Array.from(files) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  // Handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    // Simulate request ID generation
    const fakeId = 'REQ-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setRequestId(fakeId);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      if (onSubmit) onSubmit({ ...form, requestId: fakeId });
    }, 1200);
  };

  // Lawyer type options based on SQLUserLevel
  const availableLawyerTypes = LAWYER_TYPES.filter(lvl => {
    if (SQLUserLevel === 'VIP') return true;
    if (SQLUserLevel === 'High') return lvl !== 'VIP';
    return lvl === 'Normal';
  });

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Request Submitted!</h2>
        <p className="mb-2">Your request ID: <span className="font-mono text-blue-700">{requestId}</span></p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow" onClick={() => window.location.href='/jps/my-cases'}>Track My Case</button>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-6" itemScope itemType="https://schema.org/LegalService">
      <h1 className="text-3xl font-bold mb-4" itemProp="name">Submit Verified Legal Help Request</h1>
      <meta name="keywords" content="Legal Help Form, Submit Public Complaint, Online Law Services Pakistan" />
      <meta name="description" content="Submit your verified legal service request through EHB JPS platform and connect with licensed lawyers." />
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-1">Your Full Name *</label>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}
        </div>
        {/* Contact */}
        <div>
          <label className="block font-semibold mb-1">Contact Details (Email or Phone) *</label>
          <input type="text" name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          {errors.contact && <span className="text-red-500 text-xs">{errors.contact}</span>}
        </div>
        {/* City */}
        <div>
          <label className="block font-semibold mb-1">Your City *</label>
          <input type="text" name="city" value={form.city} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
        </div>
        {/* Service Type */}
        <div>
          <label className="block font-semibold mb-1">Select Legal Service Type *</label>
          <select name="serviceType" value={form.serviceType} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
            <option value="">-- Select --</option>
            {SERVICE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.serviceType && <span className="text-red-500 text-xs">{errors.serviceType}</span>}
        </div>
        {/* Subject */}
        <div>
          <label className="block font-semibold mb-1">Subject of Your Case *</label>
          <input type="text" name="subject" value={form.subject} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          {errors.subject && <span className="text-red-500 text-xs">{errors.subject}</span>}
        </div>
        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Describe the issue in detail *</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={5} maxLength={MAX_DESC_LENGTH} required />
          <div className="text-xs text-gray-500">{form.description.length}/{MAX_DESC_LENGTH} characters</div>
          {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
        </div>
        {/* File Upload */}
        <div>
          <label className="block font-semibold mb-1">Attach relevant documents (if any)</label>
          <input type="file" name="files" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleChange} className="w-full" />
          <div className="text-xs text-gray-500">PDF, JPG, DOCX allowed. Max size: {MAX_FILE_SIZE_MB}MB each.</div>
          {errors.files && <span className="text-red-500 text-xs">{errors.files}</span>}
        </div>
        {/* Preferred Lawyer Type */}
        <div>
          <label className="block font-semibold mb-1">Preferred Lawyer Type (optional)</label>
          <select name="preferredLawyer" value={form.preferredLawyer} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">-- No Preference --</option>
            {availableLawyerTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        {/* Agree Checkbox */}
        <div className="flex items-center">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="mr-2" required />
          <label className="text-sm">I confirm this request is true and can be legally verified. *</label>
        </div>
        {errors.agree && <span className="text-red-500 text-xs">{errors.agree}</span>}
        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow disabled:opacity-60" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
        {/* Upgrade Required Tag */}
        {SQLUserLevel === 'Free' && (
          <div className="mt-2 text-yellow-700 bg-yellow-100 px-3 py-2 rounded text-xs font-semibold inline-block">Upgrade Required: Please verify your account with PSS or EDR for advanced services.</div>
        )}
      </form>
    </section>
  );
};

export default ServiceForm; 