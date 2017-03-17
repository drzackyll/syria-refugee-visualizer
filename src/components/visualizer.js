import React, { Component } from 'react'
const DATA = [
  {fact: "Please select", value: "", url: ""},
  {fact: "How many Syrian children are refugees?", value: "500", url: "https://www.unicefusa.org/mission/emergencies/child-refugees/syria-crisis"},
  {fact: "How many Syrian children are out of school?", value: "560", url: "https://www.unicefusa.org/mission/emergencies/child-refugees/syria-crisis"},
  {fact: "How many Syrians has the US admitted since 2016?", value: "2", url: "http://www.pewresearch.org/fact-tank/2017/01/30/key-facts-about-refugees-to-the-u-s/"},
  {fact: "How many children live in conflict zones worldwide?", value: "50000", url: "http://www.dw.com/en/unicef-one-in-nine-children-live-in-conflict-zones/a-19005359"},
  {fact: "How many people are forcibly displaced worldwide?", value: "13060", url: "http://www.unhcr.ie/about-unhcr/facts-and-figures-about-refugees"},
  {fact: "How many are displaced by climate change (2009)?", value: "4000", url: "http://www.unhcr.org/4b2910239.html"},
  {fact: "How many are killed as a result of climate change annually?", value: "80", url: "http://daraint.org/climate-vulnerability-monitor/climate-vulnerability-monitor-2012/"},
  {fact: "How many in South America were affected by floods in 1995-2004?", value: "112", url: "http://www.unisdr.org/files/46796_cop21weatherdisastersreport2015.pdf"},
  {fact: "How many in South America were affected by floods in 2005-2014?", value: "440", url: "http://www.unisdr.org/files/46796_cop21weatherdisastersreport2015.pdf"},
  {fact: "How many were affected by droughts in 2015?", value: "10100", url: "http://reliefweb.int/report/world/human-cost-hottest-year-record-climate-change-and-el-nino-drove-disasters-worldwide"},
  {fact: "How many were killed in weather events in Asia, 1995-2015?", value: "66", url: "http://www.unisdr.org/files/46796_cop21weatherdisastersreport2015.pdf"},
  {fact: "How many may be displaced by climate change by 2050 (estimate)?", value: "50000", url: "http://www.glogov.org/images/doc/equitybd.pdf"}
]

class Visualizer extends Component {
  constructor(props) {
    super(props)

    this.state = { refugees: [] }
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
    const iconsNumber = Math.floor(number / 5000)
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
    if (event.target.selectedIndex === 12 || event.target.selectedIndex === 4) {
      array.push(<div>Trying to render enough images to represent 250 million people could crash your browser. So we will not. Just imagine what 50,000 person-images looks like.</div>)
      array.length = 50000
    } else {
      for (let step = 0; step < Math.floor(event.target.value) - 1; step++) {
        array.push(
          <img src='../../images/child-red.png' key={step} alt='red icon' />
        )
      }
      array.push(
        <div key={array.length}><br />
        <h5><a target="_blank" href={event.target[event.target.selectedIndex].dataset.url}>Source</a></h5>
        </div>
      )
    }
    this.setState({ refugees: array })
  }

  render() {
    const population = this.props.population
    const refugees = this.state.refugees

    return (
      <div className="container-fluid">
        <div className="row">
        <div id="landing-image"></div>
          <div className="col-xs-6">
            {(population ? "Each figure represents 5000 people" : "")}
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
            <h4>{(refugees.length > 0 && population !== "" ?
              `~${this.numberWithCommas(refugees.length * 5000)}` :
              ""
            )}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6">
            {this.showIcons(population)}
          </div>
          <div className="col-xs-6">
            {population === "" ? [] : refugees}
          </div>
        </div>
      </div>
    )
  }
}

export default Visualizer
