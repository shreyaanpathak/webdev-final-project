import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Account from './Account'
import Dashboard from './Dashboard'

import DefaultNavigation from './DefaultNavigation'


function App() {

  return (
    <span className="w-screen h-screen" data-theme="dark">
      <HashRouter >
        <Routes>
          <Route path="/" element={<DefaultNavigation />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </span>

  )
}

export default App
