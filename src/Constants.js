const windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

const size = Math.min(windowHeight, windowWidth/2, 800)

const Constants = {
    canvasWidth: size,
    canvasHeight: size
}

export default Constants