import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import axiosUnSecure from '../../../hooks/axiosUnSecure';
import Loading from '../../../components/Loading';

const DisplayAllPost = ({post}) => {
    const {_id, authorImage, title, createdAt, tag, upVote, downVote} = post;
    const axiosUse = axiosUnSecure();

    const {data:commentCount= 0, isLoading} = useQuery({
        queryKey: ['commentsCount'],
        queryFn: async() => {
            const res = await axiosUse.get(`/comments/${_id}`);
            return res.data.count;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    
    return (
       <div  className="border p-4 mb-4 rounded shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <img src={authorImage} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <p><strong>Tag:</strong> {tag}</p>
            <p><strong>Upvotes:</strong> {upVote} | <strong>Downvotes:</strong> {downVote}</p>
            <p><strong>Total Votes:</strong> {upVote - downVote}</p>
            <p><strong>Comments:</strong> {commentCount}</p>
          </div>
        
           <div className='flex justify-end'>
             <Link to={`/postDetails/${_id}`} className='btn btn-primary '>View More</Link>
           </div>
         
        </div>
    );
};

export default DisplayAllPost;