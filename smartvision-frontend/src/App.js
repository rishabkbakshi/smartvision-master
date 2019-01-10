import React, { Component } from 'react';

import './App.css';

import Navigation from './components/Navigation/Navigation';
import ImageForm from './components/ImageForm/ImageForm';
import UserInfo from './components/UserInfo/UserInfo';
import DisplayComponent from './components/DisplayComponent/DisplayComponent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Particles from 'react-particles-js';



const particleOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: '#262626',
        blur: 5
      }
    },
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    move: {
      speed: 6
    }
  }
};

const initialState = {
  input: [],
  imageUrl: "",
  boundingBoxData: [],
  route: '',
  isSignedIn: false,
  userProfile: {
    id: '',
    name: "",
    email: "",
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super()
    this.state = initialState;
  }

  loadUser = (data) => {
    console.log("Loading User: ", data);
    this.setState({
      userProfile: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    console.log(data)

    const image = document.getElementById('inputImage');
    const img_width = Number(image.width)
    const img_height = Number(image.height)
    let faceData = [];

    data.outputs[0].data.regions.map((region, index) => {
      let regionData = {
        left_col: region.region_info.bounding_box.left_col,
        top_row: region.region_info.bounding_box.top_row,
        right_col: region.region_info.bounding_box.right_col,
        bottom_row: region.region_info.bounding_box.bottom_row
      }

      faceData.push({
        face_id: region.id,
        leftCol: regionData.left_col * img_width,
        topRow: regionData.top_row * img_height,
        rightCol: img_width - (regionData.right_col * img_width),
        bottomRow: img_height - (regionData.bottom_row * img_height)
      })
    })

    console.log(faceData);
    return faceData;
  }

  displayFaceBox = (boxValues) => {
    console.log(boxValues)
    this.setState({ boundingBoxData: boxValues })
  }

  onInputChange = (event) => {
    console.log(this.state.input, event.target.value)
    if(event.target.value){
      let inputArr = []
      inputArr.push(event.target.value)
      console.log(inputArr);
      this.setState({ input: inputArr })
    }
  }

  onButtonSubmit = () => {
    console.log("Click", this.state.input);
    this.setState({ imageUrl: this.state.input[0], boundingBoxData: [] }) // Display the image and set bouding box data to empty

    fetch(global.API_URL + 'detectFace', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({input: this.state.input[0] } )
    })
      .then(response => response.json())
      .then(apiData => {
        if (apiData) {
          fetch(global.API_URL + 'imageCount', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: this.state.userProfile.id })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.userProfile, { entries: count }))
              document.getElementById('imageUrlInput').value = '';
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(apiData))
      })
      .catch(err => console.log(err))
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
      console.log("Changing route to ", route, this.state)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
      console.log("Changing route to ", route, this.state)
    }
    this.setState({ route: route })
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />

        {
          (this.state.route === 'home') ?
            <div>
              <UserInfo name={this.state.userProfile.name} entries={this.state.userProfile.entries} />
              <ImageForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit} 
                appState={this.state}/>
              <DisplayComponent imageUrl={this.state.imageUrl} faceBox={this.state.boundingBoxData} />
            </div>
            : (this.state.route === 'register') ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }



      </div>
    );
  }
}

export default App;
