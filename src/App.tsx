import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Home from './components/Home'
import NavBar from './components/NavBar'
import {Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <div className='flex items-center justify-center min-h-screen'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
      </div>
    </>
  )
}

export default App
