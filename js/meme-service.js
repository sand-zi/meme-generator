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



var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function createMeme() {
    return {

        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I never eat Falafel',
                size: 20,
                align: 'left',
                color: 'red'
            }
        ]

    }
}