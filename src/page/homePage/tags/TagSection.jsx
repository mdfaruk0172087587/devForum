import React, { useState } from 'react';

const TagSection = () => {
    const [selectedTag, setSelectedTag] = useState('');

     const tags = ['Express', 'Node.js', 'MongoDB', 'JavaScript', 'React'];
    //  handle tag click
    conts
    return (
          <div className="max-w-4xl mx-auto mt-10 mb-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Explore by Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            // onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
    );
};

export default TagSection;