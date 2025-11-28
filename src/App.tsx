import { useState } from 'react'
import epsLogo from './assets/eps.png'
import KselComponent from './components/kselComponent/kselComponent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://t.me//EpsilionWarBot" target="_blank">
          <img src={epsLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
