'use strict'
const KEY_MEME = 'MEME'
const gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['man', 'president', 'mood'] },
{ id: 2, url: 'img/2.jpg', keywords: ['cute', 'dogs', 'babies'] },
{ id: 3, url: 'img/3.jpg', keywords: ['cute', 'dogs', 'babies'] },
{ id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat', 'code'] },
{ id: 5, url: 'img/5.jpg', keywords: ['strong', 'babies', 'mood'] },
{ id: 6, url: 'img/6.jpg', keywords: ['really', 'man', 'mood'] },
{ id: 7, url: 'img/7.jpg', keywords: ['really', 'babies', 'mood'] },
{ id: 8, url: 'img/8.jpg', keywords: ['really', 'man', 'mood'] },
{ id: 9, url: 'img/9.jpg', keywords: ['laugh', 'baby', 'mood'] },
{ id: 10, url: 'img/10.jpg', keywords: ['laugh', 'man', 'president'] },
];

var gMeme

function _createMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,

        lines: [
            {
                txt: 'Change me',
                size: 30,
                align: 'left',
                stroke: 'black',
                color: 'white',
                font: 'Impact',
                x: 200,
                y: 50,
            }
        ]
    }
    // saveMemeToLocalStorage();
}


function updateMemeWithID(imgId) {
    _createMeme()
    gMeme.selectedImgId = imgId;
    // return gMeme;
}

function getMeme() {
    return gMeme
}

function updateLineCoords(clickedLineIdx, newX, newY) {
    gMeme.selectedLineIdx = clickedLineIdx;
    gMeme.lines[gMeme.selectedLineIdx].x += newX;
    gMeme.lines[gMeme.selectedLineIdx].y += newY;
    // saveMemeToLocalStorage()
}

function updateMemeText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    // saveMemeToLocalStorage()
}

function changeMemeFontSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size > 62) {
        gMeme.lines[gMeme.selectedLineIdx].size = 62
    }
    else if (gMeme.lines[gMeme.selectedLineIdx].size < 12) {
        gMeme.lines[gMeme.selectedLineIdx].size = 12
    }

    gMeme.lines[gMeme.selectedLineIdx].size += diff
    // saveMemeToLocalStorage()
}

function moveMemeText(diff, maxHeight) {
    if (gMeme.lines[gMeme.selectedLineIdx].y > 0.95 * maxHeight) {
        gMeme.lines[gMeme.selectedLineIdx].y = 0.95 * maxHeight
    }
    if (gMeme.lines[gMeme.selectedLineIdx].y < 45) {
        gMeme.lines[gMeme.selectedLineIdx].y = 50
    }
    gMeme.lines[gMeme.selectedLineIdx].y += diff
    // saveMemeToLocalStorage()
}

function updateAlign(align, width) {
   
    switch (align) {
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].x = width/1.5;
            // saveMemeToLocalStorage()
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].x = width/3;
            // saveMemeToLocalStorage()
            break;
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].x = width/6;
            // saveMemeToLocalStorage()
            break;
    }
}

function addLine() {
    var newLine = createNewLine()
    gMeme.lines.push(newLine)
    // saveMemeToLocalStorage()
};

function createNewLine() {
    return {
        txt: 'Enter Your text Here',
        size: 30,
        align: 'left',
        stroke: 'black',
        color: 'white',
        font: 'Impact',
        x: 200,
        y: getVertPosition(),
    }
}

function getVertPosition() {
    if (!gMeme.lines.length) {
        return 50
    }

    else if (gMeme.lines.length === 1) {
        return 420
    }
    else {
        return 250
    }
}

function updateSelectedLine() {
    if (gMeme.lines.length === 1 || !gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
        return
    }
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++


    // saveMemeToLocalStorage()
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = (!gMeme.lines.length) ? 0 : gMeme.lines.length - 1
    // saveMemeToLocalStorage()
}

function setLineStroke(stroke) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke;
    // saveMemeToLocalStorage()
}

function setTextColorFill(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    // saveMemeToLocalStorage()
}

function setFont(font) {
    gMeme.lines.map(line => line.font = font)
    // saveMemeToLocalStorage()
}

function removegMeme() {
    localStorage.clear()
}

function saveMemeToLocalStorage() {
    saveToStorage(KEY_MEME, gMeme);
}
// Gallery

function getImagesForDisplay() {
    var images = gImgs;
    return images;
}