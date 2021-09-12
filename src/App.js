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
import Movies from "./component/Movies";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
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
      movies: [],
    };
  }
  getting = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    let Key = "pk.43fed3791d35ddb76aa14f749c6d3080";
    let url = `https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${cityName}&format=json`
    let urlweather = `https://cityexplorerlab07.herokuapp.com/weather?name=${cityName}`;
    let urlmovies = `https://cityexplorerlab07.herokuapp.com/movies?name=${cityName}`;

    try {
      let newLocation = await axios.get(url);
      let newLocation1 = await axios.get(urlweather);
      let newLocation2 = await axios.get(urlmovies);
      this.setState({
        lat: newLocation.data[0].lat,
        lon: newLocation.data[0].lon,
        name: cityName,
        weather: newLocation1.data,
        mapFlag: true,
        movies: newLocation2.data,
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
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}&zoom=1-18&format=png`}
                alt="map"
              />
            )}
          </div>
          {this.state.mapFlag && (<Row xs={1} md={3} className="g-4">
            <Weather
              weather={this.state.weather.map((item) => {
                return (
                  <>
                    <Col>
                      <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">

                          <ListGroup.Item>Date: {item.date}</ListGroup.Item>
                          <ListGroup.Item>Description: {item.desc}</ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>
                  </>
                );
              })}
            />
          </Row>
          )}






          {this.state.mapFlag && (<Row xs={1} md={3} className="g-4">
            <Movies
              Movies={this.state.movies.map((item) => {
                return (
                  <>
                    <Col>
                      <Card>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <Card.Title>title:{item.title}</Card.Title>
                          <Card.Text>overview:
                            {item.overview}
                          </Card.Text>
                          <Card.Text>average_votes:
                            {item.average_votes}
                          </Card.Text>
                          <Card.Text>total_votes:
                            {item.total_votes}
                          </Card.Text>
                          <Card.Text>popularity:
                            {item.popularity}
                          </Card.Text>
                          <Card.Text>released_on:
                            {item.released_on}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                );
              })}
            />
          </Row>
          )}
          <Error error={this.state.displayError} />

          <Footer />
        </body>
      </>
    );
  }
}

export default App;