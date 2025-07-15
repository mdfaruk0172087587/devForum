import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosUnSecure from '../../../hooks/axiosUnSecure';
import Loading from '../../../components/Loading';

const TagSection = ({setSearchTag, setCurrentPage}) => {
  const axiosUse = axiosUnSecure();
  const {data:tagData = [], isLoading} = useQuery({
    queryKey: ['tags'],
    queryFn: async() => {
      const res = await axiosUse.get('/tags');
      return res.data.tags;
    }
  })

  if(isLoading){
    return <Loading></Loading>
  }
  
  return (
    <div className='flex gap-2 justify-center mb-6'>
      {
        tagData.map(data => <button onClick={() => {setSearchTag(data.tag); setCurrentPage(1)}}  className="btn text-black bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] border-none" key={data._id}>{data.tag}</button>)
      }
    </div>
  );
};

export default TagSection;