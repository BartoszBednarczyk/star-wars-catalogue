import React, { useState, useEffect } from 'react'
import styles from './Character.module.sass'
import CharacterModal from './CharacterModal/CharacterModal'
import { v4 as uuidv4 } from 'uuid'

const Character = ({character}) => {

    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <div className={styles.container} onClick={() => setModalOpen(!isModalOpen)}>
            {isModalOpen && <CharacterModal key={uuidv4()} character={character} closeModal={() => setModalOpen()} isModalOpen={isModalOpen} />}
            <h2>{character.name}</h2>
            <p>{character.birth_year}</p>
        </div>
    )
}

export default Character
