import React from 'react';

function FeaturesCard({ imageUrl, title, description ,onPress}) {
  return (
    <div onClick={()=>onPress()}className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div className="flex">
        <div className="flex-shrink-0">
          <img src={imageUrl} alt="Feature" className="h-20 w-20 object-cover object-center" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-xs text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesCard;
