import { Navigate, Route, Routes } from "react-router-dom"
import Signin from "./Signin"
import Signup from "./Signup"
import Profile from "./Profile"
import ProtectedRoute from "./ProtectedRoute"
import BrowseUsers from "./BrowseUsers"

export default function Account() {
  return (
      <div>
          <Routes>
              <Route path="/" element={<Navigate to="/Account/Signin"/>}/>
              <Route path="Signin" element={<Signin />} />
              <Route path="Signup" element={<Signup/>} />
              <Route path="Browse" element={
                  <ProtectedRoute>
                      <BrowseUsers/>
                  </ProtectedRoute>
              } />
              <Route path="Profile" element={
                  <ProtectedRoute>
                      <Profile/>
                  </ProtectedRoute>
              } />
              <Route path="/Profile/:userId" element={
                  <ProtectedRoute>
                      <Profile/>
                  </ProtectedRoute>
              } />
          </Routes>
      </div>
  )
}
