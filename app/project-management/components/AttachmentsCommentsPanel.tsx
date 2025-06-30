import React from 'react';

interface Attachment {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  date: string;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

interface AttachmentsCommentsPanelProps {
  attachments: Attachment[];
  comments: Comment[];
}

const AttachmentsCommentsPanel: React.FC<AttachmentsCommentsPanelProps> = ({
  attachments,
  comments,
}) => {
  return (
    <div className="mt-6 bg-blue-50 rounded-xl p-4 shadow">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-blue-800">Attachments</h3>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-medium focus:outline-none"
            aria-label="Add attachment"
          >
            + Add Attachment
          </button>
        </div>
        <ul className="divide-y divide-blue-100">
          {attachments.length === 0 && <li className="text-sm text-gray-400">No attachments.</li>}
          {attachments.map(att => (
            <li key={att.id} className="py-2 flex items-center justify-between">
              <div>
                <span className="font-medium text-blue-900">{att.name}</span>
                <span className="ml-2 text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {att.type}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                {att.uploadedBy} • {att.date}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Comments</h3>
        <ul className="divide-y divide-blue-100 mb-3 max-h-32 overflow-y-auto">
          {comments.length === 0 && <li className="text-sm text-gray-400">No comments yet.</li>}
          {comments.map(comment => (
            <li key={comment.id} className="py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-blue-900 text-xs">{comment.user}</span>
                <span className="text-xs text-gray-500">{comment.date}</span>
              </div>
              <div className="text-sm text-gray-700">{comment.text}</div>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 items-end">
          <textarea
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            placeholder="Add a comment..."
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-medium focus:outline-none"
            aria-label="Add comment"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachmentsCommentsPanel;
