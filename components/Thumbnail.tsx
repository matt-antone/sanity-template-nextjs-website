import * as React from 'react';
import Image from 'next/image';

interface IThumbnailProps {
  image:any
}

const Thumbnail: React.FunctionComponent<IThumbnailProps> = ({image}) => {
  
  return (
    <div className='relative'>
      <Image src={image.asset.url} alt={image.alt} width={200} height={200} className="w-full object-fill"/>
    </div>
  );
};

export default Thumbnail;
