import React, { Component } from 'react'
import $ from 'jquery'
import SkyLight from 'react-skylight'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { location: {street: '', city: '', state: '', zip: ''}, representativeInfo: [], animate: false }
    this.onInputChange = this.onInputChange.bind(this)
    this.displayRepresentatives = this.displayRepresentatives.bind(this)
    this.handleAboutClick = this.handleAboutClick.bind(this)
  }

  componentDidMount() {
    document.getElementById('select-box').style.visibility = 'hidden'
    document.getElementById('landing-image').innerHTML = "<img src='../../images/refugee_camp.jpg' id='landed' alt='refugee camp' />"
  }

  handleDonateClick() {
    window.location = "https://www.unicefusa.org/donate/help-save-childrens-lives/29161"
  }

  displayRepresentatives() {
    const repArray = this.props.reps.map(member => {
      let tel, fb, twit
      if (member.phones) { tel = `Phone: ${member.phones[0]}` }
      if (member.channels.facebook) { fb = `http://www.facebook.com/${member.channels.facebook.id}` }
      if (member.channels.twitter) { twit = `https://twitter.com/intent/tweet?screen_name=${member.channels.twitter.id}` }

      return (
        <div className="row" key={member.phones[0]} style={{textAlign: "center"}}>
          <div className="col-xs-4 col-xs-offset-2">
            <img style={{width: '50%'}} alt="presentation" src={member.photoUrl} />
          </div>
          <div className="col-xs-4">
            {member.name}<br />
            {tel}<br />
            <a href={fb} target="_blank"><img className="fbook" src="../../images/facebookbutton.png" alt="Facebook" /></a>
            <a href={twit} target="_blank"><img className="tweet" src="../../images/twitterbutton.png" alt="Twitter" /></a><br />
            <br />
          </div>
        </div>
      )
    })
    this.setState({ representativeInfo: repArray })
    this.refs.advocateDialog.show()
  }

  onInputChange(event) {
    let location = {...this.state.location}
    location[event.target.id] = event.target.value
    this.setState({ location })
    this.props.onLocationChange(location)
    if (event.target.value.length === 5) {
      document.getElementById('select-box').style.visibility = 'visible'
      document.getElementById('landing-image').innerHTML = ""
      if ( $(window).width() > 1100) {
        if (this.state.animate === false) {
          $('#title').animate({ left: "-=30%" })
          this.setState({ animate: true })
        }
      }
      setTimeout(() => {$('.button').css("visibility", "visible")}, 1000)
    }
  }

  handleAboutClick() {
    this.refs.aboutDialog.show()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row" style={{backgroundColor: "#88BBD6", textAlign: "right"}}>
          <input className="button" type="button" value="about" onClick={this.handleAboutClick} />
          <input className="donate button" type="button" value="donate" onClick={this.handleDonateClick} />
          <input className="button" type="button" value="advocate" onClick={this.displayRepresentatives} />
        </div>

        <SkyLight hideOnOverlayClicked dialogStyles={{height: "auto"}} ref="aboutDialog" title="About">
          See how the size of the population where you live compares to the scale of crises around the world. We need a strong international development budget now more than ever. Please make your voice heard, and if you can donate to worthy international organizations, please do.<br />
          <br />
          Many of the figures are rounded.<br />
          Thanks to the <a href="https://www.census.gov/developers/">Census API (2013)</a> and the <a href="https://developers.google.com/civic-information/">Google Civic Information API</a> for access.<br />
          Image source: <a href="https://commons.wikimedia.org/wiki/File:An_Aerial_View_of_the_Za%27atri_Refugee_Camp.jpg">Wikimedia Commons</a><br /><br />
          - Zack Adams
        </SkyLight>

        <SkyLight hideOnOverlayClicked dialogStyles={{height: "auto"}} ref="advocateDialog" title="Contact Your Representatives">
          Let your representatives know you support the important international affairs budget.
          {this.state.representativeInfo}
        </SkyLight>

        <div className="row" style={{backgroundColor: "#88BBD6", textAlign: "center"}}>
          <h2 id="title">How big are the world's problems?</h2>
          <div style={{textAlign: "center"}}>
            <input
              className="text-center search-bar"
              type="text"
              id="street"
              value={this.state.location.street}
              onChange={this.onInputChange}
              placeholder="Enter your street">
            </input>
            <input
              className="text-center search-bar"
              type="text"
              id="city"
              value={this.state.location.city}
              onChange={this.onInputChange}
              placeholder="Enter your city">
            </input>
            <input
              className="text-center search-bar"
              type="text"
              id="state"
              value={this.state.location.state}
              onChange={this.onInputChange}
              placeholder="Enter your state">
            </input>
            <input
              className="text-center search-bar"
              type="number"
              id="zip"
              value={this.state.location.zip}
              onChange={this.onInputChange}
              placeholder="Enter your zip code"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar
