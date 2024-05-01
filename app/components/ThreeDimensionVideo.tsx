'use client';

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

const ThreeDimensionVideo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className='relative w-full h-[450px] mt-3'>
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
          onClick={() => setIsModalOpen(true)}
          height={150}
          alt="hero image example"
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:opacity-80 cursor-pointer'
        />
      </div>
    </>
  )
}

export default ThreeDimensionVideo