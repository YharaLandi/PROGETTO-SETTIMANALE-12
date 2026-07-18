import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TrackCard from './components/TrackCard'
import Player from './components/Player'
import SearchResults from './components/SearchResults'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

const DEEZER_SEARCH_URL =
  'https://striveschool-api.herokuapp.com/api/deezer/search?q='
const RAPID_API_HEADERS = {
  'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
}

// Sezioni della home: nome della cartella id, artista cercato, titolo mostrato
const HOME_SECTIONS = [
  { id: 'rock', artist: 'queen', title: 'Rock Classics' },
  { id: 'pop', artist: 'katyperry', title: 'Pop Culture' },
  { id: 'hiphop', artist: 'eminem', title: '#HipHop' },
]

function App() {
  const [sections, setSections] = useState({})
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    HOME_SECTIONS.forEach(({ id, artist }) => fetchTracksFor(id, artist))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTracksFor = async (sectionId, artist) => {
    try {
      const response = await fetch(DEEZER_SEARCH_URL + artist, {
        method: 'GET',
        headers: RAPID_API_HEADERS,
      })

      if (!response.ok) throw new Error('Errore nel recupero dei brani')

      const { data } = await response.json()
      setSections((prev) => ({ ...prev, [sectionId]: data.slice(0, 4) }))
    } catch (err) {
      console.error('Errore', err)
    }
  }

  return (
    <Container fluid id="top">
      <Row>
        <Sidebar onSearchResults={setSearchResults} />
        <Col xs={12} md={9} className="offset-md-3 mainPage">
          <Header />
          <SearchResults results={searchResults} />
          {HOME_SECTIONS.map(({ id, title }) => (
            <Row key={id}>
              <Col xs={10}>
                <div id={id}>
                  <h2>{title}</h2>
                  <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                    {(sections[id] || []).map((track) => (
                      <TrackCard track={track} key={track.id} />
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Player />
    </Container>
  )
}

export default App
