import {useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import SearchedMovies from '../SearchedMovies'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const Header = () => {
  const [userInput, setUserInput] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const readUserInput = event => {
    setUserInput(event.target.value)
  }
  const getSearchResults = async () => {
    setApiStatus(apiStatusConstants.loading)
    const apiKey = '698165796f71ff01e4ad978a5b6c1179'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${userInput}&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        popularity: movie.popularity,
        voteAverage: movie.vote_average,
      }))
      // console.log(updatedData)
      setSearchResults(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  const renderSuccessView = () => (
    <>
      {searchResults.length !== 0 && (
        <ul className="search-list-container">
          {searchResults.map(result => (
            <SearchedMovies key={result.id} result={result} />
          ))}
        </ul>
      )}
    </>
  )

  const renderFailureView = () => (
    <div>
      <p>OOPS! Something Went Wrong in API Call. Please Try Again...</p>
    </div>
  )

  const renderLoadingView = () => (
    <div className="view-container">
      <Loader type="ThreeDots" color="green" />
    </div>
  )

  const renderDifferentViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.loading:
        return renderLoadingView()
      default:
        return null
    }
  }
  return (
    <>
      <nav className="nav-container">
        <div>
          <Link to="/" className="nav-links">
            <h1 className="nav-title">movieDB</h1>
          </Link>
        </div>
        <div className="search-container">
          <input
            onChange={readUserInput}
            className="search-bar"
            type="search"
          />
          <button
            onClick={getSearchResults}
            type="button"
            className="search-btn"
          >
            Search
          </button>
        </div>
        <div className="nav-routes-container">
          <Link to="/" className="nav-links">
            <button type="button" className="nav-routes">
              Popular
            </button>
          </Link>
          <Link to="/top-rated" className="nav-links">
            <button type="button" className="nav-routes">
              Top Rated
            </button>
          </Link>
          <Link to="upcoming" className="nav-links">
            <button type="button" className="nav-routes">
              Upcoming
            </button>
          </Link>
        </div>
      </nav>
      {renderDifferentViews()}
    </>
  )
}
export default Header
