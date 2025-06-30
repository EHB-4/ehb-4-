import React, { useState } from "react";
import APIAgent from "@/agents/APIAgent";

const COMPLAINT_TYPES = [
  { value: "LATE_DELIVERY", label: "Late Delivery" },
  { value: "DAMAGED_ITEM", label: "Damaged Item" },
  { value: "WRONG_PRODUCT", label: "Wrong Product" },
  { value: "SCAM_OR_FRAUD", label: "Fraud" },
  { value: "OTHER", label: "Other" },
];

const ComplaintModal = ({ orderId, userId, onClose, onSuccess }) => {
  const [complaintType, setComplaintType] = useState(COMPLAINT_TYPES[0].value);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Array of File
  const [location, setLocation] = useState("Model Town, Lahore"); // Mocked location
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle image upload (max 3)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
  };

  // Convert images to base64 (for mock/demo)
  const getImageData = async () => {
    if (!images.length) return [];
    return Promise.all(
      images.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const imageData = await getImageData();
      const body = {
        orderId,
        userId,
        type: complaintType,
        description,
        images: imageData,
        location,
      };
      const res = await APIAgent.post("/complaints/new", body);
      if (res.data.success) {
        setSuccess(true);
        if (onSuccess) onSuccess(res.data);
      } else {
        setError(res.data.error || "Failed to submit complaint");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 min-w-[320px] max-w-md shadow-lg relative">
          <h3 className="text-lg font-bold mb-2">Complaint Submitted</h3>
          <p className="mb-4">Your complaint has been submitted and will be reviewed by your area franchise.</p>
          <button className="bg-ehb-primary text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg p-6 min-w-[320px] max-w-md shadow-lg relative"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          type="button"
          onClick={onClose}
        >
          ❌
        </button>
        <h3 className="text-lg font-bold mb-2">🧾 File Complaint – Order #{orderId}</h3>
        <label className="block mb-2 font-semibold">📁 Complaint Type:</label>
        <select
          className="w-full border rounded px-2 py-1 mb-3"
          value={complaintType}
          onChange={(e) => setComplaintType(e.target.value)}
        >
          {COMPLAINT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <label className="block mb-2 font-semibold">✍️ Description:</label>
        <textarea
          className="w-full border rounded px-2 py-1 mb-3"
          rows={3}
          placeholder="Please explain your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="block mb-2 font-semibold">📸 Upload Proof (optional):</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleImageChange}
          className="mb-3"
          disabled={images.length >= 3}
        />
        {images.length > 0 && (
          <div className="flex gap-2 mb-3">
            {images.map((img, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">{img.name}</span>
            ))}
          </div>
        )}
        <label className="block mb-2 font-semibold">📍 Location (optional):</label>
        <input
          className="w-full border rounded px-2 py-1 mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-ehb-primary text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "📨 Submit Complaint"}
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
            disabled={submitting}
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintModal; 