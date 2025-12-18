import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt
        }`;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-blue-400 mb-12">Blog</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-400 text-lg">No blog posts found. Create some posts in Sanity Studio!</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <h2 className="text-xl font-bold text-white mb-3">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.slug.current}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}