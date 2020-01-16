import React, { useState, useEffect } from 'react'
import './styles.css'

function DevForm({ onSubmit }) {
    const [latitude, setLatidude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [github_username, setGitUsername] = useState('')
    const [techs, setTechs] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })
        setGitUsername('')
        setTechs('')
    }

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
                enableHighAccuracy: true
            }
        )
    }, [])

    return (
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
    )
}

export default DevForm