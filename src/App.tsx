import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Account from './Account'
import Dashboard from './Dashboard'
import Navbar from "./Home/Navbar"
import CustomCursor from './Home/CustomCursor'
import FloatingParticles from './Home/FloatingParticles'


function App() {

  return (
    <span className="w-screen h-screen" data-theme="luxury">
      <HashRouter >
      <FloatingParticles/>
      <CustomCursor/>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </span>

  )
}

export default App
