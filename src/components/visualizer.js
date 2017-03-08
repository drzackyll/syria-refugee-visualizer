import React, { Component } from 'react'
const DATA = [
  {fact: "Please select", value: ""},
  {fact: "How many Syrian children are refugees?", value: "2500"},
  {fact: "How many unaccompanied children have crossed Syria's border since 2011?", value: "15"},
  {fact: "How many Syrian children are out of school?", value: "2800"},
  {fact: "How many Syrians have we reached with access to water and sanitation?", value: "12000"}
]

class Visualizer extends Component {
  constructor(props) {
    super(props)

    this.state = { children: [] }
    this.handleChange = this.handleChange.bind(this)
  }

  selectOptions() {
    return DATA.map(
      (factoid, index) => <option style={{textAlign: "center"}} value={factoid.value} key={index}>{factoid.fact}</option>
    )
  }

  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  showIcons(number) {
    const iconsNumber = Math.floor(number / 1000)
    let array = []

    for (let step = 0; step < iconsNumber; step++) {
      array.push(
        <img src='../../images/child-blk.png' key={step} alt='black icon' />
      )
    }

    return array
  }

  handleChange(event) {
    let array = []

    for (let step = 0; step < event.target.value; step++) {
      array.push(
        <img src='../../images/child-red.png' key={step} alt='red icon' />
      )
    }

    this.setState({ children: array })
  }

  render() {
    const population = this.props.population
    const children = this.state.children

    return (
      <div className="container-fluid">
        <div style={{textAlign: "center"}}>
          <select id="select-box" onChange={this.handleChange}>
            {this.selectOptions()}
          </select>
          <br />
          {(population ? "Each figure represents 1000 people" : "")}
          <br />
        </div>

        <div className="row">
          <div className="col-xs-6">
            <h4>{(population ? `Number of people in your zip code: ${this.numberWithCommas(population)}` : "")}</h4>
          </div>
          <div className="col-xs-6">
            <h4>{(children.length > 0 ? `Number of Syrians: ~${this.numberWithCommas(children.length * 1000)}` : "")}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6">
            {this.showIcons(population)}
          </div>
          <div className="col-xs-6">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Visualizer
