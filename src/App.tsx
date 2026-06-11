import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminGate from './components/AdminGate'
import Home from './pages/Home'
import About from './pages/About'
import Partners from './pages/Partners'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/hidden/admin"
            element={
              <AdminGate>
                <Admin />
              </AdminGate>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
