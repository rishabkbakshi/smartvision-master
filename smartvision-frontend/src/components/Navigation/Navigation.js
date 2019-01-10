import React from 'react';
import './Navigation.css'

import 'tachyons';
import Tilt from 'react-tilt';
import vision from '../../assets/img/vision.png';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="page-navigator" style={{ display: 'flex' }}>
                <div className="vision-logo">
                    <Tilt className="Tilt br2 pa2" options={{ max: 45 }} style={{ height: 75, width: 75 }} >
                        <div className="Tilt-inner pa1 white">
                            <img src={vision} alt="Vision"></img>
                        </div>
                    </Tilt>
                </div>
                <p className='f5 link dim underline pa2 pointer ml-auto' onClick={() => onRouteChange('signout')}>Sign Out</p>
            </nav>
        )
    }
    else{
        return (
            <nav className="page-navigator" style={{ display: 'flex' }}>
                <div className="vision-logo">
                    <Tilt className="Tilt br2 pa2" options={{ max: 45 }} style={{ height: 75, width: 75 }} >
                        <div className="Tilt-inner pa1 white">
                            <img src={vision} alt="Vision"></img>
                        </div>
                    </Tilt>
                </div>
                <p className='f5 link dim underline pa2 pointer ml-auto' onClick={() => onRouteChange('login')}>Sign In</p>
                <p className='f5 link dim underline pa2 pointer' onClick={() => onRouteChange('register')}>Register</p>
            </nav>
        )
    }
}

export default Navigation;