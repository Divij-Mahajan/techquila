import { useState } from 'react'
import './App.css'
import Table from './components/Table'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Header />
      <Table />
    </div>
  )
}

export default App
