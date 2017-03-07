import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { location: '' }
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    document.getElementById('select-box').style.visibility = 'hidden'
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row" style={{backgroundColor: "rgb(228, 243, 252)"}}>
        <h2 style={{color: "rgb(83, 181, 238)"}}>Syrian Children Under Seige</h2>
          <div style={{textAlign: "center"}}>
            <input
              className="text-center"
              style={{
                fontSize: "30px",
                color: "rgb(83, 181, 238)",
                backgroundColor: "rgb(228, 243, 252)",
                border: "transparent"
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
      document.getElementById('select-box').style.visibility = 'hidden'
  }

    if (this.state.location.length === 4) {
      this.props.onLocationChange(event.target.value)
      document.getElementById('select-box').style.visibility = 'visible'
    }
  }
}

export default SearchBar
