import Image from "next/image";

const ThreeDimensionVideo = () => {
  return (
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
        height={150}
        alt="hero image example"
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  )
}

export default ThreeDimensionVideo