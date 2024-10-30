import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertiesPage from './components/PropertiesPage.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/properties/:id" element={ <PropertyDetails /> } />
        <Route path="/properties/search?distrito=lisboa" element={ <PropertiesPage /> } />
        <Route path="/" element={ <PropertiesPage /> } />
        </Routes>
        <Footer />
      </div>
    </Router> 
  )
}

export default App;