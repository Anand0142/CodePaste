"use client";

import { useState } from "react";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setResult(data.url);
    setContent("");
    setTtl("");
    setMaxViews("");
  }

  return (
    <main style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px',
          textAlign: 'center'
        }}>Pastebin Lite</h1>
        
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          marginBottom: '30px',
          fontSize: '0.95rem'
        }}>Share text snippets with expiration and view limits</p>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your text here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '15px',
              fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input
              type="number"
              placeholder="visible seconds (optional)"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '14px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />

            <input
              type="number"
              placeholder="Max views (optional)"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '14px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
          >
            Create Paste
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
            borderRadius: '12px',
            border: '2px solid #86efac'
          }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#166534' }}>Paste created successfully!</p>
            <p style={{ margin: '0', fontSize: '14px', color: '#166534' }}>
              <strong>Shareable link:</strong>{' '}
              <a 
                href={result} 
                target="_blank"
                style={{
                  color: '#0ea5e9',
                  textDecoration: 'none',
                  fontWeight: '600',
                  wordBreak: 'break-all'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {result}
              </a>
            </p>
          </div>
        )}

        {error && (
          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: '#fee2e2',
            border: '2px solid #fca5a5',
            borderRadius: '12px',
            color: '#991b1b',
            fontWeight: '600'
          }}>
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
