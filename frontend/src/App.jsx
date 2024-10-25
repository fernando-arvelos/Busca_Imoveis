import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertiesPage from './components/PropertiesPage.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/properties/:id" element={ <PropertyDetails /> } />
        <Route path="/" element={ <PropertiesPage /> } />
      </Routes>
    </Router> 
  )
}

export default App;