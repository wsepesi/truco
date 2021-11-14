import './App.css';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import AppContent from './components/AppContent';
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </BrowserRouter>
    
  );
}

export default App;
