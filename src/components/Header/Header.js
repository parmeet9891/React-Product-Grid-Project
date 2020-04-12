import React from 'react';
import './header.css';

const Header = ({heading}) => {
    return (
        <div className = 'container-fluid top-container'>
                <div className = 'container'>
                <h3>{heading}</h3>
        
                <div className = 'row'>
                    <div className = 'col-md-6'>
                        <p className = 'text-center fs-30 mt-30'>Find the most innovative and </p>
                        <p className = 'text-center fs-30'>Cool Faces in low prices.</p>
                    </div>
        
                    <div className = 'col-md-6'>
                        <img src = './Images/bg-image.png' className = 'img-responsive mt-30' alt = 'background-ascii'/>
                    </div>            
        
                </div>
        
                </div>
            </div>
    )
}

export default Header;