import './App.css';

import { Route, Routes } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

import GameHome from './components/GameHome';
import Home from './components/Home';
import Rules from './components/Rules';
// import AppContent from './components/AppContent';
import { SocketContext } from './hooks/socket-context';

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
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="room/:id" element={<GameHome socket={socket}/>} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
