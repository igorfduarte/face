import { React, Component } from "react";
import "./ImageLinkForm.css";
import Rank from "../rank/rank.component";
import FaceRecognition from "../faceRecognition/faceRecognition.components";
class ImageLinkForm extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl:
        "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg",
      box: {},
      multiple: false,
    };
  }

  //TODO change regions array to multiple faces
  calculateFaceLocation = (data) => {

    if(!data.outputs[0].data.regions){
      alert('face not detected')
    }

    if (data.outputs[0].data.regions.length > 1) {
      this.setState({ multiple: true });
    } else{
      this.setState({ multiple: false });
    }


    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    const offset = Number(5);
    return {
      leftCol: faceBox.left_col * width - offset,
      topRow: faceBox.top_row * height - offset,
      rightCol: width - faceBox.right_col * width - offset,
      bottomRow: height - faceBox.bottom_row * height - offset,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    const raw = JSON.stringify({
      user_app_id: {
        user_id: "igorfd",
        app_id: "face",
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key b0fd878e66ee413ba22a82cc6826f9ff",
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((data) => this.displayFaceBox(this.calculateFaceLocation(data)))
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div>
        <div></div>
        <Rank />
        <p className=" white f3 center">
          {"Paste any image url that contains a face"}
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              className="f4 pa2 w-70 center"
              type="tex"
              onChange={this.onInputChange}
            />
            <button
              onClick={this.onButtonSubmit}
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            >
              Detect
            </button>
          </div>
        </div>
        <div className="center">
          <FaceRecognition
            box={this.state.box}
            imageUrl={this.state.imageUrl}
            multiple={this.state.multiple}
          />
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;
