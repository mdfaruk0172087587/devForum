import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Loading from '../../../components/Loading';
import axiosSecure from '../../../hooks/axiosSecure';
import { FaUser, FaEnvelope, FaImage, FaTag, FaHeading } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';

const AddPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = axiosSecure();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { data: LoadPost = {}, isLoading } = useQuery({
    queryKey: ['userPostCount', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/devForum/${user?.email}/count?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const { data: tagData = [], isLoading: tagLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const tagRes = await axiosInstance.get('/tags');
      return tagRes.data.tags;
    }
  });
  const postCount = LoadPost.count;
  const member = LoadPost.role;
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
  if (isLoading || tagLoading || !user?.email) return <Loading />;
  if (postCount >= 5 && member !== 'member') {
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
  return (
    <div className=" p-6 ">
      <Helmet>
        <title>Add Post</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📢 Add a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label flex items-center gap-2 text-gray-700 dark:text-gray-300"><FaImage /> Image</label>
            <input
              {...register('authorImage')}
              value={user?.photoURL}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label flex items-center gap-2 text-gray-700 dark:text-gray-300"><FaUser /> Your Name</label>
            <input
              {...register('authorName')}
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label flex items-center gap-2 text-gray-700 dark:text-gray-300"><FaEnvelope /> Your Email</label>
            <input
              {...register('authorEmail')}
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label flex items-center gap-2 text-gray-700 dark:text-gray-300"><FaHeading /> Post Title</label>
            <input
              {...register('title', { required: 'Post title is required' })}
              className="input input-bordered w-full"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="label flex items-center gap-2 text-gray-700 dark:text-gray-300"><MdDescription /> Post Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="textarea textarea-bordered w-full"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <label className="label flex items-center gap-2 text-gray-700 dark:text-gray-300"><FaTag /> Select Tag</label>
            <select
              {...register('tag', { required: 'Tag is required' })}
              defaultValue=""
              className="select select-accent w-full"
            >
              <option value="" disabled>Select Tag</option>
              {tagData.map(data => (
                <option key={data._id} value={data.tag}>{data.tag}</option>
              ))}
            </select>
            {errors.tag && <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>}
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary mt-4 w-full md:w-1/2 lg:w-1/3">
            🚀 Add Post
          </button>
        </div>
      </form>


    </div>
  );
};

export default AddPost;
