import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/posts', formData);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-20">
    <div className="min-h-full bg-cyan-700 rounded-xl w-fit p-20 shadow-lg text-white">
      <div className="bg-black">
    <Link to={"/"}><p className="text-3xl hover:scale-125 transition-all -translate-y-14 -translate-x-14 fixed">⬅️</p></Link>
    </div>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h1 className="text-5xl text-white font-bold mb-8">Create Post</h1>
      <div className="mb-4">
        <label className="block">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full shadow-sm hover:shadow-xl transition-all text-black rounded-2xl px-3 py-2 border-0 outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-black  transition-all shadow-sm hover:shadow-xl rounded-2xl border-0 outline-none px-3 py-2"
          required
        />
      </div>
      
      <button type="submit" className="bg-blue-600 hover:bg-blue-950 transition-all text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
    </div>
    </div>
  );
};

export default CreatePost;
