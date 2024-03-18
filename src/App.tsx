import { Route, Routes } from 'react-router-dom';
import SingleBoxView from './SingleBoxView';
import MultiBoxView from './MultiBoxView';

export default function App() {
  return (
    <div
      style={{
        backgroundColor: '#191933',
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      <Routes>
        <Route path='/' element={<MultiBoxView />} />
        <Route path='/multi-box' element={<MultiBoxView />} />
        <Route path='/single-box/:id' element={<SingleBoxView />} />
      </Routes>
    </div>
  );
}
