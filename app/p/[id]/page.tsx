import { getPaste } from "@/lib/pasteService";
import { notFound } from "next/navigation";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paste = await getPaste(id);
  if (!paste) notFound();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '24px 32px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>Shared Paste</h1>
        </div>
        
        <div style={{
          padding: '32px',
          background: '#f9fafb'
        }}>
          <pre style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
            fontSize: '15px',
            lineHeight: '1.6',
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            margin: 0,
            color: '#1f2937',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {paste.content}
          </pre>
        </div>
      </div>
    </div>
  );
}
