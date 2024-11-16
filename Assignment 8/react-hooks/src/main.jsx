import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Counter from './counter.jsx'
import ToggleButton from './ToggleButton.jsx'
import TextInput from './TextInput.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Counter />
    <ToggleButton />
    <TextInput />
  </StrictMode>,
)
