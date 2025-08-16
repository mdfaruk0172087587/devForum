import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosUnSecure from '../../../hooks/axiosUnSecure';
import Loading from '../../../components/Loading';

const TagSection = ({ setSearchTag, setCurrentPage, setActiveTag, activeTag }) => {
  const axiosUse = axiosUnSecure();
   
  const { data: tagData = [], isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axiosUse.get('/tags');
      return res.data.tags;
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  const handleClick = (tag) => {
    setSearchTag(tag);         
    setCurrentPage(1);         
    setActiveTag(tag);         
  };
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {/* All Button */}
      <button
        onClick={() => handleClick('')}
        className={`btn border-none shadow-md hover:scale-105 transition-transform duration-200 ${activeTag === '' ? 'bg-blue-600 text-white ' : 'bg-[rgba(0,0,0,0.05)] text-black hover:bg-[rgba(0,0,0,0.1)] '
          }`}
      >
        All
      </button>
      {/* Tag Buttons */}
      {tagData.map((data) => (
        <button
          key={data._id}
          onClick={() => handleClick(data.tag)}
          className={`btn border-none shadow-md hover:scale-105 transition-transform duration-200 ${activeTag === data.tag
              ? 'bg-blue-600 text-white'
              : 'bg-[rgba(0,0,0,0.05)] text-black hover:bg-[rgba(0,0,0,0.1)]'
            }`}
        >
          {data.tag}
        </button>
      ))}
    </div>
  );
};

export default TagSection;
