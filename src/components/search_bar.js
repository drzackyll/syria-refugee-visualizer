import React, { Component } from 'react'
import $ from 'jquery'
import SkyLight from 'react-skylight'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { location: '' }
    this.onInputChange = this.onInputChange.bind(this)
    // this.handleRepClick = this.handleRepClick.bind(this)
    this.displayRepresentatives = this.displayRepresentatives.bind(this)
  }

  componentDidMount() {
    document.getElementById('select-box').style.visibility = 'hidden'
  }

  handleDonateClick() {
    window.location = "https://www.unicefusa.org/donate/help-save-childrens-lives/29161"
  }
  // handleRepClick() {
  //   window.location = `http://whoismyrepresentative.com/search/zip/${this.state.location}`
  // }

  displayRepresentatives() {
    debugger
    this.refs.simpleDialog.show()
  }

  render() {
    return (
      <div className="container-fluid">
      <div className="row" style={{backgroundColor: "rgb(228, 243, 252)", textAlign: "right"}}>
        <input className="button" type="button" value="donate" onClick={this.handleDonateClick} />
        <input className="button" type="button" value="advocate" onClick={this.displayRepresentatives} />
      </div>
      <SkyLight hideOnOverlayClicked ref="simpleDialog" title="Contact Your Representatives">
          Let your representatives in Congress know that you support assistance for the children of Syria.
      </SkyLight>
        <div className="row" style={{backgroundColor: "rgb(228, 243, 252)", textAlign: "center"}}>
        <h1 id="title">A Crisis for Syrian Children</h1>
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

      setTimeout(() => {$('.button').css("visibility", "visible")}, 1000)
    }
  }
}

export default SearchBar
