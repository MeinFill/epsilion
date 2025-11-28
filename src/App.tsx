import epsLogo from './assets/eps.png'
import KselComponent from './components/kselComponent/kselComponent'
import './App.css'

function App() {
  return (
    <>
      <div className='logo-cont'>
        <a href="https://t.me//EpsilionWarBot" target="_blank">
          <img src={epsLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <KselComponent />
    </>
  )
}

export default App
