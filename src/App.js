import logo from './logo.svg';
import './App.css';
import Block from './Block.js'
import Planner from './Planner';
import { useState } from 'react';
import Constants from './Constants';

const pixelsFromScale = scale =>
    metersStr => {
        return Math.round(parseFloat(metersStr) * scale)
    }

function App() {
    const [height, setHeight] = useState("40")
    const [width, setWidth] = useState("80")
    const [streetWidth, setStreetWidth] = useState("5")
    const [frontage, setFrontage] = useState("8")

    const [peoplePerHouse, setPeoplePerHouse] = useState(2.2)

    const scale = .8 * Math.min(
        Constants.canvasHeight / (parseFloat(height) + parseFloat(streetWidth)),
        Constants.canvasWidth / (parseFloat(width) + parseFloat(streetWidth))
    )
    const pixelsFromMeters = pixelsFromScale(scale)
    const housesPerSide = Math.floor(width/frontage)
    
    return <div className="App">
        <Block 
            height={pixelsFromMeters(height)} 
            width={pixelsFromMeters(width)} 
            streetWidth={pixelsFromMeters(streetWidth)} 
            frontage={pixelsFromMeters(frontage)}
            scale = {scale}
            housesPerSide={housesPerSide}
            peoplePerHouse={peoplePerHouse}
        />
        <Planner 
            height={height} setHeight={height=>setHeight(height)}
            width={width} setWidth={width=>setWidth(width)}
            streetWidth={streetWidth} setStreetWidth={streetWidth=>setStreetWidth(streetWidth)}
            frontage={frontage} setFrontage={frontage=>setFrontage(frontage)}
            housesPerSide={housesPerSide}
            peoplePerHouse={peoplePerHouse} setPeoplePerHouse={setPeoplePerHouse}
        />
    </div>
}

export default App;
