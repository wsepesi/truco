import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './components/Home';
// import AppContent from './components/AppContent';
import Test from './components/Test';
import io from 'socket.io-client';
import GameHome from './components/GameHome';

function App() {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4000`, {
      // withCredentials: true,
      // extraHeaders: {
      //   'Access-Control-Allow-Origin': '*',
      // },
    });
    setSocket(newSocket);
    // return () => newSocket.close();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="test" element={<Test socket={socket}/>} />
      <Route path="gameHome" element={<GameHome socket={socket}/>} />
    </Routes>
  );
}

export default App;
