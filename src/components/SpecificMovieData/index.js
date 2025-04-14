import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieDetailSection from '../MovieDetailSection'
import CastDetailSection from '../CastDetailSection'
import './index.css'

const apiStatusConstants = {
  inital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const SpecificMovieData = () => {
  const [movieDataList, setMovieData] = useState([])
  const [castDataList, setCastData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inital)
  const {id} = useParams()

  useEffect(() => {
    const getMovieData = async () => {
      setApiStatus(apiStatusConstants.loading)
      const apiKey = '698165796f71ff01e4ad978a5b6c1179'
      const movieApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      const castApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      const options = {
        method: 'GET',
      }
      const movieResponse = await fetch(movieApiUrl, options)
      if (movieResponse.ok === true) {
        const data = await movieResponse.json()
        // console.log(data)
        const updatedData = {
          title: data.title,
          backdropPath: data.backdrop_path,
          popularity: data.popularity,
          runtime: data.runtime,
          genres: data.genres.map(item => ({
            id: item.id,
            name: item.name,
          })),
          releaseDate: data.release_date,
          overview: data.overview,
        }
        // console.log(updatedData)
        setMovieData(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
      const castResponse = await fetch(castApiUrl, options)
      if (castResponse.ok === true) {
        const castData = await castResponse.json()
        // console.log(castData)
        const updatedCastData = castData.cast.map(item => ({
          name: item.name,
          id: item.id,
          profilePath: item.profile_path,
          characterName: item.character,
          knownForDepartment: item.known_for_department,
        }))
        // console.log(updatedCastData)
        setCastData(updatedCastData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }
    getMovieData()
  }, [id])

  const renderSuccessView = () => (
    <>
      <div className="movie-detail-container">
        <h1>Movie Details Section</h1>
        <MovieDetailSection movieDataList={movieDataList} />
      </div>
      <hr />
      <div className="movie-detail-container">
        <h1>Cast Details Section</h1>
        <ul className="cast-list-container">
          {castDataList.map(cast => (
            <CastDetailSection cast={cast} key={cast.id} />
          ))}
        </ul>
      </div>
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
    <div>
      <Header />
      {renderDifferentViews()}
    </div>
  )
}
export default SpecificMovieData
