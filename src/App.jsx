import { useState } from 'react'
import AlbumGrid from './components/AlbumGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AlbumGrid />
    </>
  )
}

export default App