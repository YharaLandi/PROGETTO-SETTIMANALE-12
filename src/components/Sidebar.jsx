import { useState } from 'react'
import { Col, Container, Form } from 'react-bootstrap'
import { BsFillBookFill, BsFillHouseDoorFill } from 'react-icons/bs'

const DEEZER_SEARCH_URL =
  'https://striveschool-api.herokuapp.com/api/deezer/search?q='
const RAPID_API_HEADERS = {
  'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
}

const Sidebar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()

    if (query.trim().length <= 2) {
      onSearchResults([])
      return
    }

    try {
      const response = await fetch(DEEZER_SEARCH_URL + query, {
        method: 'GET',
        headers: RAPID_API_HEADERS,
      })

      if (!response.ok) throw new Error('Ricerca fallita')

      const { data } = await response.json()
      onSearchResults(data)
    } catch (err) {
      console.error('Errore nella ricerca:', err)
    }
  }

  return (
    <Col xs={2}>
      <nav
        className="navbar navbar-expand-md fixed-left justify-content-between"
        id="sidebar"
      >
        <Container className="flex-column align-items-start">
          <a className="navbar-brand" href="#top">
            <img
              src="assets/logo/logo.png"
              alt="Logo"
              width="131"
              height="40"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <ul>
                <li>
                  <a className="nav-item nav-link d-flex align-items-center" href="#top">
                    <BsFillHouseDoorFill />
                    &nbsp; Home
                  </a>
                </li>
                <li>
                  <a className="nav-item nav-link d-flex align-items-center" href="#top">
                    <BsFillBookFill />
                    &nbsp; Your Library
                  </a>
                </li>
                <li>
                  <Form className="input-group mt-3" onSubmit={handleSearch}>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="searchField"
                      placeholder="Search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary btn-sm h-100" type="submit">
                        GO
                      </button>
                    </div>
                  </Form>
                </li>
              </ul>
            </div>
          </div>
        </Container>
        <div className="nav-btn">
          <button className="btn signup-btn" type="button">
            Sign Up
          </button>
          <button className="btn login-btn" type="button">
            Login
          </button>
          <div>
            <a href="#top">Cookie Policy</a> |<a href="#top"> Privacy</a>
          </div>
        </div>
      </nav>
    </Col>
  )
}

export default Sidebar
