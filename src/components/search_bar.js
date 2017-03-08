import React, { Component } from 'react'
import $ from 'jquery'

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
        <div className="row" style={{backgroundColor: "rgb(228, 243, 252)", textAlign: "center"}}>
        <h1 id="title">Syrian Children Under Seige</h1>
          <div style={{textAlign: "center"}}>
            <input
              className="text-center"
              style={{
                fontSize: "20px",
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

    if (event.target.value === "") {
      this.props.onLocationChange(event.target.value)
      document.getElementById('select-box').style.visibility = 'hidden'
      $('#title').animate({
        left: "+=30%"
      })
  }
    if (event.target.value.length === 5) {
      this.props.onLocationChange(event.target.value)
      document.getElementById('select-box').style.visibility = 'visible'
      $('#title').animate({
        left: "-=30%"
      })
    }
  }
}

export default SearchBar
