import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

//   const sendData = () => {
//     const options = {
//         method: "POST",
//         body: JSON.stringify({
//             email: "aaa@aaa.lv",
//             name: "Toms",
//             password: "b96ade1b0673409a3526399601dca70d997bf2b8adab532693c3ecb0b4495d311188e9fdac892ec548c5e686bcf9698ae5af97ea47df93f9f0ba3a093077e1d6",
//         })
//     }
//     fetch('http://localhost:3000/api/users', options)
//   }

  const test = async () => {
    const response = await 
    fetch("http://localhost:3000/healthcheck");
    const movies = await response.json();
    console.log(123123, movies);
  }


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => test()}>
          Send data
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
