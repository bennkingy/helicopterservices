'use client';

import Image from "next/image";
import Gallery from "./Gallery";

type props = {
  openModal?: boolean;
  onClose: () => void;
}

const ThreeDimensionVideo = ({ openModal = false, onClose }: props) => {
  return (
    <>
      <div className='' style={{ width: '100%', clipPath: 'polygon(0 0,calc(100% - 20px) 0, 100% 20px,100% 100%, 0 100%)' }}>
        <Gallery className='sm:mb-10' galleryType="video">
          <a
            data-lg-size="1000-700"
            data-pinterest-text="Pin it2"
            data-tweet-text="lightGallery slide  2"
            className="gallery__item"
            data-src="https://www.youtube.com/embed/JOpWTNEAsX8?si=EbI2oaTH5s4boI_Y"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@therawhunter' >Massimiliano Morosinotto </a></h4><p> Location - <a href='https://unsplash.com/s/photos/tre-cime-di-lavaredo%2C-italia'>Tre Cime di Lavaredo, Italia</a>This is the Way</p>"
          >
            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
              <Image
                priority
                src={'/images/cockpit2.png'}
                layout='fill'
                objectFit='cover'
                alt="hero image example"
                className="cursor-pointer"
              />
            </div>
          </a>
        </Gallery>
      </div>
    </>
  )
}

export default ThreeDimensionVideo