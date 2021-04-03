import React, { useState, useEffect } from 'react'
import styles from './Character.module.sass'
import CharacterModal from './CharacterModal/CharacterModal'

const Character = ({character}) => {

    const [isModalOpen, setModalOpen] = useState(false)

    useEffect(() => {console.log(isModalOpen)}, [isModalOpen])
    return (
        <div className={styles.container} onClick={() => setModalOpen(!isModalOpen)}>
            {isModalOpen && <CharacterModal character={character} />}
            <h2>{character.name}</h2>
            <p>{character.birth_year}</p>
        </div>
    )
}

export default Character
