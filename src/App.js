import React from "react";
import Header from "./component/Header";
import Form from "react-bootstrap/Form";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Error from "./component/Error";
import "./App.css";
import Weather from "./component/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      name: "",
      mapFlag: false,
      displayError: false,
      day1: ["", ""],
      // day2: [{weather:"",time:""}],
      // day3: [{weather:"",time:""}]
    };
  }

  getting = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    let Key = "pk.3a03040a7da21c03158a0c3c542c001a";

    let url = `https://cityexplorerlab07.herokuapp.com/weather?name=${cityName}&format=json`;
    try {
      let newLocation = await axios.get(url);
      this.setState({
        lat: newLocation.data[0].lat,
        lon: newLocation.data[0].lon,
        name: newLocation.data[0].city,
        day1: [newLocation.data[0].day1.time, newLocation.data[0].day1.weather],
        day2: [newLocation.data[0].day2.time, newLocation.data[0].day2.weather],
        day3: [newLocation.data[0].day3.time, newLocation.data[0].day3.weather],

        mapFlag: true,
      });
      console.log(newLocation.data[0].day1)
    } catch {
      this.setState({
        displayError: true,
      });
    }
  };

  render() {
    return (
      <>
        <body>
          <Header />
          <h4>Where would you like to explore? </h4>
          <Form onSubmit={this.getting}>
            <input type="text" name="cityName" placeholder="Enter city name" />
            <br />
            <Button variant="primary" type="submit">
              Explore!
            </Button>
          </Form>
          {this.state.mapFlag && (
            <div id="one">

              <h3>Welcome to {this.state.name} </h3>
              {this.state.name} is located at {this.state.lat} by{" "}
              {this.state.lon}

            </div>)}

          <div id="two">
            {this.state.mapFlag && (
              <img
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.d4cac4082161bc94613452c95d844ce3&center=${this.state.lat},${this.state.lon}&zoom=1-18&format=png`}
                alt="map"
              />
            )}
          </div>
          {this.state.mapFlag && (
          <Weather

            day1={this.state.day1}
            day2={this.state.day2}
            day3={this.state.day3}
          />)}
          <Error error={this.state.displayError} />

          <Footer />
        </body>
      </>
    );
  }
}

export default App;