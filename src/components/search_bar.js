import React, { Component } from 'react'
import $ from 'jquery'
import SkyLight from 'react-skylight'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { location: '', representativeInfo: [], animate: false }
    this.onInputChange = this.onInputChange.bind(this)
    this.displayRepresentatives = this.displayRepresentatives.bind(this)
    this.handleAboutClick = this.handleAboutClick.bind(this)
  }

  componentDidMount() {
    document.getElementById('select-box').style.visibility = 'hidden'
    document.getElementById('landing-image').innerHTML = "<img src='../../images/refugee_camp.jpg' style='height:100%;width:100%' id='landed' alt='refugee camp' />"
  }

  handleDonateClick() {
    window.location = "https://www.unicefusa.org/donate/help-save-childrens-lives/29161"
  }

  displayRepresentatives() {
    const repArray = this.props.reps.results.map(
      function (member) {
        let tel, fb, twit
        if (member.phone) { tel = `Phone: ${member.phone}` }
        if (member.facebook_id) { fb = `http://www.facebook.com/${member.facebook_id}` }
        if (member.twitter_id) { twit = `https://twitter.com/intent/tweet?screen_name=${member.twitter_id}` }

        return (
          <div key={member.govtrack_id} style={{textAlign: "center"}}>
            {member.chamber === "house" ? "Congressperson" : "Senator"} {member.first_name} {member.last_name}<br />
            {tel}<br />
            <a href={fb} target="_blank"><img className="fbook" src="../../images/facebookbutton.png" alt="Facebook" /></a>
            <a href={twit} target="_blank"><img className="tweet" src="../../images/twitterbutton.png" alt="Twitter" /></a><br />
            <br />
          </div>
        )
      }
    )
    this.setState({ representativeInfo: repArray })
    this.refs.advocateDialog.show()
  }

  onInputChange(event) {
    this.setState({ location: event.target.value })
    if (event.target.value.length < 5) {
      if ( $(window).width() > 769) {
        if(this.state.animate === true) {
          $('#title').animate({ left: "+=30%" })
          this.setState({ animate: false })
        }
      }
      $('.button').css("visibility", "hidden")
      this.props.onLocationChange(event.target.value)
      document.getElementById('select-box').style.visibility = 'hidden'
      document.getElementById('landing-image').innerHTML = "<img src='../../images/refugee_camp.jpg' style='height:100%;width:100%' id='landed' alt='refugee camp' />"
    }

    if (event.target.value.length === 5) {
      this.props.onLocationChange(event.target.value)
      document.getElementById('select-box').style.visibility = 'visible'
      document.getElementById('landing-image').innerHTML = ""
      if ( $(window).width() > 769) {
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
          Thanks to the <a href="https://www.census.gov/developers/">Census API (2013)</a> and the <a href="https://propublica.github.io/congress-api-docs/">ProPublica Congress API</a> for access.<br />
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
}

export default SearchBar
