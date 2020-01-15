import React, { useState, useEffect } from 'react';
import "./styles/global.css"
import "./styles/sidebar.css"
import "./styles/main.css"
import axios from 'axios'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] = useState([])

  async function handleAddDev(data) {
    const response = await axios.post('http://localhost:3333/devs', data)
    setDevs([...devs, response.data])
  }

  useEffect(() => {
    async function loadDevs() {
      const response = await axios.get('http://localhost:3333/devs')
      setDevs(response.data)
    }
    loadDevs()
  }, [])

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
