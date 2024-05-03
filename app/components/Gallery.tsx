'use client'

import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgVideo from 'lightgallery/plugins/video';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import Image from 'next/image';
import { useRef } from 'react';

type props = {
  className: string
  children: any
  galleryType: 'video' | 'gallery'
}

const Gallery = ({ className, galleryType, children }: props) => {

  const onInit = () => {
    console.log('lightGallery has been initialized');
  };

  const lgRef = useRef(null); // Create a ref for LightGallery

  // Function to open the lightbox
  const handleIconClick = () => {
    if (lgRef.current) {
      lgRef.current.openGallery();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {galleryType == 'video' && <Image
        priority
        src={'/images/3d-icon.png'}
        width={150}
        height={150}
        alt="hero image example"
        onClick={handleIconClick} // Set onClick handler
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-none z-[1]'
      />}
      <LightGallery
        onInit={onInit}
        plugins={[lgZoom, lgVideo]}
        mode="lg-fade"
        thumbnail={true}
        autoplayFirstVideo={galleryType === 'video' ? true : false}
        youTubePlayerParams={{
          autoplay: 1,
          mute: 1
        }}
        ref={lgRef} // Attach the ref here
        elementClassNames={galleryType}
        mobileSettings={{
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false,
        }}
      >
        {children}
      </LightGallery>
      <div className='flex mt-4 cursor-pointer items-center'>
        <div>
          <Image
            src="/images/maximize.png"
            alt="arrow"
            width={11}
            height={11}
            className=""
          />
        </div>
        <p className='ml-2 text-brand-light-blue text-sm'>{galleryType === 'gallery' ? 'Enlarge and view' : '3D view'}</p>
      </div>
    </div>
  )
}

export default Gallery