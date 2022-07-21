import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasicModal } from './components/Modal';
import { AddWord } from './components/AddWord';
import Words from './components/word/Words';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Words />} />
        <Route path='/:id' element={<BasicModal />} />
        <Route path='/name' element={<AddWord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
