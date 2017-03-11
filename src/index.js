import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import Visualizer from './components/visualizer'
import $ from 'jquery'
const CENSUS_API_KEY = "5aa83bd6f3a03ec298c39f3309e80a6ca1686b4b"
const GOOGLE_API_KEY = "AIzaSyAsoiAg1cBZUnoQOM5xuTvV6VxHPf3V6_k"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { population: "", representatives: {}, zip: "", cityState: { city: "", state: "" } }
  }

  locationSearch(zip) {
    if (zip.length === 5) {
      $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_API_KEY}`,
        type: "GET",
        dataType: "json"
      }).then(
        response => this.setState({
          cityState: {
            city: response.results[0].address_components[1].long_name,
            state: response.results[0].address_components[2].long_name
          }
        })
      )
    } else {
      this.setState({ cityState: { city: "", state: "" } })
    }
    this.populationSearch(zip)
  }

  populationSearch(zip) {
    this.setState({ zip })
    if (zip.length === 5) {
      $.ajax({
        url: `https://api.census.gov/data/2013/acs5?get=NAME,B01001_001E&for=zip+code+tabulation+area:${zip}&key=${CENSUS_API_KEY}`,
        type: "GET",
        dataType: "json"
      }).then(
        response => this.setState({ population: response[1][1] })
      )
    } else {
      this.setState({ population: ""})
    }
    this.representativeSearch(zip)
  }

  representativeSearch(zip) {
    if (zip.length === 5) {
      $.ajax({
        url: `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}`,
        type: "GET",
        dataType: "json"
      }).then(
        response => this.setState({ representatives: response })
      )
    } else {
      this.setState({ representatives: {} })
    }
  }

  render() {
    return (
      <div>
        <SearchBar  reps={this.state.representatives} onLocationChange={zip => this.locationSearch(zip)} />
        <Visualizer population={this.state.population} zip={this.state.zip} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
