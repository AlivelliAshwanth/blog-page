import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client } from '../sanityClient';

export default function BlogDetails() {
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
          publishedAt,
          excerpt
        }`;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-red-400 mb-8">Post Not Found</h1>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <Link to="/blog" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Blog
        </Link>
        
        <article className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          
          {post.publishedAt && (
            <p className="text-gray-400 mb-8">
              Published: {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          )}
          
          <div className="prose prose-invert prose-lg max-w-none">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p className="text-gray-300">{post.excerpt}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}