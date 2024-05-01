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
      <div className='relative mt-3' style={{ width: '100%', paddingBottom: '100%' }}>
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
    </>
  )
}

export default ThreeDimensionVideo