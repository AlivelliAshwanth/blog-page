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
    featured: true,
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop' }, alt: 'AI Threat Detection' }
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
    tags: ['Zero Trust', 'Architecture', 'Authentication'],
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop' }, alt: 'Zero Trust Architecture' }
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
    tags: ['Cloud', 'AWS', 'Security'],
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop' }, alt: 'Cloud Security' }
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
    tags: ['Automation', 'SOAR', 'Incident Response'],
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop' }, alt: 'Incident Response Automation' }
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
    tags: ['Ransomware', 'Backup', 'Recovery'],
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop' }, alt: 'Ransomware Protection' }
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
    tags: ['Compliance', 'GDPR', 'SOX'],
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop' }, alt: 'Security Compliance' }
  }
];

const categories = ['All', 'AI Security', 'Architecture', 'Cloud Security', 'Automation', 'Threat Protection', 'Compliance'];

// Function to get relevant placeholder image based on category or title
const getPlaceholderImage = (post) => {
  const category = post.category?.toLowerCase() || '';
  const title = post.title?.toLowerCase() || '';
  
  if (category.includes('ai') || title.includes('ai') || title.includes('artificial intelligence')) {
    return 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop';
  }
  if (category.includes('cloud') || title.includes('cloud')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop';
  }
  if (category.includes('architecture') || title.includes('zero trust') || title.includes('architecture')) {
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop';
  }
  if (category.includes('automation') || title.includes('automation') || title.includes('incident')) {
    return 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop';
  }
  if (category.includes('ransomware') || title.includes('ransomware') || title.includes('malware')) {
    return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop';
  }
  if (category.includes('compliance') || title.includes('compliance') || title.includes('regulation')) {
    return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop';
  }
  // Default cybersecurity image
  return 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop';
};

