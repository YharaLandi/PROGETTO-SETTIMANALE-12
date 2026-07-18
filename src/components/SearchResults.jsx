import { Row, Col } from 'react-bootstrap'
import TrackCard from './TrackCard'

const SearchResults = ({ results }) => {
  if (!results.length) return null

  return (
    <Row>
      <Col xs={10}>
        <div id="searchResults">
          <h2>Search Results</h2>
          <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
            {results.map((track) => (
              <TrackCard track={track} key={track.id} />
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  )
}

export default SearchResults
