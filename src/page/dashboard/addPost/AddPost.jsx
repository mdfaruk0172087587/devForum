import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Loading from '../../../components/Loading';
import axiosSecure from '../../../hooks/axiosSecure';

const AddPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = axiosSecure();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Check if user is available before running query
  const { data: postCount = 0, isLoading } = useQuery({
    queryKey: ['userPostCount', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/devForum/count?email=${user.email}`);
      return res.data.count;
    },
    enabled: !!user?.email,
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const newPost = {
      authorImage: user?.photoURL,
      authorName: user?.displayName,
      authorEmail: user?.email,
      title: data.title,
      description: data.description,
      tag: data.tag,
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosInstance.post('/devForum', newPost);
      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Post added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate('/dashboard/myPosts');
      }
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.message || 'Something went wrong',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // If loading or user not ready
  if (isLoading || !user?.email) return <Loading />;

  // If post limit exceeded
  if (postCount >= 5) {
    return (
      <div className="text-center mt-20 space-y-4">
        <p className="text-xl font-semibold text-red-600">
          You have reached the maximum post limit (5 posts) for normal users.
        </p>
        <button onClick={() => navigate('/membership')} className="btn btn-primary">
          Become a Member
        </button>
      </div>
    );
  }

  // Form UI
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Image</label>
          <input
            {...register('authorImage')}
            value={user?.photoURL}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Your Name</label>
          <input
            {...register('authorName')}
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Your Email</label>
          <input
            {...register('authorEmail')}
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Post Title</label>
          <input
            {...register('title', { required: 'Post title is required' })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="label">Post Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="textarea textarea-bordered w-full"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className="label">Select Tag</label>
          <select
            {...register('tag', { required: 'Tag is required' })}
            defaultValue=""
            className="select select-accent w-full"
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Node.js">Node.js</option>
            <option value="Express">Express</option>
          </select>
          {errors.tag && <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
