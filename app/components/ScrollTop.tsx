'use client'

import ScrollToTop from 'react-scroll-up';

const ScrollTop = () => {
  return (
    <ScrollToTop showUnder={160} duration={1000}>
      <p className='text-white font-bold font-openSans text-xs sm:text-sm'>Scroll to top</p>
    </ScrollToTop>
  )
}

export default ScrollTop