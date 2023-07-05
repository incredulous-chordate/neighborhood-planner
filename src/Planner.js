
import { useState } from 'react';
import './Planner.css'

const Planner = ({
    height, setHeight,
    width, setWidth,
    streetWidth, setStreetWidth,
    frontage, setFrontage,
    housesPerSide,
    peoplePerHouse, setPeoplePerHouse
}) => {
    const [residentialArea, setResidentialArea] = useState(.9)
    const [parkArea, setParkArea] = useState(.1)
    return <div className='Planner'>
        <p>All units are assumed meters</p>
        <p>House residents are 1.8 meters tall</p>
        <div className='Inputs'>
            <div>
                <p>Block height: </p>
                <input placeholder='block height' text={height} onChange={event => setHeight(event.target.value)} defaultValue={"40"} />
            </div>
            <div>
                <p>Block width: </p>
                <input placeholder='block width' text={width} onChange={event => setWidth(event.target.value)} defaultValue={"80"} />
            </div>
            <div>
                <p>Street width: </p>
                <input placeholder='street width' text={streetWidth} onChange={event => setStreetWidth(event.target.value)} defaultValue={"5"} />
            </div>
            <div>
                <p>House frontage: </p>
                <input placeholder='house frontage' text={frontage} onChange={event => setFrontage(event.target.value)} defaultValue={"8"} />
            </div>
            <div>
                <p>People per house: </p>
                <input placeholder='people per house' text={peoplePerHouse} onChange={event => setPeoplePerHouse(event.target.value)} defaultValue={"2.2"} />
            </div>
            <div>
                <p>Portion of total buildable lots used by housing: </p>
                <input placeholder='Residential portion' text={residentialArea} onChange={event => setResidentialArea(event.target.value)} defaultValue={".9"} />
            </div>
            <div>
                <p>Portion of total neighborhood area used by parks: </p>
                <input placeholder='Park portion' text={parkArea} onChange={event => setParkArea(event.target.value)} defaultValue={".1"} />
            </div>
            
        </div>
        <Stats 
            height={parseFloat(height)} 
            width={parseFloat(width)} 
            streetWidth={parseFloat(streetWidth)}
            peoplePerHouse={parseFloat(peoplePerHouse)} 
            residentialPercentage={parseFloat(residentialArea)} 
            parkArea={parseFloat(parkArea)}
            housesPerSide={housesPerSide}
            frontage={frontage}
        />
    </div>
}

const Stats = ({
    height, 
    width, 
    streetWidth,
    peoplePerHouse, 
    residentialPercentage, 
    parkArea,
    housesPerSide,
    frontage
}) => {
    const blockArea = height * width
    const cityAreaPerBlock = (height + streetWidth/2)*(width + streetWidth/2)
    const constructionArea = blockArea/cityAreaPerBlock * (1-parkArea)
    const residentialArea = constructionArea * residentialPercentage
    const housesPerBlock = housesPerSide * 2
    const peoplePerBlock = peoplePerHouse * housesPerBlock

    const densityKilos = peoplePerBlock/cityAreaPerBlock * residentialArea * 1000000
    
    return <div className='Stats'>
        <p>Population density: {roundTo2(densityKilos)} people/km^2</p>
        <p>{roundTo2(densityKilos* 2.58998811) } people/mile^2</p>
        <p>{roundTo2(densityKilos* 0.00404686) } people/acre</p>
        <p>Average lot size: {frontage * height/2}</p>
    </div>
}

const roundTo2 = num => Math.round(num * 100) / 100

export default Planner
