import { BrowserRouter as Router, Route, Routes } from 'react';
import TesteTemp from './components/TesteTemp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <TesteTemp /> } exact />
      </Routes>
    </Router> 
  )
}

export default App;