import React from 'react'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showIcons(number) {
  const iconsNumber = Math.floor(number / 1000)
  let step
  let array = []

  for (step = 0; step < iconsNumber; step++) {
    array.push(<img src='../../images/child-blk.png' key={step} alt='child icon' />)
  }

  return array
}

function syrianRefugee() {
  let array = []
  let step

  for (step = 0; step < 2500; step++) {
    array.push(<img src='../../images/child-blk.png' key={step} alt='child icon' />)
  }

  return array
}

const Visualizer = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-6">
          Number of people in your location: {numberWithCommas(props.population)} <br />
          {showIcons(props.population)}
        </div>
        <div className="col-xs-6">
          Number of Syrian child refugees: 2,500,000 <br />
          {syrianRefugee()}
        </div>
      </div>
    </div>
  )
}

export default Visualizer
