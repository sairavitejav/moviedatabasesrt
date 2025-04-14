import {Link} from 'react-router-dom'
import './index.css'

const SearchedMovies = props => {
  const {result} = props
  const {id, title, posterPath, popularity, voteAverage} = result
  const imageUrl = `https://image.tmdb.org/t/p/w300/${posterPath}`
  return (
    <li className="search-results-container">
      <img className="search-img" src={imageUrl} alt={title} />
      <p>{title}</p>
      <p>{popularity}</p>
      <p>{voteAverage}</p>
      <Link to={`/${id}`}>
        <button type="button" className="view-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default SearchedMovies
