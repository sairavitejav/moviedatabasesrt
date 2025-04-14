import {Link} from 'react-router-dom'
import './index.css'

const TopRatedMoviesData = props => {
  const {topMovie} = props
  const {id, title, posterPath, popularity, voteAverage} = topMovie
  const imageUrl = `https://image.tmdb.org/t/p/w300${posterPath}`
  return (
    <li className="top-movie-item">
      <img className="top" src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>{popularity}</p>
      <p>{voteAverage}</p>
      <Link to={`/${id}`}>
        <button type="button" className="top-view-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default TopRatedMoviesData
