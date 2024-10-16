import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertiesPage from './components/PropertiesPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <PropertiesPage /> } />
      </Routes>
    </Router> 
  )
}

export default App;