import React, { useState, useEffect } from 'react'
import styles from './CharacterModal.module.sass'
import Loader from "react-loader-spinner"

const CharacterModal = ({character}) => {
    const [homeWorld, setHomeWorld] = useState(<Loader  type="TailSpin" color="#ffe81f" height={20} width={20} />)
    const [movies, setMovies] = useState([])

    

    useEffect(() => {
        fetch(character.homeworld).then(res => res.json()).then(res => setHomeWorld(res.name))
        character.films.map(movie => fetch(movie).then(res => res.json()).then(res => setMovies(current => [...current, res.title])))
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer} onClick={(e) => e.stopPropagation()}>
                <h2>{character.name}</h2>
                <hr className={styles.separator} />

                {character.height != "unknown" && <div className={styles.card}>
                    <h3>{character.height}</h3>
                    <p>Height</p>
                </div>}

                {character.mass != "unknown" && <div className={styles.card}>
                    <h3>{character.mass}</h3>
                    <p>Weight</p>
                </div>}

                {character.hair_color != "unknown" && <div className={styles.card}>
                    <h3>{character.hair_color}</h3>
                    <p>Hair color</p>
                </div>}

                {character.skin_color != "unknown" && <div className={styles.card}>
                    <h3>{character.skin_color}</h3>
                    <p>Skin color</p>
                </div>}

                {character.eye_color != "unknown" && <div className={styles.card}>
                    <h3>{character.eye_color}</h3>
                    <p>Eye color</p>
                </div>}

                {character.birth_year != "unknown" && <div className={styles.card}>
                    <h3>{character.birth_year}</h3>
                    <p>Birth year</p>
                </div>}

                {character.gender != "unknown" && <div className={styles.card}>
                    <h3>{character.gender}</h3>
                    <p>Gender</p>
                </div>}

                {character.homeworld && <div className={styles.card}>
                    <h3>{homeWorld}</h3>
                    <p>Home world</p>
                </div>}

                {character.films && <div className={styles.card}>
                    {!movies.length ? <Loader  type="TailSpin" color="#ffe81f" height={20} width={20} /> : movies.map(movie => <h3>{movie}</h3>)}
                    <p>Movies</p>
                </div>}

                
            </div>
        </div>
    )
}

export default CharacterModal
