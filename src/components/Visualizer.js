import React from 'react'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Visualizer = (props) => {
  return (
    <div>
      <div>
        Number of people in your location: {numberWithCommas(props.population)}
      </div>
      <div>
        Number of Syrian child refugees: 2,500,000
      </div>
    </div>
  )
}

export default Visualizer
