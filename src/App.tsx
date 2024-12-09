import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Account from './Account'
import Dashboard from './Dashboard'
import Navbar from "./Home/Navbar"
import CustomCursor from './Home/CustomCursor'
import FloatingParticles from './Home/FloatingParticles'
import Stocks from "./Stocks/index"
import Session from './Account/Session'
import ProtectedRoute from './Account/ProtectedRoute'

function App() {
  return (
    <div className="w-screen h-screen" data-theme="luxury">
      <Session>
        <HashRouter>
          <FloatingParticles/>
          <CustomCursor/>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Stocks" element={<Stocks />} /> 
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </HashRouter>
      </Session>
    </div>
  )
}

export default App
