import React, { Component } from 'react'

// http://api.census.gov/data/2013/acs5?get=NAME,B01001_001E&for=zip+code+tabulation+area:42101&key=5aa83bd6f3a03ec298c39f3309e80a6ca1686b4b

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { location: '' }

    this.onInputChange = this.onInputChange.bind(this)
  }

  render() {
    return (
      <div>
        <input
          value={this.state.location}
          onChange={this.onInputChange} />
      </div>
    )
  }

  onInputChange(event) {
    this.setState({ location: event.target.value })
    if (this.state.location.length === 4) {
      this.props.onLocationChange(event.target.value)
    }
  }
}

export default SearchBar