export default function SimpleBlogList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useSample, setUseSample] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const testSanityConnection = async () => {
    try {
      const hasToken = !!process.env.REACT_APP_SANITY_TOKEN;
      const tokenPreview = process.env.REACT_APP_SANITY_TOKEN ? 
        process.env.REACT_APP_SANITY_TOKEN.substring(0, 10) + '...' : 'NOT FOUND';
      
      setDebugInfo(`Token: ${hasToken ? '✅ Found' : '❌ Missing'} (${tokenPreview})\nTesting connection...`);
      
      const basicQuery = `*[_type == "post"]{ _id, title, _rev }`;
      const basicResult = await client.fetch(basicQuery);
      
      const publishedQuery = `*[_type == "post" && !(_id in path("drafts.**"))]{ _id, title, publishedAt }`;
      const publishedResult = await client.fetch(publishedQuery);
      
      const draftQuery = `*[_type == "post" && _id in path("drafts.**")]{ _id, title }`;
      const draftResult = await client.fetch(draftQuery);
      
      setDebugInfo(`✅ Connection successful!\nToken: ${hasToken ? '✅ Found' : '❌ Missing'} (${tokenPreview})\n\nTotal posts: ${basicResult.length}\nPublished posts: ${publishedResult.length}\n\nPublished posts:\n${JSON.stringify(publishedResult, null, 2)}\n\n${publishedResult.length === 0 ? '⚠️ No published posts found! Make sure to publish your posts in Sanity Studio.' : ''}`);
    } catch (error) {
      const hasToken = !!process.env.REACT_APP_SANITY_TOKEN;
      const tokenPreview = process.env.REACT_APP_SANITY_TOKEN ? 
        process.env.REACT_APP_SANITY_TOKEN.substring(0, 10) + '...' : 'NOT FOUND';
        
      setDebugInfo(`❌ Connection Error: ${error.message}\nToken: ${hasToken ? '✅ Found' : '❌ Missing'} (${tokenPreview})\n\nFor Vercel deployment:\n1. Add REACT_APP_SANITY_TOKEN to Vercel environment variables\n2. Redeploy the project\n3. Make sure posts are published in Sanity Studio`);
    }
  };
  
  const getStoredEmails = () => {
    return JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Test basic connection first
        console.log('Testing basic Sanity connection...');
        const basicTest = await client.fetch(`*[0..2]`);
        console.log('Basic connection test:', basicTest);
        
        // Test specific document types
        const docTypes = await client.fetch(`*[]{_type} | order(_type) | {"type": _type}`);
        console.log('Document types in project:', docTypes);
        
        // Count posts
        const postCount = await client.fetch(`count(*[_type == "post"])`);
        console.log('Total post count:', postCount);
        
        // Simplified query without complex fields - only published posts
        const query = `*[_type == "post" && !(_id in path("drafts.**"))] {
          _id,
          title,
          slug,
          excerpt,
          category,
          readTime,
          author,
          tags,
          featured,
          publishedAt
        }`;
        
        const data = await client.fetch(query);
        console.log('Simplified query result:', data);
        console.log('=== END DEBUG ===');
        
        // Always use Sanity data if available, fallback to sample
        if (data && data.length > 0) {
          console.log('✅ Using Sanity data - Found', data.length, 'posts');
          setPosts(data);
          setFilteredPosts(data);
          setUseSample(false);
        } else {
          console.log('📝 No Sanity posts found, using sample posts');
          setPosts(samplePosts);
          setFilteredPosts(samplePosts);
          setUseSample(true);
        }
      } catch (error) {
        console.error('❌ Error fetching posts from Sanity:', error);
        console.log('📝 Using sample posts due to error');
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
    let filtered = [...posts];
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (post.title && typeof post.title === 'string' && post.title.toLowerCase().includes(searchLower)) ||
          (post.excerpt && typeof post.excerpt === 'string' && post.excerpt.toLowerCase().includes(searchLower)) ||
          (post.category && typeof post.category === 'string' && post.category.toLowerCase().includes(searchLower))
        );
      });
    }

    // Sort posts
    if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortBy === 'oldest') {
      filtered = [...filtered].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
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
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-0">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full text-base font-bold uppercase tracking-wider">
                AI & CYBERSECURITY INSIGHTS
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-none mt-6">
              <span className="text-gray-900 block">CYGNENOIR CYBER</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 animate-gradient-x" style={{color: '#007bff'}}>BLOGS</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Cutting-edge AI & Cybersecurity intelligence, threat analysis, and expert insights to keep your organization secure in an evolving digital landscape.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search cybersecurity insights, threats, solutions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 text-base border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg"
                  />
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
                    🔍
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Filters */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
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
                className="px-4 py-2 border-2 border-gray-200 rounded-full font-bold focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Regular Updates</span>
              </div>
              <div>📊 {filteredPosts.length} Articles</div>
              <div>👥 Expert Authors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-6">
        {/* Latest Article */}
        {posts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-start gap-3 mb-6">
              <h2 className="text-2xl font-black text-gray-900">LATEST ARTICLE</h2>
            </div>
            {(() => {
              const latestPost = [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
              return (
                <article className="relative rounded-2xl overflow-hidden shadow-xl group hover:transform hover:scale-[1.02] transition-all duration-700" style={{background: 'linear-gradient(135deg, #007bff 0%, #081745 100%)'}}>
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="relative z-10 p-8 text-white">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold border border-white border-opacity-30">
                        🔥 {latestPost.category}
                      </span>
                      <span className="text-blue-100 flex items-center gap-2">
                        <span>⏱️</span> {typeof latestPost.readTime === 'string' ? latestPost.readTime : 'N/A'}
                      </span>
                      <span className="text-blue-100 flex items-center gap-2">
                        <span>👤</span> {typeof latestPost.author === 'string' ? latestPost.author : 'Anonymous'}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                      {latestPost.title}
                    </h3>
                    <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-4xl">
                      {latestPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {(latestPost.tags || ['AI', 'Security', 'Tech']).slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white border-opacity-30">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/blog/${latestPost.slug?.current}`}
                      className="inline-flex items-center bg-white text-black px-10 py-5 rounded-full font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl group"
                    >
                      READ ARTICLE
                      <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </article>
              );
            })()}
          </div>
        )}

        {/* Filtered Results */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="mb-12">
            <div className="flex items-center justify-start gap-3 mb-6">
              <h2 className="text-2xl font-black text-gray-900">RESULTS ({filteredPosts.length})</h2>
            </div>
            {filteredPosts.length === 0 ? (
              <div className="bg-gray-50 border-2 border-gray-200 p-12 rounded-2xl text-center shadow-xl">
                <div className="text-4xl mb-4">🔍</div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">NO RESULTS FOUND</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Try adjusting your search criteria or explore different categories.
                </p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article key={post._id} className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-500 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                    {post.mainImage?.asset?.url ? (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.mainImage.asset.url} 
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                        <img 
                          src={getPlaceholderImage(post)} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                          {typeof post.category === 'string' ? post.category : 'Uncategorized'}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <span>⏱️</span>
                          <span>{typeof post.readTime === 'string' ? post.readTime : 'N/A'}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(post.tags || ['Security', 'Tech', 'Cyber']).slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Link 
                          to={`/blog/${post.slug?.current}`}
                          className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 flex items-center gap-2 group"
                        >
                          READ MORE 
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Link>
                        <div className="text-right">
                          <div className="text-gray-400 text-sm">{typeof post.author === 'string' ? post.author : 'Anonymous'}</div>
                          <div className="text-gray-400 text-xs">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Show All Articles when no filters are applied */}
        {!searchTerm && selectedCategory === 'All' && (
          <>
            {/* Featured Article */}
            {filteredPosts.find(post => post.featured) && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-black text-gray-900">FEATURED ARTICLE</h2>
                </div>
                {(() => {
                  const featuredPost = filteredPosts.find(post => post.featured);
                  return (
                    <article className="relative rounded-2xl overflow-hidden shadow-xl group hover:transform hover:scale-[1.02] transition-all duration-700" style={{background: 'linear-gradient(135deg, #007bff 0%, #081745 100%)'}}>
                      <div className="absolute inset-0 bg-black opacity-20"></div>
                      <div className="relative z-10 p-8 text-white">
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
                        <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                          {featuredPost.title}
                        </h3>
                        <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-4xl">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                          {(featuredPost.tags || ['Featured', 'Security', 'AI']).map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Link 
                          to={`/blog/${featuredPost.slug?.current}`}
                          className="inline-flex items-center bg-white text-black px-10 py-5 rounded-full font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl group"
                        >
                          READ ARTICLE
                          <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </Link>
                      </div>
                    </article>
                  );
                })()}
              </div>
            )}

            {/* Articles Grid */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">ALL ARTICLES</h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
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
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                      <img 
                        src={getPlaceholderImage(post)} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                        {typeof post.category === 'string' ? post.category : 'Uncategorized'}
                      </span>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>⏱️</span>
                        <span>{typeof post.readTime === 'string' ? post.readTime : 'N/A'}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(post.tags || ['Security', 'Tech', 'Cyber']).slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/blog/${post.slug?.current}`}
                        className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 flex items-center gap-2 group"
                      >
                        READ MORE 
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">{typeof post.author === 'string' ? post.author : 'Anonymous'}</div>
                        <div className="text-gray-400 text-xs">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-12 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-4">📧</div>
                <h2 className="text-2xl font-black mb-4">STAY AHEAD OF THREATS</h2>
                <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                  Get the latest cybersecurity insights, threat intelligence, and expert analysis delivered to your inbox.
                </p>
                {subscribed ? (
                  <div className="bg-green-500 text-white px-8 py-4 rounded-full font-bold max-w-lg mx-auto">
                    ✅ Thank you for subscribing! Check your email.
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-6 py-4 rounded-full text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-blue-300"
                    />
                    <button 
                      onClick={() => {
                        if (email && email.includes('@')) {
                          // Store email in localStorage
                          const existingEmails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
                          existingEmails.push({ email, date: new Date().toISOString() });
                          localStorage.setItem('subscribedEmails', JSON.stringify(existingEmails));
                          console.log('Email stored:', email);
                          setSubscribed(true);
                          setEmail('');
                        } else {
                          alert('Please enter a valid email address');
                        }
                      }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="pb-10"></div>
    </div>
  );
}