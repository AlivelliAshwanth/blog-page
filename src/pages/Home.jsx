export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="container mx-auto px-6 py-32">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tight">
              <span className="text-gray-900">CYGNE NOIR</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">CYBER</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 font-light max-w-4xl mx-auto">
              Advanced Cybersecurity & AI Solutions for the Modern Enterprise
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl">
                GET STARTED
              </button>
              <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">SERVICES</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white border border-gray-200 p-10 rounded-2xl hover:border-blue-500 transition-all duration-500 group hover:transform hover:scale-105 shadow-lg">
              <div className="text-6xl mb-8 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">THREAT DETECTION</h3>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                AI-powered real-time threat detection and response systems that protect your digital infrastructure 24/7
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 p-10 rounded-2xl hover:border-blue-500 transition-all duration-500 group hover:transform hover:scale-105 shadow-lg">
              <div className="text-6xl mb-8 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">SECURITY ANALYTICS</h3>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                Advanced analytics and machine learning to identify patterns and predict security incidents
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 p-10 rounded-2xl hover:border-blue-500 transition-all duration-500 group hover:transform hover:scale-105 shadow-lg">
              <div className="text-6xl mb-8 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">COMPLIANCE</h3>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                Comprehensive compliance management and regulatory adherence across all industry standards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">SECURE</span> YOUR FUTURE?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join the next generation of cybersecurity with our AI-powered solutions
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-16 py-6 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl">
            CONTACT US TODAY
          </button>
        </div>
      </div>
    </div>
  );
}