import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppContent from './components/AppContent';
import Test from './components/Test';
import io from 'socket.io-client';

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
      <Route path="/" element={<AppContent />} />
      <Route path="test" element={<Test socket={socket}/>} />
    </Routes>
  );
}

export default App;
