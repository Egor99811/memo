import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FirstApp } from './first/first'
import { SecondApp } from './second/second'
import { ThirdApp } from './second/third'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <FirstApp /> */}
      {/* <SecondApp /> */}
      {/* <ThirdApp /> */}
    </>
  )
}

export default App
