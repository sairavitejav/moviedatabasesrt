import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UpcomingMoviesData from '../UpcomingMoviesData'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const UpcomingMovies = () => {
  const [upcomingMoviesList, setUpcomingMovies] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getUpcomingMovies = async () => {
      setApiStatus(apiStatusConstants.loading)
      const apiKey = '698165796f71ff01e4ad978a5b6c1179'
      const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
      const options = {
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        // console.log(data)
        const updatedData = data.results.map(movie => ({
          id: movie.id,
          overview: movie.overview,
          popularity: movie.popularity,
          posterPath: movie.poster_path,
          title: movie.title,
          voteAverage: movie.vote_average,
        }))
        // console.log(updatedData)
        setUpcomingMovies(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }
    getUpcomingMovies()
  }, [page])

  const movePagePrevious = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1)
    }
  }

  const movePageNext = () => {
    setPage(prevPage => prevPage + 1)
  }

  const renderSuccessView = () => (
    <ul className="upcoming-movie-container">
      {upcomingMoviesList.map(upcomingMovie => (
        <UpcomingMoviesData
          upcomingMovie={upcomingMovie}
          key={upcomingMovie.id}
        />
      ))}
    </ul>
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
    <div>
      <Header />
      <div className="top-cont">
        {renderDifferentViews()}
        <div className="upcoming-pagination-container">
          <button
            className="upcoming-pagination-btns"
            onClick={movePagePrevious}
            type="button"
          >
            Previous
          </button>
          <p className="upcoming-page-no">{page}</p>
          <button
            className="upcoming-pagination-btns"
            onClick={movePageNext}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
export default UpcomingMovies
