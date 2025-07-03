'use client';

import React, { useState } from 'react';
import { PenTool, FileText, Copy, Download, Sparkles, Edit3, Save } from 'lucide-react';

interface ContentTemplate {
  id: string;
  name: string;
  type: 'job-description' | 'email-template' | 'interview-feedback' | 'placement-report';
  content: string;
}

interface ContentWritingProps {
  onContentGenerated: (content: string, type: string) => void;
}

/**
 * Roman Urdu: Content Writing Component
 * Auto content generation provide karta hai
 */
export default function ContentWriting({ onContentGenerated }: ContentWritingProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates: ContentTemplate[] = [
    {
      id: 'job-desc-1',
      name: 'Senior Developer Job Description',
      type: 'job-description',
      content: `We are seeking a talented Senior Developer to join our dynamic team. 

**Requirements:**
- 5+ years of experience in software development
- Strong knowledge of React, Node.js, and TypeScript
- Experience with cloud platforms (AWS/Azure)
- Excellent problem-solving skills

**Responsibilities:**
- Lead development projects
- Mentor junior developers
- Collaborate with cross-functional teams
- Ensure code quality and best practices

**Benefits:**
- Competitive salary package
- Health insurance
- Professional development opportunities
- Flexible working hours`
    },
    {
      id: 'email-1',
      name: 'Interview Invitation Email',
      type: 'email-template',
      content: `Dear [Candidate Name],

We are pleased to invite you for an interview for the [Position] role at [Company Name].

**Interview Details:**
- Date: [Date]
- Time: [Time]
- Location: [Location/Video Call]
- Duration: Approximately 1 hour

**What to bring:**
- Updated resume
- Portfolio (if applicable)
- Government ID

Please confirm your attendance by replying to this email.

Best regards,
[Your Name]
[Company Name]`
    },
    {
      id: 'feedback-1',
      name: 'Interview Feedback Template',
      type: 'interview-feedback',
      content: `**Interview Feedback Report**

**Candidate:** [Name]
**Position:** [Role]
**Interview Date:** [Date]
**Interviewer:** [Name]

**Technical Skills:** [Rating 1-5]
- Comments: [Detailed feedback]

**Communication Skills:** [Rating 1-5]
- Comments: [Detailed feedback]

**Problem Solving:** [Rating 1-5]
- Comments: [Detailed feedback]

**Cultural Fit:** [Rating 1-5]
- Comments: [Detailed feedback]

**Overall Assessment:**
[Summary of candidate's performance]

**Recommendation:**
[Recommend next steps]`
    },
    {
      id: 'report-1',
      name: 'Placement Success Report',
      type: 'placement-report',
      content: `**Placement Success Report**

**Candidate:** [Name]
**Position:** [Role]
**Company:** [Company Name]
**Start Date:** [Date]
**Salary:** [Amount]

**Placement Process:**
- Application submitted: [Date]
- Interview scheduled: [Date]
- Interview completed: [Date]
- Offer received: [Date]
- Placement confirmed: [Date]

**Key Achievements:**
- [Achievement 1]
- [Achievement 2]
- [Achievement 3]

**Commission Earned:** [Amount]
**Success Rate:** [Percentage]`
    }
  ];

  const generateContent = async (templateId: string) => {
    setIsGenerating(true);
    
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const content = template.content;
      setGeneratedContent(content);
      onContentGenerated(content, template.type);
    }
    
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Content copied to clipboard!');
  };

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-content.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <PenTool className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Content Generation</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Templates</h3>
          
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {template.type.replace('-', ' ')}
                    </p>
                  </div>
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => generateContent(selectedTemplate)}
            disabled={!selectedTemplate || isGenerating}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content
              </>
            )}
          </button>
        </div>

        {/* Generated Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
            {generatedContent && (
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={downloadContent}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Download content"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {generatedContent ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {generatedContent}
              </pre>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a template and generate content</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Quick Actions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Template
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="h-4 w-4 mr-2" />
            New Template
          </button>
        </div>
      </div>
    </div>
  );
} 