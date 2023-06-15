
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
                <input placeholder='block height' value={height} onChange={event => setHeight(event.target.value)} />
            </div>
            <div>
                <p>Block width: </p>
                <input placeholder='block width' value={width} onChange={event => setWidth(event.target.value)} />
            </div>
            <div>
                <p>Street width: </p>
                <input placeholder='street width' value={streetWidth} onChange={event => setStreetWidth(event.target.value)} />
            </div>
            <div>
                <p>House frontage: </p>
                <input placeholder='house frontage' value={frontage} onChange={event => setFrontage(event.target.value)} />
            </div>
            <div>
                <p>People per house: </p>
                <input placeholder='house frontage' value={peoplePerHouse} onChange={event => setPeoplePerHouse(event.target.value)} />
            </div>
            <div>
                <p>Percentage of total buildable lots used by housing: </p>
                <input placeholder='Residential building percentage' value={residentialArea} onChange={event => setResidentialArea(event.target.value)} />
            </div>
            <div>
                <p>Percentage of total neighborhood area used by parks: </p>
                <input placeholder='Park percentage' value={parkArea} onChange={event => setParkArea(event.target.value)} />
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
        <p>Population density: {densityKilos} people/km^2</p>
        <p>{densityKilos * 2.58998811} people/mile^2</p>
        <p>{densityKilos * 0.00404686} people/acre</p>
        <p>Average lot size: {frontage * height/2}</p>
    </div>
}

export default Planner