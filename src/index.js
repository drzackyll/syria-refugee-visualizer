import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import Visualizer from './components/visualizer'
import $ from 'jquery'
const API_KEY = "5aa83bd6f3a03ec298c39f3309e80a6ca1686b4b"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { population: "", representatives: {} }
  }

  populationSearch(location) {
    if (location.length === 5) {
      $.ajax({
        url: `http://api.census.gov/data/2013/acs5?get=NAME,B01001_001E&for=zip+code+tabulation+area:${location}&key=${API_KEY}`,
        type: "GET",
        dataType: "json"
      }).then(
        response => this.setState({ population: response[1][1] })
      )
    } else {
      this.setState({ population: ""})
    }
    this.representativeSearch(location)
  }

  representativeSearch(location) {
    if (location.length === 5) {
      $.ajax({
        url: `http://whoismyrepresentative.com/getall_mems.php?zip=${location}&output=json`,
        type: "GET",
        headers: { 'Access-Control-Allow-Origin': '*' },
        dataType: "json",
        crossDomain: true
      }).then(
        response => console.log(response)
        // response => this.setState({ representatives: response })
      )
    } else {
      this.setState({ representatives: {} })
    }
  }

  render() {
    return (
      <div>
        <SearchBar  reps={this.state.representatives} onLocationChange={location => this.populationSearch(location)} />
        <Visualizer reps={this.state.representatives} population={this.state.population} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
