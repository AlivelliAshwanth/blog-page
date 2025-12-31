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
  },
  'what-is-ai-really': {
    title: 'What Is AI, Really? A Plain-English Guide to What Artificial Intelligence Actually Does (and Doesn\'t)',
    category: 'AI Security',
    readTime: '10 min read',
    author: 'Cygne Noir Team',
    tags: ['AI', 'Artificial Intelligence', 'Machine Learning', 'Technology', 'Ethics'],
    publishedAt: new Date().toISOString(),
    mainImage: { asset: { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop' }, alt: 'Artificial Intelligence Overview' },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI is everywhere — in news headlines, in boardrooms, in product pitches, and yes, even in memes. It\'s often described as the technology that will transform how we work, learn, shop, travel, and think. But let\'s be honest: Most people still have one big question — what exactly is AI, and what can it really do?'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'So… What Is AI, Really?'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'At its core, Artificial Intelligence is when machines can perform tasks that normally require human intelligence — like understanding language, recognizing images, spotting patterns, or making predictions. It\'s not a robot with feelings or consciousness. It\'s math, data, and pattern recognition working behind the scenes.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Think of it like this:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Netflix learns your taste and suggests what you\'ll binge next.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Google Maps predicts traffic using data from millions of phones.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'ChatGPT (hello!) recognizes language patterns and responds like a human.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Email spam filters learn what junk mail looks like and block it automatically.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'All of that is AI quietly doing its job. It doesn\'t "think" the way humans do — it analyzes patterns and makes educated predictions. No emotions. No intuition. Just computation.'
          }
        ]
      },
      {
        _type: 'image',
        asset: { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop' },
        alt: 'AI Technology Illustration'
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'When Machines Get It Wrong'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Here\'s the part people rarely mention: AI makes mistakes — and sometimes those mistakes can be unfair. Since AI learns from data, it also learns our human biases. A few real examples:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Facial recognition systems have misidentified darker-skinned faces more often because the training data underrepresented them.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Amazon\'s recruiting AI had to be scrapped after it began favoring male applicants — mirroring historical hiring patterns.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Credit scoring algorithms have denied loans based on zip codes, unintentionally linking decisions to geographic and demographic patterns.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'These aren\'t small glitches. They remind us that AI isn\'t neutral — it reflects the data we feed it. That\'s why ethical design, diverse datasets, and human oversight are critical. AI is powerful, but it must be responsible.'
          }
        ]
      },
      {
        _type: 'image',
        asset: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop' },
        alt: 'AI Ethics and Bias'
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'AI Around You (Even If You Don\'t Notice)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Even if you feel like you\'re not "using AI," you probably used it multiple times today:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Spotify learns what you skip and builds your perfect playlist.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Gmail Smart Reply finishes your sentences ("Got it, thanks!").'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'LinkedIn recommends people you may know — or jobs you may like.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Your bank flags suspicious transactions that don\'t match your usual behavior.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Voice assistants like Siri or Alexa turn your speech into actions.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI is already woven into your daily life — helping you save time, make decisions, and find things faster.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Can AI Think Like Us?'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Not really. AI can analyze, generate, and predict — but it doesn\'t truly understand. A simple comparison:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Situation: A friend says "I\'m fine," but you can tell they\'re upset.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Human Intuition: You sense tone, emotion, context.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI Logic: AI reads "I\'m fine" and assumes it\'s true.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Situation: You create a new workaround at work.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Human Intuition: You use judgment, experience, creativity.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI Logic: AI repeats patterns it has seen before.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Humans connect emotion + experience + context. AI connects data points. It\'s not creativity — it\'s probability. And that\'s okay. It just means AI thinks differently, and it still needs humans for empathy, ethics, and big-picture judgment.'
          }
        ]
      },
      {
        _type: 'image',
        asset: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop' },
        alt: 'Human vs AI Thinking'
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Real Power of AI'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI isn\'t here to replace people — it\'s here to amplify them. Used well, AI can:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Automate repetitive tasks so humans can focus on strategy.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Help doctors detect diseases earlier.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Identify cyber threats before they spread.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Translate languages instantly across borders.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Personalize learning for every student.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Improve customer experiences at scale.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The magic happens when human creativity meets machine efficiency. AI is a mirror: it reflects both our strengths and our flaws. The more responsibly we build it, the more powerful it becomes.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Final Thought'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI isn\'t magic. It\'s not a villain waiting to take over the world. And it\'s definitely not a replacement for human intelligence. It\'s a tool — one powered by data, designed by people, and shaped by our values. So the next time Netflix knows exactly what you feel like watching, or your email suggests the perfect response, smile. That\'s AI quietly doing its job — learning, predicting, adapting.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'How We See AI at Cygne'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'At Cygne, we believe AI should strengthen human decision-making — not replace it. Our focus is on building and applying AI responsibly, transparently, and in ways that create real value for people, teams, and businesses. We see AI as a tool that amplifies human potential, and we\'re committed to helping organizations use it thoughtfully and effectively.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI won\'t replace humans. But humans who understand AI may replace those who don\'t.'
          }
        ]
      }
    ]
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          body,
          excerpt,
          category,
          readTime,
          author,
          tags,
          featured,
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
            },
            alt
          }
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
                <PortableText 
                  value={post.body}
                  components={{
                    types: {
                      image: ({value}) => {
                        const imageUrl = value.asset?.url || value.asset?._ref ? 
                          `https://cdn.sanity.io/images/x9c1zj30/production/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` :
                          value.asset;
                        return (
                          <div className="my-8">
                            <img 
                              src={imageUrl} 
                              alt={value.alt || 'Blog image'}
                              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                            />
                            {value.alt && (
                              <p className="text-center text-gray-600 text-sm mt-2 italic">
                                {value.alt}
                              </p>
                            )}
                          </div>
                        )
                      }
                    },
                    block: {
                      h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h3>,
                      normal: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                    }
                  }}
                />
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
      <div className="pb-20"></div>
    </div>
  );
}