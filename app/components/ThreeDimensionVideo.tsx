'use client';

import Image from "next/image";
import Modal from "./Modal";

type props = {
  openModal?: boolean;
  onClose: () => void;
}

const ThreeDimensionVideo = ({ openModal = false, onClose }: props) => {
  return (
    <>
      <Modal isOpen={openModal} onClose={onClose} videoUrl="" />
      <div className='relative' style={{ width: '100%', paddingBottom: '100%', clipPath: 'polygon(0 0,calc(100% - 20px) 0, 100% 20px,100% 100%, 0 100%)' }}>
        <Image
          priority
          src={'/images/cockpit.png'}
          objectFit="cover"
          objectPosition="center"
          fill
          alt="hero image example"
        />
        <Image
          priority
          src={'/images/3d-icon.png'}
          width={150}
          onClick={onClose}
          height={150}
          alt="hero image example"
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:opacity-80 cursor-pointer'
        />
      </div>
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
        <p className='ml-2 text-brand-light-blue text-sm'>3D view</p>
      </div>
    </>
  )
}

export default ThreeDimensionVideo