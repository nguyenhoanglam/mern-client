import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './layouts/auth/ProtectedRoute';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

import AuthProvider from './services/contexts/AuthContext';
import PostProvider from './services/contexts/PostContext';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path='/login' element={<Auth authRoute='login' />} />
            <Route path='/register' element={<Auth authRoute='register' />} />
            <Route element={<ProtectedRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='about' element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
