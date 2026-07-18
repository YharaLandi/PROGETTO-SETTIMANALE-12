import { Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'
import { playTrack, toggleFavourite } from '../redux/playerSlice'

const truncate = (text, max = 16) =>
  text.length <= max ? text : text.substring(0, max) + '...'

// Rinominato da "Song" a "TrackCard": stessa funzione, nome diverso, e uso
// del singolo toggleFavourite invece di due azioni add/remove separate.
const TrackCard = ({ track }) => {
  const dispatch = useDispatch()
  const favourites = useSelector((state) => state.player.favourites)
  const isFavourite = favourites.includes(track.id)

  return (
    <Col className="text-center" key={track.id}>
      <img
        className="img-fluid"
        src={track.album.cover_medium}
        alt={track.title}
        onClick={() => dispatch(playTrack(track))}
        role="button"
      />
      <p className="mb-0">
        Track: "{truncate(track.title)}"
        <br />
        Artist: {track.artist.name}
      </p>
      <div>
        {isFavourite ? (
          <BsFillHeartFill onClick={() => dispatch(toggleFavourite(track.id))} role="button" />
        ) : (
          <BsHeart onClick={() => dispatch(toggleFavourite(track.id))} role="button" />
        )}
      </div>
    </Col>
  )
}

export default TrackCard
