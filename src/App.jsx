import './App.css'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
      <div className="h-[700px] w-[700px] border-[5px] flex relative justify-center items-center">
        <div className="h-[600px] w-[600px] bg-yellow-300 flex flex-col justify-center items-center"> 

          <div className='h-[100px] w-[100px] bg-red-500'>

          </div>

          <div className='h-[100px] w-[100px] bg-blue-500 m-[20px]'>

          </div>

          <div className='h-[100px] w-[100px] bg-pink-500 fixed right-[10px] bottom-[10px] pt-[20px] pl-[30px] '>
            fixed
          </div>

          <div className='h-[100px] w-[100px] bg-green-500 absolute bottom-[10px] right-[10px]'>
            absolute
          </div>

          <div className='h-[100px] w-[100px] bg-gray-500'>

          </div>

        </div>
        
      </div>
    </>
  )
}

export default App
