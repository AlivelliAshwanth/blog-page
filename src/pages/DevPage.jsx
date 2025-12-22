import { useState } from 'react';

export default function DevPage() {
  const [showEmails, setShowEmails] = useState(false);
  
  const getStoredEmails = () => {
    return JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Developer Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Subscriptions</h2>
            
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Total subscribers: <span className="font-bold text-blue-600">{getStoredEmails().length}</span>
              </p>
              <button 
                onClick={() => setShowEmails(!showEmails)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                {showEmails ? 'Hide Emails' : 'View All Emails'}
              </button>
            </div>

            {showEmails && (
              <div className="border-t pt-6">
                {getStoredEmails().length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No emails collected yet.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 font-bold text-gray-700 border-b pb-2">
                      <span>Email Address</span>
                      <span>Subscription Date</span>
                    </div>
                    {getStoredEmails().map((item, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{item.email}</span>
                        <span className="text-gray-600">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}