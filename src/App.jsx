import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SimpleBlogList from "./pages/SimpleBlogList";
import SimpleBlogDetails from "./pages/SimpleBlogDetails";
import DevPage from "./pages/DevPage";

import { Link } from "react-router-dom";

function SimpleNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 text-gray-900 p-3 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="flex justify-between items-center px-4">
        <a href="https://www.cygnenoircyber.com" className="flex items-center gap-3 text-2xl font-black text-gray-900 hover:text-blue-600 transition-colors duration-300">
          <img 
            src="/logo.png" 
            alt="Cygne Noir Cyber Logo" 
            className="w-16 h-12 rounded-lg shadow-lg object-contain border border-black"
          />
          <div>
            <span className="text-gray-900">CYGNE NOIR</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 ml-2">CYBER</span>
          </div>
        </a>
        <div className="space-x-10">
          <a href="https://www.cygnenoircyber.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-bold uppercase tracking-widest text-base">HOME</a>
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-bold uppercase tracking-widest text-base">BLOG</Link>
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
        <Route path="/" element={<SimpleBlogList />} />
        <Route path="/blog/:slug" element={<SimpleBlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
