import Link from 'next/link'
 
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}


import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Enquire from './app/enquire/page.tsx'
 
describe('Enquire Page Testing', () => {
  it('renders a heading', () => {
    render(<Enquire/>)
 
    //   const heading = screen.getByRole('heading', { level: 1 })
      const heading = screen.getByTestId('headerOptionHome')
      expect(heading).toBeInTheDocument()
      
  })
})