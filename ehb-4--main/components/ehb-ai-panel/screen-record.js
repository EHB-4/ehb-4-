🔹 **Component #2 – EHB Aid**
(Verified ad platform under EHB ecosystem — now structuring it for Cursor Agent)

---

### 🟦 EHB Aid (Ad Posting & Verification System)

| Field                                                        | Description                                                                                                                                          |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔹 **Service/Module Name**                                   | EHB Aid                                                                                                                                              |
| 🔹 **Description**                                           | Ek ad posting platform jahan sirf verified ads allow hain — har ad ko pehle document proof ke sath verify kiya jata hai (no scam, no fake listings). |
| 🔹 **Target Users**                                          | Businesses, service providers, buyers, sellers, agencies                                                                                             |
| 🔹 **Key Features**                                          |                                                                                                                                                      |
| • SQL-based ad visibility                                    |                                                                                                                                                      |
| • Verified documents before ad goes live                     |                                                                                                                                                      |
| • Franchise-level ad management and moderation               |                                                                                                                                                      |
| • Auto-expiry of ads                                         |                                                                                                                                                      |
| • Complaint integration                                      |                                                                                                                                                      |
| • Ad categories: jobs, products, services, real estate, etc. |                                                                                                                                                      |
| • AI-tagging for smart visibility                            |                                                                                                                                                      |
| • Referral bonus on ad spend (EHBGC)                         |                                                                                                                                                      |
|                                                              |                                                                                                                                                      |
| 🔹 **Dependencies**                                          | PSS (KYC), JPS (Job Ads), GoSellr (Product Ads), Franchise Model, Wallet, Complaint System                                                           |
| 🔹 **Current Status**                                        | Planned                                                                                                                                              |

---

✅ Confirm or update any field above
Aap “Next” likh dein to main **Education/HPS System** ka structure deta hoon.
import React, { useState } from 'react';

const ScreenRecord = () => {
  const [recording, setRecording] = useState(false);
  return (
    <div className="my-2">
      <h4 className="font-semibold">🎥 Screen Recording</h4>
      <button className={`px-3 py-1 rounded shadow ${recording ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`} onClick={() => setRecording(r => !r)}>
        {recording ? '⏹ Stop Recording' : '⏺ Start Recording'}
      </button>
      <div className="text-xs text-gray-600 mt-1">{recording ? 'Recording in progress...' : 'Not recording.'}</div>
    </div>
  );
};

export default ScreenRecord; 