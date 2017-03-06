import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import Visualizer from './components/visualizer'
import Axios from 'axios'
const API_KEY = "5aa83bd6f3a03ec298c39f3309e80a6ca1686b4b"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { population: "" }

    this.populationSearch("11211")
  }

  populationSearch(location) {
    Axios.get(
      `http://api.census.gov/data/2013/acs5?get=NAME,B01001_001E&for=zip+code+tabulation+area:${location}&key=${API_KEY}`
    ).then(
      response => this.setState({ population: response.data[1][1] })
    )
  }

  render() {
    return (
      <div>
        Please type your 5-digit Zip Code <SearchBar onLocationChange={location => this.populationSearch(location)} />
        <div>The population in your Zip Code is {this.state.population}</div>
        <Visualizer population={this.state.population} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
