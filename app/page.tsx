'use client';

import { useState } from 'react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        EHB Search Page
      </h1>
      
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Search
          </button>
        </div>
        
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>Type something and click Search!</p>
          <p>Current search: <strong>{searchQuery}</strong></p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h2 style={{ color: '#333' }}>EHB Services</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>🛍️ GoSellr</h3>
            <p>Shopping Platform</p>
          </div>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>🏥 Health</h3>
            <p>Medical Services</p>
          </div>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>📚 Education</h3>
            <p>Learning Platform</p>
          </div>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>⚖️ Justice</h3>
            <p>Legal Services</p>
          </div>
        </div>
      </div>
    </div>
  );
}
