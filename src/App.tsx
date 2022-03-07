import { Route, Routes } from 'react-router';
import Search from './pages/Search/';

const App = () => {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default App;
