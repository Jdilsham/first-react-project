import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import TestPage from './pages/testPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='w-full h-[100vh]'>

          <Routes path="/">
              <Route path="/*" element={<HomePage/>}/>
              <Route path="/admin/*" element={<AdminPage/>}/>
              <Route path="/test" element={<TestPage/>}/>
          </Routes>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
