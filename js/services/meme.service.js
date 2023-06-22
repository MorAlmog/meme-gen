'use strict'

var gMeme = createMemeObj()

function createMemeObj() {
    return {
        selectedImgId: NaN,
        selectedLineIdx: 0,
        lines: [],
    }
}

function generateLines() {
    return [
        createLine('I have a particular set of skiils'),
        createLine('I am a Fullstack Developer'),
        createLine('מרגש')
    ]
}

function createLine(txt, colour = '#eeeeee', size = 20) {
    return {
        txt,
        size,
        colour
    }
}

function getMemeImgId() {
    return gMeme.selectedImgId
}

function setMemeImgId(id) {
    gMeme.selectedImgId = id
}

function getMemeLines() {
    return gMeme.lines
}

function getMemeText(lineIdx = 0) {
    if (!gMeme.lines.length || !gMeme.lines) return ''

    return gMeme.lines[lineIdx].txt
}

function setMemeText(txt, lineIdx = 0) {
    if (!gMeme.lines[lineIdx]) {
        gMeme.lines[lineIdx] = createLine(txt)
    }
    else gMeme.lines[lineIdx].txt = txt
}

function setMemeTextSize(size, lineIdx = 0) {
    gMeme.lines[lineIdx].size = size
}

function setMemeTextColour(colour, lineIdx = 0) {
    gMeme.lines[lineIdx].colour = colour
}