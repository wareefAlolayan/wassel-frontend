import '../App.css'
import Login from './Auth/login'

function Home({setUser}) {
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
        <Login setUser={setUser}/>
      </div>
    </div>
  )
}

export default Home