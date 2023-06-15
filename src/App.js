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
    const housesPerSide = Math.floor(parseFloat(width)/parseFloat(frontage))
    
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
            height={height} setHeight={height=>setHeight(parseFloat(height) > 0 ? height : "40")}
            width={width} setWidth={width=>setWidth(parseFloat(width) > 0 ? width : "80")}
            streetWidth={streetWidth} setStreetWidth={streetWidth=>setStreetWidth(parseFloat(streetWidth) > 0 ? streetWidth : "5")}
            frontage={frontage} setFrontage={frontage=>setFrontage(parseFloat(frontage) > 0 ? frontage : "8")}
            housesPerSide={housesPerSide}
            peoplePerHouse={peoplePerHouse} setPeoplePerHouse={peoplePerHouse=>setPeoplePerHouse(parseFloat(peoplePerHouse) > 0 ? peoplePerHouse : "2.2")}
        />
    </div>
}

export default App;
