import { Col, Row } from 'react-bootstrap'

const NAV_LINKS = ['TRENDING', 'PODCAST', 'MOODS AND GENRES', 'NEW RELEASES', 'DISCOVER']

const Header = () => (
  <Row>
    <Col xs={9} lg={11} className="mainLinks d-none d-md-flex">
      {NAV_LINKS.map((label) => (
        <a href="#top" key={label}>
          {label}
        </a>
      ))}
    </Col>
  </Row>
)

export default Header
