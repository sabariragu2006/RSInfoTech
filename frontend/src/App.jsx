import { Routes, Route } from 'react-router-dom'
import RSInfotechNavbar from './components/RSInfotechNavbar'
import HomePage from './components/HomePage'
import ServicesPage from './components/ServicePage'
import ContactPage from './components/ContactPage'

function App() {
  return (
    <>
      <RSInfotechNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App