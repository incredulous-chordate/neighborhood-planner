import React from 'react'
import useCanvas from './useCanvas'
import Constants from '../Constants'

const Canvas = ({ draw, ...rest }) => {  
  
  const canvasRef = useCanvas(draw)
  
  return <canvas ref={canvasRef} width={Constants.canvasWidth} height={Constants.canvasHeight} {...rest}/>
}

export default Canvas