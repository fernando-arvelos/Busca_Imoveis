import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertiesPage from './components/PropertiesPage.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FavoritesPage from './components/FavoritesPage.jsx';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/properties/:id" element={ <PropertyDetails /> } />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/" element={ <PropertiesPage /> } />
        </Routes>
        <Footer />
      </div>
    </Router> 
  )
}

export default App;