'use client'

import ScrollToTop from 'react-scroll-up';

const ScrollTop = () => {
  return (
    <ScrollToTop showUnder={160} duration={1000}>
      <span className='text-white font-bold font-openSans'>Scroll to top</span>
    </ScrollToTop>
  )
}

export default ScrollTop