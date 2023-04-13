import "./App.css"
import Home from "./Pages/Home/Home"
import Bulk from "./Pages/Bulk/Bulk"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/bulk" element={<Bulk />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
