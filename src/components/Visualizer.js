import React from 'react'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showIcons(number) {
  const iconsNumber = Math.floor(number / 1000)
  let array = []
  let step

  for (step = 0; step < iconsNumber; step++) {
    array.push(<img src='../../images/child-blk.png' key={step} alt='child icon' />)
  }

  return array
}

function syrianRefugee() {
  let array = []
  let step

  for (step = 0; step < 2500; step++) {
    array.push(<img src='../../images/child-red.png' key={step} alt='child icon' />)
  }

  return array
}

function display() {
  let i = 0
  let displayArray = []

  function run() {
    let array = syrianRefugee()

    displayArray.push(array[i])
    i++
  }
  return displayArray
}

const Visualizer = (props) => {
  return (
    <div className="container-fluid">
      Number of people in your location: {numberWithCommas(props.population)} <br />
      Number of Syrian child refugees: 2,500,000 <br />
      <span id="people"></span>
      {setInterval(display(), 50)}
      <div className="row">
        <div className="col-sm-12">
        </div>
      </div>
    </div>
  )
}

export default Visualizer
