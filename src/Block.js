import React, { useRef, useEffect } from 'react'
import Canvas from './canvas/Canvas'
import Constants from './Constants'

const drawBlock = (ctx, height, width, streetWidth) =>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    //streets
    ctx.fillStyle = '#999999'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    const heightInset = Constants.canvasHeight/2 - height/2
    const widthInset = Constants.canvasWidth/2 - width/2

    //blocks
    ctx.fillStyle = '#25b231'
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            ctx.fillRect(j * (width + streetWidth) + widthInset, i * (height + streetWidth) + heightInset, width, height);
        }
    }
}

const drawHouses = (ctx, height, width, frontage, housesPerSide, peoplePerHouse, scale) =>{
    const error = width - housesPerSide * frontage
    const heightInset = Constants.canvasHeight/2 - height/2
    const widthInset = Constants.canvasWidth/2 - width/2 + error/2

    const basePeople = Math.floor(peoplePerHouse)
    const extraPersonRate = Math.round(1/(peoplePerHouse - basePeople))

    var h = 0
    for (let i = 0; i < housesPerSide; i++) {

        ctx.fillStyle = '#8c3412'
        ctx.fillRect(widthInset + 2 + i * frontage, heightInset + 5, frontage - 5, height/2 * .8)
        drawHousePeople(ctx, widthInset + 2 + i * frontage, heightInset + 5, basePeople + (h%extraPersonRate == 0 ? 1 : 0), scale)
        h++

        ctx.fillStyle = '#8c3412'
        ctx.fillRect(widthInset + 2 + i * frontage, heightInset + height - 5 - height/2 * .8, frontage - 5, height/2 * .8)
        drawHousePeople(ctx, widthInset + 2 + i * frontage, heightInset + height - 5 - height/2 * .8, basePeople + (h%extraPersonRate == 0 ? 1 : 0), scale)
        h++
    }
}

const drawHousePeople = (ctx, houseXInset, houseYInset, numPeople, scale, frontage) =>{
    for (let i = 0; i < numPeople; i++) {
        drawPerson(ctx, houseYInset + 5 + i*(1.8*scale + 5), houseXInset + 5, scale)
    }

}

const drawPerson = (ctx, yInset, xInset, scale) => {

    const bodySize = 1.8 * scale

    ctx.fillStyle = '#000000'
    //head
    ctx.fillRect(xInset, yInset, bodySize/4, bodySize/4)
    //torso
    ctx.fillRect(xInset + bodySize/4/2, yInset, 1, bodySize)
    //arms
    ctx.fillRect(xInset + bodySize/4/2 - bodySize/2/2, yInset + bodySize/2, bodySize/2, 1)
}



const Block = ({height, width, streetWidth, frontage, housesPerSide, peoplePerHouse, scale}) => {

    const draw = (ctx) => {
        drawBlock(ctx, height, width, streetWidth)
        drawHouses(ctx, height, width, frontage, housesPerSide, peoplePerHouse, scale)
    }
      
    return <Canvas draw={draw} />
}

export default Block