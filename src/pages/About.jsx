export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black mb-8">
            <span className="text-gray-900">ABOUT</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 ml-4">US</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Leading the future of cybersecurity through innovation, expertise, and cutting-edge AI technology.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div className="bg-white border border-gray-200 p-10 rounded-2xl shadow-lg">
              <h2 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                OUR MISSION
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Founded by cybersecurity experts, Cygne Noir Cyber specializes in protecting 
                businesses from sophisticated cyber threats through innovative AI-driven solutions.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe in proactive security measures that adapt to emerging threats, 
                ensuring our clients stay ahead of cybercriminals in an ever-evolving digital landscape.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 p-10 rounded-2xl shadow-lg">
              <h2 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                OUR EXPERTISE
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700 text-lg">
                  <span className="text-blue-600 mr-4 text-2xl">▶</span>
                  Advanced Threat Detection & Response
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <span className="text-blue-600 mr-4 text-2xl">▶</span>
                  AI-Powered Security Analytics
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <span className="text-blue-600 mr-4 text-2xl">▶</span>
                  Penetration Testing & Vulnerability Assessment
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <span className="text-blue-600 mr-4 text-2xl">▶</span>
                  Compliance & Risk Management
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <span className="text-blue-600 mr-4 text-2xl">▶</span>
                  Security Training & Awareness
                </li>
              </ul>
            </div>
          </div>
          
          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 p-12 rounded-2xl mb-20 shadow-lg">
            <h2 className="text-5xl font-black text-center mb-16 text-gray-900">
              WHY CHOOSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">US?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-6xl mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">🔒</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">24/7 MONITORING</h3>
                <p className="text-gray-600 leading-relaxed">
                  Round-the-clock security monitoring and incident response with advanced AI-powered threat detection.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">👥</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">EXPERT TEAM</h3>
                <p className="text-gray-600 leading-relaxed">
                  Certified security professionals with decades of experience in enterprise cybersecurity.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">🚀</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">CUTTING-EDGE TECH</h3>
                <p className="text-gray-600 leading-relaxed">
                  Latest AI and machine learning technologies for predictive threat intelligence and response.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-5xl font-black mb-8 text-gray-900">
              READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">PROTECT</span> YOUR BUSINESS?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Contact us today to learn how our advanced cybersecurity solutions can safeguard your organization.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-16 py-6 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl">
              GET IN TOUCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}