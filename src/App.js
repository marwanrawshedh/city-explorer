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
      weather: [],

    };
  }
  getting = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    let Key = "pk.10f3b8757c535cf26cbecbd040cf2ed5";
    let url1 = `https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${cityName}&format=json`
    let url = `https://cityexplorerlab07.herokuapp.com/weather?name=${cityName}&format=json`;
    try {
      let newLocation = await axios.get(url);
      let newLocation1 = await axios.get(url1);
      this.setState({
        lat: newLocation1.data[0].lat,
        lon: newLocation1.data[0].lon,
        name: cityName,
        weather: newLocation.data,
        mapFlag: true,
      });
      console.log(newLocation1.data)
      console.log(newLocation.data)
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
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.10f3b8757c535cf26cbecbd040cf2ed5&center=${this.state.lat},${this.state.lon}&zoom=1-18&format=png`}
                alt="map"
              />
            )}
          </div>
          {this.state.mapFlag && (
            <Weather
              weather={this.state.weather.map((item) => {
                return (
                  <>
                    <p>Date: {item.date}</p>
                    <p>Description: {item.desc}</p>
                  </>
                );
              })}
            />
          )}
          <Error error={this.state.displayError} />

          <Footer />
        </body>
      </>
    );
  }
}

export default App;