import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='w-full h-[100vh] bg-sky-500'>

          <Routes path="/">
              <Route path="/" element={<h1>Home Page</h1>}/>
              <Route path="/admin" element={<h1>Admin Page</h1>}/>
          </Routes>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
