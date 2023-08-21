import React from 'react'
import { Card } from 'react-bootstrap'

function MovieImageCard({ className,size }) {
    return (
        <Card style={{  width: `${size || 18}rem`}} className={className}>
            <Card.Img
                variant=""
                src="https://lk-aps.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/oppenheimer-et00004979-23-06-2023-02-14-08.jpg"
                alt="Movie Poster"
            />
        </Card>
    )
}

export default MovieImageCard