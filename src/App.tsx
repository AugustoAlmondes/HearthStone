import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import List from "./pages/List"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
