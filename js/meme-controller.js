'use strict'


var gCanvas;
var gCtx;
var gContureColor = 'black';
var gBgcColor = 'white';
var gChosenImgId
var isDownLoadOn = false
var gIsMouseDown = false

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
}

// Gallery
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

//  Canvas
function renderCanvas() {
    var meme = getMemeByImgId(gChosenImgId);
    var img = new Image();
    img.src = `img/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        meme.lines.forEach((line, idx) => {

            drawText(line.txt, line.size, line.align, line.x, line.y, line.color, line.stroke, line.font)
            if (idx === meme.selectedLineIdx) {

                if (!isDownLoadOn) { drawRect(line.x, line.y - line.size, (line.size + 10), line.txt) }
                renderInput(line.txt, idx)
            }

        }
        )
    }

}


function drawText(text, fontSize, align, x, y, color, stroke, font) {
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = color;
    gCtx.font = `${fontSize}px ${font}`;
    gCtx.textAlign = `${align}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}

function drawRect(x, y, height, text) {
    var textLength = gCtx.measureText(text).width
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.rect(x, y, textLength, height) // x,y,widht,height
    gCtx.stroke();
}

function canvasClicked(ev) {
    var meme = getMeme();
    var { offsetX, offsetY } = ev;
    var { movementX, movementY } = ev;
    var clickedLineIdx = meme.lines.findIndex(line => {
        return offsetX >= line.x && offsetX <= line.x + gCtx.measureText(line.txt).width
            && offsetY >= line.y - line.size && offsetY < line.y + 10
    })

    if (clickedLineIdx!==-1 && gIsMouseDown) {
        updateLineCoords(clickedLineIdx, movementX, movementY)
        renderCanvas();
    } else return
}

function setMouseState(state) {
    gIsMouseDown = state
}

function renderInput(text, id) {
    var elInput = document.querySelector('.user-input');
    elInput.value = text;
    elInput.setAttribute('data-lineid', `${id}`)

}
function onUpdateMemeText(el) {
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
    updateSelectedLine();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();

}

function onSetStrokeColor(value) {
    setLineStroke(value)
    renderCanvas();
}

function onSetTextColor(value) {
    setTextColorFill(value)
    renderCanvas();
}

function onSetFont(value) {
    setFont(value)
    renderCanvas();
}


// Share

// on submit call to this function
function onDownloadImg() {
    isDownLoadOn = true;
    renderCanvas();
    setTimeout(downloadImg, 1000)
}

function downloadImg() {
    var elLink = document.querySelector('.link-sharing');
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
    elLink.click()
    isDownLoadOn=false
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    isDownLoadOn = true;
    renderCanvas()
    setTimeout(function () {
        document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");
        function onSuccess(uploadedImgUrl) {
            uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
            document.querySelector('.share-container').innerHTML = `
        <a class="btn-sharing" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
        }

        doUploadImg(elForm, onSuccess);
    }, 3000)

}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}