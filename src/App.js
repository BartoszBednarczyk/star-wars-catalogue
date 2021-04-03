import { useState, useEffect } from 'react'
import styles from './App.module.sass'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetchData from './api/index'
import Character from './components/Character/Character'
import Loader from "react-loader-spinner"
import MultiSelect from "react-multi-select-component";
function App() {
  const [data, setData] = useState([])
  const [nextt, setNext] = useState("https://swapi.dev/api/people/")
  const [searchValue, setSearchBar] = useState("")

  const movies = [
    {label: "Star Wars 1", value: 1},
    {label: "Star Wars 2", value: 2},
    {label: "Star Wars 3", value: 3},
    {label: "Star Wars 4", value: 4},
    {label: "Star Wars 5", value: 5},
    {label: "Star Wars 6", value: 6}
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
    console.log("test")
      setNext("")
      fetch(nextt).then(res => res.json()).then(res => {
        res.next != null ? setNext(res.next.replace('http', 'https')) : setNext(res.next)
        res.results.map(result => {filterPeople(result) && setData(current => [...current, result])})
    })
  }

  const findPeople = (search) => {
    setNext("")
    console.log("test")
    fetch(`https://swapi.dev/api/people/?search=${search}`).then(res => res.json()).then(res => {
      res.next != null ? setNext(res.next.replace('http', 'https')) : setNext(res.next)
      res.results.map(result => {filterPeople(result) && setData(current => [...current, result])})
    })
  }

  const fetchDefault = () => {
    fetch('https://swapi.dev/api/people/').then(res => res.json()).then(res => {
      res.next != null ? setNext(res.next.replace('http', 'https')) : setNext(res.next)
      res.results.map(result => {filterPeople(result) && setData(current => [...current, result])})
  })
  }


  useEffect(() => {
    setData([])
    console.log("mS: ",movieSelect)
    if(searchValue == ""){
      setNext('https://swapi.dev/api/people/')
      fetchDefault()
      
    } else {
     findPeople(searchValue)
     console.log(data)
    }
    
  }, [searchValue, movieSelect])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>STARWARS</h1>
      <input className={styles.searchBar} placeholder="Name" type="text" value={searchValue} onChange={(e) => {setSearchBar(e.target.value)}}/>
      <MultiSelect className={styles.searchBar}
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
      
      {data.length ? data.map(e => <Character character={e}/>) : <Loader className={styles.loader} type="Grid" color="#ffe81f" height={80} width={80} />}
      
      </div>
      <div className={styles.elementsLoader}>
      { nextt && <InfiniteScroll 
        dataLength={data.length}
        next={fetchPeople}
        hasMore={true}
        scrollableTarget="listt"
        loader={<Loader  type="TailSpin" color="#ffe81f" height={20} width={20} />}>
          
      </InfiniteScroll> }
      
      </div>
    </div>
  );
}

export default App;
