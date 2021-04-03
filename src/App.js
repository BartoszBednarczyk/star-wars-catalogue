import { useState, useEffect } from 'react'
import styles from './App.module.sass'
import InfiniteScroll from 'react-infinite-scroll-component'
import Character from './components/Character/Character'
import Loader from "react-loader-spinner"
import MultiSelect from "react-multi-select-component";
import { v4 as uuidv4 } from 'uuid'
function App() {
  const [data, setData] = useState([])
  const [nextURL, setNextURL] = useState("https://swapi.dev/api/people/")
  const [searchValue, setSearchBar] = useState("")

  const movies = [
    {label: "A New Hope", value: 1},
    {label: "The Empire Strikes Back", value: 2},
    {label: "Return of the Jedi", value: 3},
    {label: "The Phantom Menace", value: 4},
    {label: "Attack of the Clones", value: 5},
    {label: "Revenge of the Sith", value: 6}
  ]
  const [movieSelect, setMovieSelect] = useState([])

  
  const filterPeople = (person) => {
    let pass = true
    let personMovies = person.films
    personMovies = personMovies.map(movie => movie.slice(27,28))
    movieSelect.map(movie => !personMovies.includes(movie.value.toString()) ? (pass = false) : null)
    return pass
  }

  const fetchPeople = () => {
      setNextURL("")
      fetch(nextURL).then(res => res.json()).then(res => {
        res.next != null ? setNextURL(res.next.replace('http', 'https')) : setNextURL(res.next)
        res.results.map(result => {filterPeople(result) && setData(current => [...current, result])})
    })
  }

  const findPeople = (search) => {
    setNextURL("")
    fetch(`https://swapi.dev/api/people/?search=${search}`).then(res => res.json()).then(res => {
      res.next != null ? setNextURL(res.next.replace('http', 'https')) : setNextURL(res.next)
      res.results.map(result => {filterPeople(result) && setData(current => [...current, result])})
    })
  }

  const fetchDefault = () => {
    fetch('https://swapi.dev/api/people/').then(res => res.json()).then(res => {
      res.next != null ? setNextURL(res.next.replace('http', 'https')) : setNextURL(res.next)
      res.results.map(result => {filterPeople(result) && setData(current => [...current, result])})
  })
  }


  useEffect(() => {
    setData([])
    if(searchValue === ""){
      setNextURL('https://swapi.dev/api/people/')
      fetchDefault()
      
    } else {
     findPeople(searchValue)
    }
    
  }, [searchValue, movieSelect])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>STARWARS</h1>
      <input className={styles.searchBar} placeholder="Name" type="text" value={searchValue} onChange={(e) => {setSearchBar(e.target.value)}}/>
      <MultiSelect className={styles.selectBar}
        options={movies}
        value={movieSelect}
        onChange={setMovieSelect}
        labelledBy="Select"
        hasSelectAll={false}
        disableSearch={true}
        overrideStrings={
          {
            "allItemsAreSelected": "All movies are selected.",
            "selectSomeItems": "Select movies"
        }
      }
      />
      <div className={styles.list} id="listt">
      
      {data.length ? data.map(e => <Character key={uuidv4()} character={e}/>) : <Loader className={styles.loader} type="Grid" color="#ffe81f" height={80} width={80} />}
      
      </div>
      <div className={styles.elementsLoader}>
      { nextURL && <InfiniteScroll 
        dataLength={data.length}
        next={fetchPeople}
        hasMore={true}
        scrollableTarget="listt"
        loader={data.length >=10 && <Loader  type="TailSpin" color="#ffe81f" height={20} width={20} />}>
          
      </InfiniteScroll> }
      
      </div>
    </div>
  );
}

export default App;
