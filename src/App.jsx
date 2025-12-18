import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SimpleBlogList from "./pages/SimpleBlogList";
import SimpleBlogDetails from "./pages/SimpleBlogDetails";

import { Link } from "react-router-dom";

function SimpleNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 text-gray-900 p-6 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black text-gray-900 hover:text-blue-600 transition-colors duration-300">
          <img 
            src="/logo.png" 
            alt="Cygne Noir Cyber Logo" 
            className="w-10 h-10 rounded-lg shadow-lg"
          />
          <div>
            <span className="text-gray-900">CYGNE NOIR</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 ml-2">CYBER</span>
          </div>
        </Link>
        <div className="space-x-10">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-bold uppercase tracking-widest text-sm">HOME</Link>
          <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-bold uppercase tracking-widest text-sm">BLOG</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-bold uppercase tracking-widest text-sm">ABOUT</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SimpleNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<SimpleBlogList />} />
        <Route path="/blog/:slug" element={<SimpleBlogDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
