import React from "react";
import Header from "./component/Header";
import Form from "react-bootstrap/Form";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Error from "./component/Error";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
      mapFlag: false,
      displayError: false,
    };
  }

  getting = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    let Key = "pk.3a03040a7da21c03158a0c3c542c001a";
    let url= `https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${cityName}&format=json`;
    try {
      let newLocation = await axios.get(url);
      this.setState({
        lat: newLocation.data[0].lat,
        lon: newLocation.data[0].lon,
        displayName: newLocation.data[0].display_name,

        mapFlag: true,
      });
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
          <Header  />
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
          
            <h3>Welcome to {this.state.displayName} </h3>
            {this.state.displayName} is located at {this.state.lat} by{" "}
            {this.state.lon}
            
          </div>)}

          <div id="two">
            {this.state.mapFlag && (
              <img
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.5555b1da753853cd352a4bfe2f089b71&center=${this.state.lat},${this.state.lon}&zoom=1-18&format=png`}
                alt="map"
              />
            )}
          </div>
          <Error error={this.state.displayError} />

          <Footer />
        </body>
      </>
    );
  }
}

export default App;