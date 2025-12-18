import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';

const samplePosts = [
  {
    _id: '1',
    title: 'Advanced Threat Detection with AI',
    slug: { current: 'advanced-threat-detection-ai' },
    excerpt: 'Discover how artificial intelligence is revolutionizing cybersecurity threat detection and response mechanisms in modern enterprise environments.',
    category: 'AI Security',
    readTime: '5 min read',
    publishedAt: '2024-01-15',
    author: 'Dr. Sarah Chen',
    tags: ['AI', 'Machine Learning', 'Threat Detection'],
    featured: true
  },
  {
    _id: '2', 
    title: 'Zero Trust Security Architecture',
    slug: { current: 'zero-trust-security-architecture' },
    excerpt: 'Implementing a comprehensive zero trust security model for modern enterprise environments with advanced authentication protocols.',
    category: 'Architecture',
    readTime: '8 min read',
    publishedAt: '2024-01-10',
    author: 'Marcus Rodriguez',
    tags: ['Zero Trust', 'Architecture', 'Authentication']
  },
  {
    _id: '3',
    title: 'Cloud Security Best Practices',
    slug: { current: 'cloud-security-best-practices' },
    excerpt: 'Essential security practices for protecting your cloud infrastructure and data from emerging cyber threats and vulnerabilities.',
    category: 'Cloud Security',
    readTime: '6 min read',
    publishedAt: '2024-01-05',
    author: 'Jennifer Kim',
    tags: ['Cloud', 'AWS', 'Security']
  },
  {
    _id: '4',
    title: 'Incident Response Automation',
    slug: { current: 'incident-response-automation' },
    excerpt: 'Streamline your security operations with automated incident response workflows and AI-powered threat analysis.',
    category: 'Automation',
    readTime: '7 min read',
    publishedAt: '2024-01-01',
    author: 'Alex Thompson',
    tags: ['Automation', 'SOAR', 'Incident Response']
  },
  {
    _id: '5',
    title: 'Ransomware Protection Strategies',
    slug: { current: 'ransomware-protection-strategies' },
    excerpt: 'Comprehensive strategies to protect your organization from ransomware attacks and ensure business continuity.',
    category: 'Threat Protection',
    readTime: '9 min read',
    publishedAt: '2023-12-28',
    author: 'David Park',
    tags: ['Ransomware', 'Backup', 'Recovery']
  },
  {
    _id: '6',
    title: 'Security Compliance Framework',
    slug: { current: 'security-compliance-framework' },
    excerpt: 'Navigate complex regulatory requirements with our comprehensive security compliance framework and audit tools.',
    category: 'Compliance',
    readTime: '10 min read',
    publishedAt: '2023-12-25',
    author: 'Lisa Wang',
    tags: ['Compliance', 'GDPR', 'SOX']
  }
];

const categories = ['All', 'AI Security', 'Architecture', 'Cloud Security', 'Automation', 'Threat Protection', 'Compliance'];

