import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import { PortableText } from '@portabletext/react';

const samplePosts = {
  'test-blog': {
    title: 'Cybersecurity Fundamentals',
    content: 'Understanding cybersecurity fundamentals is crucial for protecting digital assets in today\'s interconnected world. This comprehensive guide covers essential security principles, threat identification, and best practices for maintaining robust security posture. Learn about encryption, access controls, network security, and incident response strategies that form the foundation of effective cybersecurity programs.'
  },
  'advanced-threat-detection-ai': {
    title: 'Advanced Threat Detection with AI',
    content: 'Artificial intelligence is transforming cybersecurity by enabling faster, more accurate threat detection. Machine learning algorithms can analyze vast amounts of network data in real-time, identifying patterns that indicate potential security breaches. This proactive approach helps organizations stay ahead of cybercriminals who are constantly evolving their attack methods.'
  },
  'zero-trust-security-architecture': {
    title: 'Zero Trust Security Architecture', 
    content: 'Zero Trust is a security model that assumes no user or device should be trusted by default, even if they are inside the network perimeter. This approach requires verification for every user and device trying to access resources, regardless of their location. Implementing Zero Trust involves continuous monitoring, strict access controls, and comprehensive identity verification.'
  },
  'cloud-security-best-practices': {
    title: 'Cloud Security Best Practices',
    content: 'Securing cloud infrastructure requires a multi-layered approach. Key practices include implementing strong identity and access management, encrypting data both in transit and at rest, regularly monitoring for suspicious activities, and maintaining proper backup and disaster recovery procedures. Organizations must also ensure compliance with relevant regulations and industry standards.'
  }
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
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-32">
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-16 font-bold transition-colors duration-300 group text-lg">
          <span className="mr-3 transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          BACK TO CYBER INSIGHTS
        </Link>
        
        <article className="max-w-5xl mx-auto">
          <header className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>
            {post.publishedAt && (
              <p className="text-gray-600 text-lg font-bold uppercase tracking-widest">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </header>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-lg">
            <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed">
              {post.body ? (
                <PortableText value={post.body} />
              ) : (
                <p className="text-xl leading-relaxed">{post.content || post.excerpt}</p>
              )}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/blog"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              VIEW MORE INSIGHTS
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}