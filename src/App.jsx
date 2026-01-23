import './App.css'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
      <h1 className='text-blue-500 text-[50px] font-bold italic underline border-4 border-red-500'>Janitha</h1>

      <ProductCard name="iPad" price="$18.99" image="://www.goodhousekeeping.com/uk/product-reviews/tech/a61095166/apple-ipad-10th-generation-review/" />

      <ProductCard name="iPhone" price="$17.99" image="https://www.apple.com/iphone-15-pro/" />
    </>
  )
}

export default App
