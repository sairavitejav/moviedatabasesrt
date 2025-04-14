import {Switch, Route} from 'react-router-dom'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SpecificMovieData from './components/SpecificMovieData'
import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={PopularMovies} />
    <Route exact path="/top-rated" component={TopRatedMovies} />
    <Route exact path="/upcoming" component={UpcomingMovies} />
    <Route exact path="/:id" component={SpecificMovieData} />
  </Switch>
)

export default App
