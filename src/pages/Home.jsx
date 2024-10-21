import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id)); // Remove post from state after successful deletion
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-20 ">
      <div className="flex flex-row justify-between">
      <h1 className="text-6xl text-white font-bold mb-4">Posts</h1>
      
      <Link to="/create" className="bg-blue-500 text-white px-4 h-fit py-2 rounded">
        Create Post
      </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
  {posts.map((post) => (
    <div key={post._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
      <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
      <p className="text-gray-300">{post.description}</p>
      <div className="mt-4 flex justify-between">
        
        <button onClick={() => handleDelete(post._id)} className="text-white p-2 rounded bg-red-600 hover:bg-red-950 transition-all">Delete</button>
      </div>
    </div>
  ))}
</div>
</div>
  );
};

export default Home;
