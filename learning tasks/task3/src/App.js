// importing css
import './Components/App.css';

import Login from './Components/Login.js';
import { FormComponent } from './Components/Signup.js';


// import states and pop ups
import { useState, createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Components/Main.js';
import AuthProvider from './Components/Auth.js'


//made to export bg theme to all pages
export const BgContext = createContext();



function App() {

  // same reason as above
  const [bg, setBg] = useState({
    backgroundColor: '#ADEFD1FF',
    boxShadow: "0 4px 8px 0 rgba(0, 31, 63, 0.244), 0 6px 20px 0 rgba(0, 31, 63, 0.581)",
    color: '#00203FFF'
  })
  const [obg, setobg] = useState({
    backgroundColor: 'rgba(173, 239, 209, 0.629)'
  })
  return (
    <AuthProvider>
      <BgContext.Provider value={{ bg, setBg, obg, setobg }} >
        <Router>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<FormComponent />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/mainpage/*" element={<Main />} />
          </Routes>
        </Router>
      </BgContext.Provider>
    </AuthProvider >
  );
}

export default App;