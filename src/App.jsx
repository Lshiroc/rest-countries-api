import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Detail from './pages/Detail/Detail.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:country" element={<Detail />} />
      </Routes>
    </>
  )
}
