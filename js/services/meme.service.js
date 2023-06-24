'use strict'

var gMeme = createMemeObj()
var gFonts = [
    'Impact', 'Suez', 'Infinity', 'Anton',
]

function createMemeObj() {
    return {
        selectedImgId: NaN,
        selectedLineIdx: 0,
        lines: [],
        align: 'center',
        font: 'Impact'
    }
}

function generateLines() {
    return [
        createLine('I have a particular set of skiils'),
        createLine('I am a Fullstack Developer'),
        createLine('מרגש')
    ]
}

function createLine(txt, colour = '#ffffff', strokeColour = '#000000', font = 'Impact', size = 36) {
    return {
        txt,
        size,
        colour,
        strokeColour,
        area: undefined
    }
}

function getFontsObj() {
    return gFonts
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

function addMeMeLine(txt, colour, strokeColour) {
    const line = createLine(txt, colour, strokeColour)
    gMeme.lines.push(line)
    gMeme.selectedLineIdx++
}

function getMemeText(lineIdx = gMeme.selectedLineIdx) {
    if (!gMeme.lines.length || !gMeme.lines) return ''

    return gMeme.lines[lineIdx].txt
}

function setMemeText(txt, lineIdx = gMeme.selectedLineIdx) {
    if (!gMeme.lines[lineIdx]) {
        gMeme.lines[lineIdx] = createLine(txt)
    }
    else gMeme.lines[lineIdx].txt = txt
}

function setMemeTextSize(size, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].size = size
}

function getMemeTextSize(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].size
}

function setTextArea(x1, x2, y1, y2, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].area = [x1, x2, y1, y2]
}

function getTextArea(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].area
}

function getMemeTextColour(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].colour
}

function setMemeTextColour(colour, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].colour = colour
}

function getMemeTextStrokeColour(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].strokeColour
}

function setMemeTextStrokeColour(colour, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].strokeColour = colour
}

function getMemeFont(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.font
}

function setMemeFont(font, lineIdx = gMeme.selectedLineIdx) {
    gMeme.font = font
}

function getMemeTextAlign() {
    return gMeme.align
}

function setMemeTextAlign(align) {
    gMeme.align = align
}