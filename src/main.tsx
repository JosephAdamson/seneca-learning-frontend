import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <h1 className="text-blue-500 text-5xl">Hello, World!</h1>
    </div>
  </StrictMode>,
)
