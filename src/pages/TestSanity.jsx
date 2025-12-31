import { useState, useEffect } from 'react';
import { client } from '../sanityClient';

export default function TestSanity() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Sanity connection...');
        
        // Test basic connection
        const basicTest = await client.fetch(`*[_type == "post"]{_id, title}`);
        console.log('Basic test result:', basicTest);
        
        setData(basicTest);
      } catch (err) {
        console.error('Sanity test error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) return <div className="p-8">Testing Sanity connection...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Results:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      
      <div className="mt-4">
        <p><strong>Posts found:</strong> {data?.length || 0}</p>
      </div>
    </div>
  );
}