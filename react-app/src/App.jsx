import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="react-app">
      <h2>React 子应用</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          这是一个 React 子应用示例
        </p>
      </div>
    </div>
  )
}

export default App
