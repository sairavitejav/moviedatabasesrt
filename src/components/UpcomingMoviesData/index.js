import {Link} from 'react-router-dom'
import './index.css'

const UpcomingMoviesData = props => {
  const {upcomingMovie} = props
  const {id, title, posterPath, popularity, voteAverage} = upcomingMovie
  const imageUrl = `https://image.tmdb.org/t/p/w300${posterPath}`
  return (
    <li className="up-movie-item">
      <img className="up-img" src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>{popularity}</p>
      <p>{voteAverage}</p>
      <Link to={`/${id}`}>
        <button type="button" className="up-view-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default UpcomingMoviesData
