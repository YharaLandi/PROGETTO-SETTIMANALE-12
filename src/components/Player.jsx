import { useEffect, useRef, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

// Rispetto alla soluzione originale (player solo grafico), qui il
// play/pause funziona davvero usando l'anteprima audio di Deezer (track.preview).
const Player = () => {
  const track = useSelector((state) => state.player.nowPlaying)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!track || !audioRef.current) return
    audioRef.current.src = track.preview
    audioRef.current.play()
    setIsPlaying(true)
  }, [track])

  const togglePlay = () => {
    if (!audioRef.current || !track) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Container fluid className="fixed-bottom bg-container pt-1">
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      <Row className="h-100">
        <Col md={10} className="offset-md-2">
          <Row className="h-100 justify-content-center align-items-center">
            {track?.title && (
              <Col xs={3} md={3} className="song-info position-absolute">
                <img src={track.album.cover_medium} alt={track.title} />
                <p className="m-0 d-none ms-2">{track.title}</p>
              </Col>
            )}
            <Col xs={6} md={4} className="playerControls">
              <div className="d-flex">
                <a href="#top">
                  <img src="assets/playerbuttons/shuffle.png" alt="shuffle" />
                </a>
                <a href="#top">
                  <img src="assets/playerbuttons/prev.png" alt="prev" />
                </a>
                <a href="#top" onClick={togglePlay}>
                  <img
                    src="assets/playerbuttons/play.png"
                    alt={isPlaying ? 'pause' : 'play'}
                    style={{ opacity: isPlaying ? 1 : 0.6 }}
                  />
                </a>
                <a href="#top">
                  <img src="assets/playerbuttons/next.png" alt="next" />
                </a>
                <a href="#top">
                  <img src="assets/playerbuttons/repeat.png" alt="repeat" />
                </a>
              </div>
              <div className="progress mt-3">
                <div role="progressbar"></div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Player
