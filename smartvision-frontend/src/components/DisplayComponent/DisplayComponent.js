import React from 'react';
import './DisplayComponent.css';

import 'tachyons';

const DisplayComponent = ({ imageUrl, faceBox }) => {
    console.log(faceBox)
    const renderedFaces = faceBox.map(face => {
        return <div className="bounding-box" key={face.face_id} style={{ top: face.topRow, left: face.leftCol, right: face.rightCol, bottom: face.bottomRow }}></div>
    })

    return (
        <div className="image-display mt4 mh4">
            <div className="relative mh2">
                <img id="inputImage" src={imageUrl} alt="" width='500px' height='auto' />
                {renderedFaces}
            </div>
        </div>
    )
}

export default DisplayComponent;