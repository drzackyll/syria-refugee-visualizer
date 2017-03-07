import React, { Component } from 'react'

class Visualizer extends Component {
  constructor(props) {
    super(props)

    this.state = { children: [] }
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <div className="col-xs-offset-3">
          <select onChange={this.handleChange}>
            {this.selectOptions()}
          </select>
        </div><br />
          <div className="col-xs-6">
            {(this.props.population ? `Number of people in your location: ${this.numberWithCommas(this.props.population)}` : "")} <br />
            {this.showIcons(this.props.population)}
          </div>
          <div>
            {(this.state.children.length > 0 ? `Number of Syrians: ~${this.state.children.length * 100}` : "")} <br />
            {this.state.children}
          </div>
        </div>
      </div>
    )
  }

  selectOptions() {
    const data = [
      {fact: "Please select", value: ""},
      {fact: "How many Syrian children are refugees?", value: "2500"},
      {fact: "How many unaccompanied children have crossed Syria's border since 2011?", value: "150"},
      {fact: "How many Syrian children are out of school?", value: "28000"},
      {fact: "How many Syrians have we reached with access to water and sanitation?", value: "120000"}
    ]

    return data.map((factoid) => <option value={factoid.value}>{factoid.fact}</option>)
  }

  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  showIcons(number) {
    const iconsNumber = Math.floor(number / 1000)
    let array = []
    let step

    for (step = 0; step < iconsNumber; step++) {
      array.push(
        <img src='../../images/child-blk.png' key={step} alt='child icon' />
      )
    }

    return array
  }

  handleChange(event) {
    let array = []
    let step

    for (step = 0; step < event.target.value; step++) {
      array.push(
        <img src='../../images/child-red.png' key={step} alt='child icon' />
      )
    }

    this.setState({ children: array })
  }
}

export default Visualizer
