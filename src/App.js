import React, { useState, useEffect } from 'react';
import "./styles/global.css"
import "./styles/sidebar.css"
import "./styles/main.css"
import axios from 'axios'

function App() {
  const [latitude, setLatidude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [github_username, setGitUsername] = useState('')
  const [techs, setTechs] = useState('')
  const [devs, setDevs] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLatidude(latitude)
        setLongitude(longitude)
      },
      (err) => { },
      {
        timeout: 30000,
      }
    )
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await axios.post('http://localhost:3333/devs', {
      github_username,
      techs,
      latitude,
      longitude
    })

    setGitUsername('')
    setTechs('')
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

        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input className="github_username" id="github_username" value={github_username} onChange={e => setGitUsername(e.target.value)} required></input>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input className="techs" id="techs" value={techs} onChange={e => setTechs(e.target.value)} required></input>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input className="latitude" type="number" id="latitude" value={latitude} onChange={e => setLatidude(e.target.value)} required></input>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input className="longitude" type="number" id="longitude" value={longitude} onChange={e => setLongitude(e.target.value)} required></input>
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <li className="dev-item" key={dev._id}>
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="dev-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil do GitHub</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
