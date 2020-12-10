'use strict'


var gCanvas;
var gCtx;
var gContureColor = 'black';
var gBgcColor = 'white';
var gChosenImgId
var gSelectedLine = 0
var gIsSelectionOn = false

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
}

function renderGallery() {
    var images = getImagesForDisplay();
    var strHtmls = images.map(function (img) {
        return `
            <img class="img-top" src=${img.url} onclick="onOpenCanvas(${img.id})">
        `
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function onOpenCanvas(imgIdx) {
    gChosenImgId = +imgIdx;
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.editor-container').classList.add('flex')
    renderCanvas();
}

function renderCanvas() {
    var meme = getMeme(gChosenImgId);
    var img = new Image();
    img.src = `img/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        meme.lines.forEach((line, idx) => {

            drawText(line.txt, line.size, line.align, line.x, line.y)
            if (idx === meme.selectedLineIdx && gIsSelectionOn) {
                drawRect(line.x - 10, line.y - line.size, ((line.size / 2) * line.txt.split("").length), (line.size + 10))
                renderInput(line.txt, idx)
            }
        }
        )
    }
}


function drawText(text, fontSize, align, x, y) {
    gCtx.strokeStyle = gContureColor;
    gCtx.fillStyle = gBgcColor;
    gCtx.font = `${fontSize}px Impact`;
    gCtx.textAlign = `${align}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.rect(x, y, width, height) // x,y,widht,height
    gCtx.stroke()

}

function renderInput(text, id){
    var elInput = document.querySelector('.user-input');
    elInput.value=text;
    elInput.setAttribute('data-lineId',`${id}`)

}
function onUpdateMemeText(el) {
    console.log(el)
    updateMemeText(el.value);
    renderCanvas();
}


function onChangeFontSize(diff) {
    changeMemeFontSize(diff)
    renderCanvas()
}


function onMoveLines(ev) {
    if (ev.offsetY >= ev.target.height / 2) {
        moveMemeText(10, gCanvas.height)
    } else moveMemeText(-10, gCanvas.height)
    renderCanvas()
}


function onAlign(el) {
    updateAlign(el.name);
    renderCanvas();
}


function onAddLine() {
    addLine();
    renderCanvas();
}

function onSwitchLine() {
    gIsSelectionOn = true
    updateSelectedLine(gSelectedLine);
    gSelectedLine++;
    renderCanvas();
}