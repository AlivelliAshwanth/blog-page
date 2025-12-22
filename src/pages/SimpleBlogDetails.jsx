import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import { PortableText } from '@portabletext/react';

const samplePosts = {
  'test-blog': {
    title: 'Cybersecurity Fundamentals',
    content: 'Understanding cybersecurity fundamentals is crucial for protecting digital assets in today\'s interconnected world. This comprehensive guide covers essential security principles, threat identification, and best practices for maintaining robust security posture. Learn about encryption, access controls, network security, and incident response strategies that form the foundation of effective cybersecurity programs.',
    category: 'Fundamentals',
    readTime: '8 min read',
    author: 'Security Expert',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop' }, alt: 'Cybersecurity Fundamentals' }
  },
  'advanced-threat-detection-ai': {
    title: 'Advanced Threat Detection with AI',
    content: 'Artificial intelligence is transforming cybersecurity by enabling faster, more accurate threat detection. Machine learning algorithms can analyze vast amounts of network data in real-time, identifying patterns that indicate potential security breaches. This proactive approach helps organizations stay ahead of cybercriminals who are constantly evolving their attack methods.',
    category: 'AI Security',
    readTime: '5 min read',
    author: 'Dr. Sarah Chen',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop' }, alt: 'AI Threat Detection' }
  },
  'zero-trust-security-architecture': {
    title: 'Zero Trust Security Architecture', 
    content: 'Zero Trust is a security model that assumes no user or device should be trusted by default, even if they are inside the network perimeter. This approach requires verification for every user and device trying to access resources, regardless of their location. Implementing Zero Trust involves continuous monitoring, strict access controls, and comprehensive identity verification.',
    category: 'Architecture',
    readTime: '8 min read',
    author: 'Marcus Rodriguez',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop' }, alt: 'Zero Trust Architecture' }
  },
  'cloud-security-best-practices': {
    title: 'Cloud Security Best Practices',
    content: 'Securing cloud infrastructure requires a multi-layered approach. Key practices include implementing strong identity and access management, encrypting data both in transit and at rest, regularly monitoring for suspicious activities, and maintaining proper backup and disaster recovery procedures. Organizations must also ensure compliance with relevant regulations and industry standards.',
    category: 'Cloud Security',
    readTime: '6 min read',
    author: 'Jennifer Kim',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop' }, alt: 'Cloud Security' }
  },
  'incident-response-automation': {
    title: 'Incident Response Automation',
    content: 'Streamline your security operations with automated incident response workflows and AI-powered threat analysis. Modern security operations centers require rapid response capabilities to address the increasing volume and sophistication of cyber threats.',
    category: 'Automation',
    readTime: '7 min read',
    author: 'Alex Thompson',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop' }, alt: 'Incident Response Automation' }
  },
  'ransomware-protection-strategies': {
    title: 'Ransomware Protection Strategies',
    content: 'Comprehensive strategies to protect your organization from ransomware attacks and ensure business continuity. Learn about prevention, detection, and recovery techniques that can save your organization from devastating attacks.',
    category: 'Threat Protection',
    readTime: '9 min read',
    author: 'David Park',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop' }, alt: 'Ransomware Protection' }
  },
  'security-compliance-framework': {
    title: 'Security Compliance Framework',
    content: 'Navigate complex regulatory requirements with our comprehensive security compliance framework and audit tools. Understanding compliance requirements is essential for modern organizations.',
    category: 'Compliance',
    readTime: '10 min read',
    author: 'Lisa Wang',
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop' }, alt: 'Security Compliance' }
  }
};

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

export default function SimpleBlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          body,
          excerpt,
          tags,
          publishedAt
        }`;
        const data = await client.fetch(query, { slug });
        if (data) {
          setPost(data);
        } else {
          setPost(samplePosts[slug]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(samplePosts[slug]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-blue-600">LOADING ARTICLE...</h1>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto px-6 py-32 text-center">
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-12 font-bold transition-colors duration-300 group text-lg">
            <span className="mr-3 transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            BACK TO CYBER INSIGHTS
          </Link>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 mb-8">404</h1>
            <h2 className="text-4xl font-black text-gray-900 mb-8">ARTICLE NOT FOUND</h2>
            <p className="text-gray-600 mb-12 text-xl">
              The cybersecurity insight you're looking for doesn't exist or has been moved to a secure location.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <Link to="/" className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 font-semibold transition-all duration-300 group border border-white/30 hover:bg-white/30">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Articles
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {post.category && (
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                )}
                {post.readTime && (
                  <span className="text-white/80 text-sm">{post.readTime}</span>
                )}
                {post.author && (
                  <span className="text-white/80 text-sm">By {post.author}</span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.publishedAt && (
                <p className="text-white/80">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
            
            <div className="flex justify-center">
              {post.mainImage?.asset?.url ? (
                <img 
                  src={post.mainImage.asset.url} 
                  alt={post.mainImage.alt || post.title}
                  className="w-full max-w-md h-64 object-cover rounded-2xl shadow-2xl"
                />
              ) : (
                <img 
                  src={getPlaceholderImage(post)} 
                  alt={post.title}
                  className="w-full max-w-md h-64 object-cover rounded-2xl shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="px-2 pb-20">
        <article className="w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {post.body ? (
                <PortableText value={post.body} />
              ) : (
                <div className="space-y-6">
                  <p className="text-xl leading-relaxed text-gray-700 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                    {post.content || post.excerpt}
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <h3 className="text-lg font-bold text-blue-800 mb-2">💡 Key Insight</h3>
                    <p className="text-blue-700">
                      This cybersecurity insight provides essential knowledge for protecting your organization against modern threats.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                      <h4 className="font-bold text-green-800 mb-3">✅ Best Practices</h4>
                      <ul className="text-green-700 space-y-2">
                        <li>• Regular security assessments</li>
                        <li>• Employee training programs</li>
                        <li>• Multi-factor authentication</li>
                        <li>• Continuous monitoring</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                      <h4 className="font-bold text-red-800 mb-3">⚠️ Common Risks</h4>
                      <ul className="text-red-700 space-y-2">
                        <li>• Outdated security policies</li>
                        <li>• Insufficient access controls</li>
                        <li>• Lack of incident response plan</li>
                        <li>• Poor password management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {post.tags && post.tags.filter(tag => typeof tag === 'string').length > 0 && (
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.filter(tag => typeof tag === 'string').map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              View More Articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}