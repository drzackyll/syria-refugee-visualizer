import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import Visualizer from './components/visualizer'
import $ from 'jquery'
const API_KEY = "5aa83bd6f3a03ec298c39f3309e80a6ca1686b4b"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { population: "", representatives: [], location: { street: '', city: '', state: '', zip: '' }}
  }

  populationSearch(location) {
    this.setState({ location })
    if (location.length === 5) {
      $.ajax({
        url: `https://api.census.gov/data/2013/acs5?get=NAME,B01001_001E&for=zip+code+tabulation+area:${location}&key=${API_KEY}`,
        type: "GET",
        dataType: "json"
      }).then(
        response => this.setState({ population: response[1][1] })
      )
    } else {
      this.setState({ population: ""})
    }
    // this.representativeSearch(location)
  }

  getDistrict = location => {
    // debugger
    if (location.street && location.city && location.state && location.zip) {
      this.populationSearch(location.zip)
      let address = `${location.street} ${location.city} ${location.state} ${location.zip}`
      address = address.split(' ').join('%20')
      $.ajax({
        url: `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBtIaQcKkYzQZsiZSdazI-DCpAj-nPdKCE&address=${address}`,
        type: "GET",
        dataType: "jsonp"
      }).then(
        response => {
          let representatives = response.officials.slice(2, 5)
          this.setState({ representatives })
        }
      ).catch(response => console.log(response))
    }
  }

  // senateSearch = state => {
  //   $.ajax({
  //     headers: {
  //       'X-API-Key': '91mTqXFEeSaCIbjC0fuaB1RABk4HANqS4I91qRBN'
  //     },
  //     url: `https://api.propublica.org/congress/v1/members/senate/${state}/current.json`,
  //     type: "GET",
  //     dataType: "jsonp"
  //   }).then(
  //     response => {
  //       let representatives = {...this.state.representatives}
  //       representatives.senate = response
  //       this.setState({ representatives })
  //     }
  //   ).catch(response => console.log(response))
  // }

  // houseSearch = (state, district) => {
  //   $.ajax({
  //     headers: {
  //       'X-API-Key': '91mTqXFEeSaCIbjC0fuaB1RABk4HANqS4I91qRBN'
  //     },
  //     url: `https://api.propublica.org/congress/v1/members/house/${state}/${district}/current.json`,
  //     type: "GET",
  //     dataType: "jsonp"
  //   }).then(
  //     response => {
  //       let representatives = {...this.state.representatives}
  //       representatives.house = response
  //       this.setState({ representatives })
  //     }
  //   ).catch(response => console.log(response))
  // }

  // representativeSearch = location => {
  //   this.senateSearch(location.state)
  //   this.houseSearch(location.state, location.district)
  // }


  render() {
    return (
      <div>
        <SearchBar reps={this.state.representatives} onLocationChange={location => this.getDistrict(location)} />
        <Visualizer population={this.state.population} location={this.state.location} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
