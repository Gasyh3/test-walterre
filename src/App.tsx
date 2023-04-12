import { useState } from 'react'
import { EnergyAndExpensesForm } from './EnergyAndExpensesForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <EnergyAndExpensesForm />
    </div>
  )
}

export default App
