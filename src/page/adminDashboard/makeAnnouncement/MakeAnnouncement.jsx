import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axiosSecure from '../../../hooks/axiosSecure';
import useAuth from '../../../hooks/useAuth';

const MakeAnnouncement = () => {
    const {user} = useAuth();
   
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosInstance = axiosSecure();

  const onSubmit = async (data) => {
    const announcement = {
      authorImage: data.authorImage,
      authorName: data.authorName,
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString()
    };
    

    try {
      const res = await axiosInstance.post('/announcements', announcement);
   
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Announcement Published!',
          timer: 1500,
          showConfirmButton: false
        });
        reset();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: err.message
      });
    }


  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">📢 Make an Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Author Image */}
        <div>
          <label className="label">Author Image URL</label>
          <input
            type="url"
            value={user?.photoURL} readOnly
            className="input input-bordered w-full"
            {...register('authorImage', { required: 'Author image is required' })}
          />
          {errors.authorImage && <p className="text-red-500 text-sm">{errors.authorImage.message}</p>}
        </div>

        {/* Author Name */}
        <div>
          <label className="label">Author Name</label>
          <input
            type="text"
            value={user?.displayName} readOnly
            className="input input-bordered w-full"
            {...register('authorName', { required: 'Author name is required' })}
          />
          {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName.message}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="label">Announcement Title</label>
          <input
            type="text"
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            placeholder="Write your announcement..."
            className="textarea textarea-bordered w-full"
            rows="4"
            {...register('description', { required: 'Description is required' })}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary flex items-center gap-2">
          <FiSend /> Publish Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
