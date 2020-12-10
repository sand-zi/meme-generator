'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
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

createMeme()

function createMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I am working',
                size: 30,
                align: 'center',
                color: 'red',
                x: 250,
                y: 50,
            }
        ]
    }
}

function getMeme(imgId) {
    gMeme.selectedImgId = imgId;
    var meme = gMeme;
    return meme;
}

function updateMemeText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function updateAlign(align) {
    switch (align) {
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].x = 350;
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].x = 250;
            break;
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].x = 100;
            break;
    }
}

function changeMemeFontSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size > 62) {
        gMeme.lines[gMeme.selectedLineIdx].size = 62
    }
    if (gMeme.lines[gMeme.selectedLineIdx].size < 12) {
        gMeme.lines[gMeme.selectedLineIdx].size = 12
    }

    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function addLine() {
    var newLine = createNewLine()
    gMeme.lines.push(newLine)
};

function createNewLine() {
    return {
        txt: 'Enter Your text Here',
        size: 30,
        align: 'center',
        color: 'red',
        x: 250,
        y: getVertPosition(),
    }
}

function getVertPosition() {
    if (gMeme.lines.length === 1) {
        return 420
    }

    if (gMeme.lines.length > 1) {
        return 250
    }
}
function moveMemeText(diff, maxHeight) {
    if (gMeme.lines[gMeme.selectedLineIdx].y > 0.95 * maxHeight) {
        gMeme.lines[gMeme.selectedLineIdx].y = 0.95 * maxHeight
    }
    if (gMeme.lines[gMeme.selectedLineIdx].y < 45) {
        gMeme.lines[gMeme.selectedLineIdx].y = 50
    }
    gMeme.lines[gMeme.selectedLineIdx].y += diff
}


// Gallery

function getImagesForDisplay() {
    var images = gImgs;
    return images;
}