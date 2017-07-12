import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import Visualizer from './components/visualizer'
import $ from 'jquery'
const API_KEY = "5aa83bd6f3a03ec298c39f3309e80a6ca1686b4b"
const PROPUBLICA_API_KEY = "91mTqXFEeSaCIbjC0fuaB1RABk4HANqS4I91qRBN"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { population: "", representatives: {}, location: ""}
  }

  populationSearch(location) {
    this.setState({ location })
    if (location.length === 5) {
      $.ajax({
        url: `https://api.census.gov/data/2013/acs5?get=NAME,B01001_001E&for=zip+code+tabulation+area:${location}&key=${API_KEY}`,
        type: "GET",
        dataType: "json"
      }).then(
        response => console.log(response)
      )
    } else {
      this.setState({ population: ""})
    }
    this.representativeSearch(location)
  }

  representativeSearch(location) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.propublica.org/congress/v1/members/senate/ny/current.json",
      "method": "GET",
      "headers": {
        "x-api-key": `${PROPUBLICA_API_KEY}`
      }
    }
    if (location.length === 5) {
      $.ajax(settings).then(
        response => console.log(response)
      )
    } else {
      this.setState({ representatives: {} })
      console.log("nope")
    }
  }

  render() {
    return (
      <div>
        <SearchBar  reps={this.state.representatives} onLocationChange={location => this.populationSearch(location)} />
        <Visualizer population={this.state.population} location={this.state.location} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
