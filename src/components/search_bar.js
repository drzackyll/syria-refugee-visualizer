import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { location: '' }
    this.onInputChange = this.onInputChange.bind(this)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div style={{textAlign: "center"}}>
            <input
              className="text-center"
              style={{
                fontSize: "30px",
                color: "rgb(83, 181, 238)"
                }}
              type="number"
              value={this.state.location}
              onChange={this.onInputChange}
              placeholder="Enter your Zip Code"
            />
          </div>
        </div>
      </div>
    )
  }


  onInputChange(event) {
    this.setState({ location: event.target.value })
    if(event.target.value === "") {
      this.props.onLocationChange(event.target.value)
  }
    // debugger

    if (this.state.location.length === 4) {
      this.props.onLocationChange(event.target.value)
    }
  }
}

export default SearchBar
