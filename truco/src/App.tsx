import './App.css';

import { Route, Routes } from 'react-router-dom';

import AppContent from './components/AppContent';
import Test from './components/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="test" element={<Test />} />
    </Routes>
  );
}

export default App;
