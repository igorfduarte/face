import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import Home from "./routes/home/home.router";
import Face from "./routes/face_recognition/face.router";
import { Component } from "react";
import "tachyons";
import "./App.css";

class App extends Component {
  constructor(){
    super()
    this.state = {
    }
  }  

  render() {
    return (
      <div className="App">      
        <Routes>          
          <Route path="/" element={<Navigation  />}>
            <Route path="/" element={<Home />} />
            <Route path="/face" element={<Face/>} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
