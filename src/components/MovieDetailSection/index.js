import './index.css'

const MovieDetailSection = props => {
  const {movieDataList} = props
  const {
    title,
    backdropPath,
    popularity,
    runtime,
    genres,
    releaseDate,
    overview,
  } = movieDataList
  const genresList = genres !== undefined ? genres.map(genre => genre.name) : []
  const imageUrl = `https://image.tmdb.org/t/p/w500/${backdropPath}`
  return (
    <div className="movie-container">
      <h1 className="movie-title-name">{title}</h1>
      <img className="img" src={imageUrl} alt={title} />
      <p>{overview}</p>
      <div className="detail-cont">
        <p className="movie-details">
          <span className="side-head">Rating:</span> {popularity}
        </p>
        <p className="movie-details">
          <span className="side-head">Runtime:</span> {runtime}
        </p>
        <p className="movie-details">
          <span className="side-head">Release Date:</span> {releaseDate}
        </p>
      </div>
      <p className="movie-details">
        <span className="side-head">Genres:</span> {genresList.join(', ')}
      </p>
    </div>
  )
}
export default MovieDetailSection
