import './App.css';

import { Route, Routes } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

import GameHome from './components/GameHome';
import Home from './components/Home';
// import AppContent from './components/AppContent';
import Test from './components/Test';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4000`, {
      // withCredentials: true,
      // extraHeaders: {
      //   'Access-Control-Allow-Origin': '*',
      // },
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  

  return (
    <Routes>
      <Route path="/" element={<Home socket={socket}/>} />
      <Route path="test" element={<Test socket={socket}/>} />
      <Route path="gameHome" element={<GameHome socket={socket}/>} />
    </Routes>
  );
}

export default App;
