import React, { Component } from 'react'
import $ from 'jquery'
import SkyLight from 'react-skylight'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { location: '', representativeInfo: [], animate: false }
    this.onInputChange = this.onInputChange.bind(this)
    this.displayRepresentatives = this.displayRepresentatives.bind(this)
  }

  componentDidMount() {
    document.getElementById('select-box').style.visibility = 'hidden'
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
    this.refs.simpleDialog.show()
  }

  onInputChange(event) {
    this.setState({ location: event.target.value })
    if (event.target.value.length < 5) {
      if(this.state.animate === true) {
        $('#title').animate({ left: "+=30%" })
        this.setState({ animate: false })
      }
      $('.button').css("visibility", "hidden")
      this.props.onLocationChange(event.target.value)
      document.getElementById('select-box').style.visibility = 'hidden'
    }

    if (event.target.value.length === 5) {
      this.props.onLocationChange(event.target.value)
      document.getElementById('select-box').style.visibility = 'visible'
      if (this.state.animate === false) {
        $('#title').animate({ left: "-=30%" })
        this.setState({ animate: true })
      }
      setTimeout(() => {$('.button').css("visibility", "visible")}, 1000)
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row" style={{backgroundColor: "rgb(228, 243, 252)", textAlign: "right"}}>
          <input className="donate button" type="button" value="donate" onClick={this.handleDonateClick} />
          <input className="button" type="button" value="advocate" onClick={this.displayRepresentatives} />
        </div>

        <SkyLight hideOnOverlayClicked dialogStyles={{height: "auto"}} ref="simpleDialog" title="Contact Your Representatives">
            Let your representatives in Congress know that you support assistance for Syrian refugees.
            {this.state.representativeInfo}
        </SkyLight>

        <div className="row" style={{backgroundColor: "rgb(228, 243, 252)", textAlign: "center"}}>
          <h3 id="title">How Big is the Syrian Refugee Crisis?</h3>
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
