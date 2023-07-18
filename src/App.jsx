import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home/Home.jsx';
import Detail from './pages/Detail/Detail.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import style from './app.module.scss';

export default function App() {
  const theme = useSelector(state => state.statesReducer.theme) || localStorage.getItem("theme") || "light";

  return (
    <div className={`${style.general} ${theme == "dark" && style.dark }`}>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:country" element={<Detail />} />
      </Routes>
    </div>
  )
}
