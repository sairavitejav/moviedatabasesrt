import {Link} from 'react-router-dom'
import './index.css'

const PopularMoviesData = props => {
  const {movie} = props
  const {id, title, posterPath, popularity, voteAverage} = movie
  const imageUrl = `https://image.tmdb.org/t/p/w300${posterPath}`
  return (
    <li className="movie-item">
      <img className="movie-poster" src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>Rating: {popularity}</p>
      <p>Vote Average: {voteAverage}</p>
      <Link to={`/${id}`}>
        <button type="button" className="view-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default PopularMoviesData
