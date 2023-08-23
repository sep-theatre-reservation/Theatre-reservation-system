import React from 'react'

function CharacterIcon({title,subtitle,imgUrl}) {
    return (
        <div className="circular-image-container">
            <div className="circular-image">
                <img src={imgUrl} alt="Circular Image" />
            </div>
            <h6 className='mb-0'>{title}</h6>
            <p>{subtitle}</p>
        </div>
    )
}

export default CharacterIcon