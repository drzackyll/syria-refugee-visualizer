import React, { Component } from 'react'
const DATA = [
  {fact: "Please select", value: "", url: ""},
  {fact: "How many Syrian children are refugees?", value: "2500", url: "https://www.unicefusa.org/mission/emergencies/child-refugees/syria-crisis"},
  {fact: "How many unaccompanied children have crossed Syria's border since 2011?", value: "15", url: "https://www.unicefusa.org/mission/emergencies/child-refugees/syria-crisis"},
  {fact: "How many Syrian children are out of school?", value: "2800", url: "https://www.unicefusa.org/mission/emergencies/child-refugees/syria-crisis"},
  {fact: "How many Syrians has UNICEF USA reached with access to water and sanitation?", value: "12000", url: "https://www.unicefusa.org/mission/emergencies/child-refugees/syria-crisis"},
  {fact: "How many Syrians has the US admitted since 2016?", value: "12", url: "http://www.pewresearch.org/fact-tank/2017/01/30/key-facts-about-refugees-to-the-u-s/"}
]

class Visualizer extends Component {
  constructor(props) {
    super(props)

    this.state = { syrians: [] }
    this.handleChange = this.handleChange.bind(this)
  }

  selectOptions() {
    return DATA.map(
      (factoid, index) => (
        <option className="data" value={factoid.value} data-url={factoid.url} key={index}>{factoid.fact}</option>
      )
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
    for (let step = 0; step < event.target.value - 1; step++) {
      array.push(
        <img src='../../images/child-red.png' key={step} alt='red icon' />
      )
    }
    array.push(
      <div key={array.length}>
        <br />
        <h5><a target="_blank" href={event.target[event.target.selectedIndex].dataset.url}>Source</a></h5>
      </div>
    )
    this.setState({ syrians: array })
  }

  render() {
    const population = this.props.population
    const syrians = this.state.syrians

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6">
            {(population ? "Each figure represents 1000 people" : "")}
          </div>
          <div className="col-xs-6">
          <select id="select-box" onChange={this.handleChange}>
          {this.selectOptions()}
          </select>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6">
            <h4>{(population ?
              `Number of people in your zip code: ${this.numberWithCommas(population)}` :
              ""
            )}</h4>
          </div>
          <div className="col-xs-6">
            <h4>{(syrians.length > 0 && population !== "" ?
              `~${this.numberWithCommas(syrians.length * 1000)}` :
              ""
            )}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6">
            {this.showIcons(population)}
          </div>
          <div className="col-xs-6">
            {population === "" ? [] : syrians}
          </div>
        </div>
      </div>
    )
  }
}

export default Visualizer
