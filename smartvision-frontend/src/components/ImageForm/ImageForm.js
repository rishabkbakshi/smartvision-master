import React, { Component, Fragment } from 'react';
import './ImageForm.css';
// import { FilePond, File, registerPlugin } from 'react-filepond';
import '../../vendor/filepond.min.css';

import 'tachyons';

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

class ImageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Set initial files
            files: []
        };
    }

    handleInit = () => {
        console.log("File Pond initialised")
    }

    render() {
        return (
            <Fragment>
                <div className="image-input mh2 tc">
                    <p className='f5'>
                        {'Smart Vision will detect faces in your picture'}
                    </p>
                    <div className="center">
                        <div className="shadow-5 pv4 ph3 br3 form">
                        <input id="imageUrlInput" className='f5 pa2 w-60' type="text" onChange={this.props.onInputChange} />
                        <button className='w-40 ml-auto mr-auto grow f5 link ph2 pv2 dib white bg-dark-blue pointer' onClick={this.props.onButtonSubmit}> Detect </button>
                        </div>
                        {/* <FilePond ref={ref => this.pond = ref}
                            allowMultiple={false}
                            maxFiles={1}
                            // server="/"
                            oninit={() => this.handleInit()}
                            onupdatefiles={(fileItems) => {
                                // Set current file objects to this.state
                                console.log(this.props.appState);
                                fileItems.map(fileItem => {
                                    let base64string = getBase64(fileItem.file).then(data => {
                                        let inputs= this.props.appState.input;
                                        inputs.push(data);
                                        this.setState(Object.assign(this.props.appState, {input :  inputs}));
                                    });
                                })
                            }}>

                            {this.state.files.map(file => (
                                <File key={file} src={file} origin="local" />
                            ))}

                        </FilePond> */}

                    </div>
                </div>
            </Fragment>

        )
    }

}

export default ImageForm;