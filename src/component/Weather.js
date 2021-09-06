import React from "react";

class Weather extends React.Component {
  render() {
    return (
        
        <>
        day{this.props.day1[0]}
        <br/>
        description:{this.props.day1[1]}
        <br/>
        day{this.props.day2[0]}
        <br/>
        description:{this.props.day2[1]}
        <br/>
        day{this.props.day3[0]}
        <br/>
        description:{this.props.day3[1]}
        </>
        
        )
  }
}
export default Weather;