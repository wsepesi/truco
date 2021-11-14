import './App.css';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import AppContent from './components/AppContent';
import React from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
