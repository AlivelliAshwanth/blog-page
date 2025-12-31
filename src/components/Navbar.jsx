import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-0.5" style={{fontSize: '9px', fontWeight: 'bold'}}>
          <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-white" style={{fontSize: '6px'}}>🔒</span>
          </div>
          <span className="text-blue-400 hover:text-blue-300">Cygne Noir Cyber</span>
        </Link>
        <div className="space-x-1.5" style={{fontSize: '7px'}}>
          <Link to="/" className="hover:text-blue-400 cursor-pointer">Home</Link>
          <Link to="/blog" className="hover:text-blue-400 cursor-pointer">Blog</Link>
          <Link to="/about" className="hover:text-blue-400 cursor-pointer">About</Link>
        </div>
      </div>
    </nav>
  );
}