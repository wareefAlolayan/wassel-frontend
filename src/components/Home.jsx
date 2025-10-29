import React from 'react'
import '../App.css'

function Home() {
  return (
    <div className='main-page'>
      <div className='left-side'>
        <div className='left-side-content'>
          <img src='/src/components/assets/wassel_logo.png' alt='wassel logo' className='logo' />
          <div className='text-content'>
            <h1 className='website-name'>Wassel</h1>
            <p className='tagline'>Connecting teams. Simplifying work</p>
          </div>
        </div>
      </div>
      <div className='right-side'>
        login component will go here
      </div>
    </div>
  )
}

export default Home