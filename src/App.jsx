import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  )
}
