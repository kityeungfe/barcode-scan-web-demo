import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Quagga from 'quagga'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const decode = (src) => {
    let config = {
      nputStream: {
        size: 800,
        singleChannel: false
      },
      locator: {
          patchSize: "medium",
          halfSample: true
      },
      decoder: {
        readers: [
          {
            format: "ean_reader",
            config: {}
          },
          {
            format: "code_128_reader",
            config: {}
          },
          {
            format: "i2of5_reader",
            config: {}
          }
        ] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: src // or 'data:image/jpg;base64,' + data
    }

    Quagga.onProcessed((result) => {
      console.log("onProcessed...")
      let drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay,
          area;
    });

    Quagga.decodeSingle(config, (result) => {
      if(result.codeResult) {
        alert("result:" + result.codeResult.code)
        console.log("result:", result.codeResult.code)
      } else {
        alert("not detected")
        console.log("not detected")
      }
    });
  }

  return (
    <>
      <div>
        <input 
          type="file" 
          accept="image/*"
          capture="camera"
          onChange={(e) => {
            if (e.target.files && e.target.files.length) {
              decode(URL.createObjectURL(e.target.files[0]));
          }
          }}
        />
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
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
