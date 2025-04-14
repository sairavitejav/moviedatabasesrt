import './index.css'

const CastDetailSection = props => {
  const {cast} = props
  const {name, profilePath, characterName, knownForDepartment} = cast
  const imageUrl = `https://image.tmdb.org/t/p/w300/${profilePath}`
  return (
    <li className="cast-container">
      <img className="cast-img" src={imageUrl} alt={name} />
      <h1 className="cast-name">Name: {name}</h1>
      <p className="char-name">Character Name: {characterName}</p>
      <p className="department">Department: {knownForDepartment}</p>
    </li>
  )
}
export default CastDetailSection
