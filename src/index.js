import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import Axios from 'axios'
const API_KEY = "5aa83bd6f3a03ec298c39f3309e80a6ca1686b4b"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { population: "" }

    Axios.get(
      `http://api.census.gov/data/2013/acs5?get=NAME,B01001_001E&for=zip+code+tabulation+area:42101&key=${API_KEY}`
    ).then(
      response => this.setState({ population: response.data[1][1] })
    )
  }

  render() {
    return (
      <div>
        Please type your 5-digit Zip Code <SearchBar />
        <div>The population in your Zip Code is {this.state.population}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