export default function SimpleBlogList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useSample, setUseSample] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
            },
            alt
          }
        }`;
        const data = await client.fetch(query);
        if (data.length > 0) {
          setPosts(data);
          setFilteredPosts(data);
        } else {
          setPosts(samplePosts);
          setFilteredPosts(samplePosts);
          setUseSample(true);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts(samplePosts);
        setFilteredPosts(samplePosts);
        setUseSample(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Sort posts
    if (sortBy === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortBy === 'oldest') {
      filtered = filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else if (sortBy === 'popular') {
      filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <h1 className="text-3xl font-bold text-blue-600 animate-pulse">LOADING CYBER INSIGHTS...</h1>
          <p className="text-gray-500 mt-2">Fetching the latest security intelligence</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Animated Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                AI & CYBERSECURITY INSIGHTS
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-none mt-4">
              <span className="text-gray-900 block">CYGNENOIR CYBER</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 animate-gradient-x">BLOGS</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Cutting-edge AI & Cybersecurity intelligence, threat analysis, and expert insights to keep your organization secure in an evolving digital landscape.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search cybersecurity insights, threats, solutions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-8 py-6 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg"
                  />
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
                    🔍
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Article */}
            {filteredPosts.length > 0 && (
              <div className="max-w-5xl mx-auto mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-3xl"></span>
                  <h2 className="text-2xl font-black text-gray-900">LATEST ARTICLE</h2>
                </div>
                {(() => {
                  const latestPost = filteredPosts[0];
                  return (
                    <article className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-2xl">
                      <div className="flex h-64">
                        {latestPost.mainImage?.asset?.url ? (
                          <div className="w-80 h-full flex-shrink-0 overflow-hidden">
                            <img 
                              src={latestPost.mainImage.asset.url} 
                              alt={latestPost.mainImage.alt || latestPost.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-80 h-full flex-shrink-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
                        )}
                        <div className="p-8 flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                              {latestPost.category}
                            </span>
                            <span className="text-gray-400 text-sm flex items-center gap-2">
                              <span>⏱️</span> {latestPost.readTime}
                            </span>
                            <span className="text-gray-400 text-sm flex items-center gap-2">
                              <span>👤</span> {latestPost.author}
                            </span>
                          </div>
                          <h3 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
                            {latestPost.title}
                          </h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {latestPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <Link 
                              to={`/blog/${latestPost.slug?.current}`}
                              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                              READ MORE
                            </Link>
                            <div className="text-right">
                              <div className="text-gray-400 text-xs">
                                {new Date(latestPost.publishedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })()}
              </div>
            )}

            {/* Enhanced Filters */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-full font-bold focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Live Updates</span>
              </div>
              <div>📊 {filteredPosts.length} Articles</div>
              <div>👥 Expert Authors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-6 py-16">
        {useSample && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-8 rounded-2xl mb-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🚀</div>
              <p className="text-amber-800 font-bold text-lg mb-2">
                DEMO MODE ACTIVE
              </p>
              <p className="text-amber-700">
                You're viewing sample cybersecurity content. Connect to Sanity CMS for live blog management.
              </p>
            </div>
          </div>
        )}
        
        {filteredPosts.length === 0 ? (
          <div className="bg-gray-50 border-2 border-gray-200 p-16 rounded-3xl text-center shadow-xl">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">NO INSIGHTS FOUND</h2>
            <p className="text-gray-600 text-xl mb-8">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search criteria or explore different categories.' 
                : 'Create compelling cybersecurity content in your Sanity Studio.'}
            </p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <>
            {/* Security Intelligence Feed Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  SECURITY INTELLIGENCE FEED
                </h2>
                <p className="text-gray-600">
                  <span className="font-bold text-blue-600">{filteredPosts.length}</span> expert insights
                  {selectedCategory !== 'All' && (
                    <span> in <span className="font-bold text-blue-600">{selectedCategory}</span></span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Updated Daily</span>
                </div>
              </div>
            </div>

            {/* Featured Article */}
            {filteredPosts.find(post => post.featured) && (
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">⭐</span>
                  <h2 className="text-3xl font-black text-gray-900">FEATURED INTELLIGENCE</h2>
                </div>
                {(() => {
                  const featuredPost = filteredPosts.find(post => post.featured);
                  return (
                    <article className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl overflow-hidden shadow-2xl group hover:transform hover:scale-[1.02] transition-all duration-700">
                      <div className="absolute inset-0 bg-black opacity-20"></div>
                      <div className="relative z-10 p-12 text-white">
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                          <span className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold border border-white border-opacity-30">
                            🔥 {featuredPost.category}
                          </span>
                          <span className="text-blue-100 flex items-center gap-2">
                            <span>⏱️</span> {featuredPost.readTime}
                          </span>
                          <span className="text-blue-100 flex items-center gap-2">
                            <span>👤</span> {featuredPost.author}
                          </span>
                        </div>
                        <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                          {featuredPost.title}
                        </h3>
                        <p className="text-2xl text-blue-100 mb-10 leading-relaxed max-w-4xl">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                          {featuredPost.tags?.map((tag, index) => (
                            <span key={index} className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white border-opacity-20">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Link 
                          to={`/blog/${featuredPost.slug?.current}`}
                          className="inline-flex items-center bg-white text-blue-600 px-10 py-5 rounded-full font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl group"
                        >
                          <span className="mr-3">🚀</span>
                          READ FEATURED ARTICLE
                          <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </Link>
                      </div>
                    </article>
                  );
                })()}
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured).map((post, index) => (
                <article key={post._id} className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-500 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                  {/* Main Image */}
                  {post.mainImage?.asset?.url ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.mainImage.asset.url} 
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>⏱️</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/blog/${post.slug?.current}`}
                        className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 flex items-center gap-2 group"
                      >
                        READ MORE 
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">{post.author}</div>
                        <div className="text-gray-400 text-xs">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-20 bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">📧</div>
                <h2 className="text-4xl font-black mb-6">STAY AHEAD OF THREATS</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Get the latest cybersecurity insights, threat intelligence, and expert analysis delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-blue-300"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}