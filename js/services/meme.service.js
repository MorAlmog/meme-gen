'use strict'

var gMeme = createMemeObj()
var gFonts = [
    'Impact', 'Suez', 'Infinity', 'Anton',
]
var gInit = false, gRemovedLine = NaN

function createMemeObj() {
    return {
        selectedImgId: NaN,
        selectedLineIdx: 0,
        align: 'center',
        font: 'Impact',
        lines: [createLine('', '#ffffff', '#000000', 'Impact', 36, 'center')],
    }
}

function generateLines() {
    return [
        createLine('I have a particular set of skiils'),
        createLine('I am a Fullstack Developer'),
        createLine('מרגש')
    ]
}

function createLine(txt, colour = '#ffffff', strokeColour = '#000000', font = 'Impact', size = 36, align = gMeme.align) {
    let idx
    if (!gInit) idx = 0
    else {
        idx = gRemovedLine === NaN ? gMeme.lines.length : gRemovedLine
    }
    let x = gInit ? _calculateAxisX(align) : 250
    const memeObj = {
        txt,
        size,
        colour,
        strokeColour,
        axis: {x: x, y: _calculateAxisY(idx)},
        area: undefined
    }
    // // if removedLine was just refilled and initialisition is done, find next removed line
    // if (!gInit && gRemovedLine === idx) getRemovedLine()
    // gMeme initialisation is complete
    gInit = true
    return memeObj
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

function getMemeSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function setMemeSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function addMeMeLine(txt, colour, strokeColour) {
    const line = createLine(txt, colour, strokeColour)

    const removedLineIdx = getRemovedLineIdx()
    if (isNaN(removedLineIdx)) {
        gMeme.lines.push(line)
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
    else {
        gMeme.lines[removedLineIdx] = line
        gMeme.selectedLineIdx = removedLineIdx
        gRemovedLine = getRemovedLineIdx()
    }

    gMeme.lines[gMeme.selectedLineIdx].axis.y = _calculateAxisY()
}

// calc next removed line, if there is none, gRemovedLine = NaN
function getRemovedLineIdx() {

    if (gMeme.lines.length === 0) return NaN

    let removedIdx = gMeme.lines.findIndex(line => line === 'empty')
    if (removedIdx === -1) removedIdx = NaN
    return removedIdx
}

function removeMemeLine(lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines.splice(lineIdx, 1, 'empty')
    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line !== 'empty')
    if (gMeme.selectedLineIdx === -1) {
        // init
        gMeme.lines = []
        gMeme.selectedLineIdx = 0
    }
    else {
        gRemovedLine = lineIdx
    }
}

function getMemeText(lineIdx = gMeme.selectedLineIdx) {
    if (!gMeme.lines.length || !gMeme.lines) return ''

    return gMeme.lines[lineIdx].txt
}

function setMemeText(txt, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].txt = txt
}

function setMemeTextSize(size, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].size = size
}

function getMemeTextSize(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].size
}

function setTextArea(x1, x2, y1, y2, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].area = {x1, x2, y1, y2}
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

function getMemeFont() {
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
    const axisX = _calculateAxisX(align)
    gMeme.lines.forEach(line => line.axis.x = axisX)
    // gMeme.lines.forEach(line => {
    //     calculateTextArea(line.txt)
    // })
}

function _calculateAxisX(align) {

    let x, space = 15
    
    switch (align) {
        case 'right':
            x = gCanvas.width - space
            break
        case 'left':
            x = space
            break
        case 'center':
            x = gCanvas.width / 2
    }
    
    return x
}

function _calculateAxisY(lineIdx = gMeme.selectedLineIdx) {
    let y
    const space = 50
    switch (lineIdx) {
        case 0:
            y = space
            break
        case 1:
            y = gCanvas.height - space/2
            break
        case 2:
            y = gCanvas.height / 2
            break
        default:
            y = gCanvas.height / 4
    }
    return y
}

function getMemeAxisX(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].axis.x
}

function getMemeAxisY(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].axis.y
}