'use strict'


var gCanvas;
var gCtx;
var gCurrShape = 'triangle'
var gContureColor = '#ff0000'
var gBgcColor = '#ff0000'
var gIsMouseDown = false

function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.closePath()
    gCtx.strokeStyle = gContureColor
    gCtx.stroke()

}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(130, 330)
    gCtx.lineTo(50, 370)
    gCtx.closePath() //insted of lineTo(x,y) 
    gCtx.strokeStyle = gContureColor
    gCtx.stroke()
    gCtx.fillStyle = gBgcColor
    gCtx.fill()
}

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.strokeStyle = gContureColor
    gCtx.rect(x, y, width, height) // x,y,widht,height
    gCtx.stroke()
    gCtx.fillStyle = gBgcColor
    gCtx.fillRect(x, y, width, height)
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = gContureColor
    gCtx.lineWidth = '1'
    gCtx.arc(x, y, 60, 0, 2 * Math.PI); // x,y,r,sAngle,eAngle
    gCtx.stroke();
    gCtx.fillStyle = gBgcColor
    gCtx.fill()

}

function draw(ev) {
    if (!gIsMouseDown) return
    // console.log(ev.movementX)
    // console.log(ev.movementY)
    console.log(ev.offsetX + ev.movementX)
    console.log(ev.offsetY + ev.movementY)
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    const nextMoveX = ev.offsetX + ev.movementX
    const nextMoveY = ev.offsetY + ev.movementY
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY, ev.movementX, ev.movementY)
            break;
        case 'arc':
            drawArc(offsetX, offsetY)
            break;
        case 'line':
            drawLine(offsetX, offsetY)
            break;
    }
}

function clearCanvas() {
    if (confirm('Are you sure?')) {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    }
}

function setBgcColor(bgcColor) {
    gBgcColor = bgcColor
}

function setContureColor(contureColor) {
    gContureColor = contureColor
}

function setShape(shape) {
    gCurrShape = shape
}

function setMouseState(isDown) {
    gIsMouseDown = isDown

}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    console.log(data)
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    console.log(elContainer.offsetWidth)
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}
