'use strict'

function renderFontSelection() {
    const fonts = getFontsObj()
    let strHTML = fonts.reduce((acc, font) => {
        acc += `<option>${font}</option>`
        return acc
    }, '')
    document.querySelector('.font-selection').innerHTML = strHTML
}

function onAddLine() {
    const colour = document.querySelector('.inner-text-colour').value
    const strokeColour = document.querySelector('.stroke-text-colour').value
    const txt = 'New Line'
    addMeMeLine(txt, colour, strokeColour)
}

function onSetTextColour(colour) {
    setMemeTextColour(colour)
    drawCanvas()
}

function onSetTextStrokeColour(colour) {
    setMemeTextStrokeColour(colour)
    drawCanvas()
}

function onChangeTextSize(change) {
    const textSize = getMemeTextSize()
    setMemeTextSize(textSize + change)
    drawCanvas()
}

function onSetAlignText(align) {
    console.log('align:', align);
    setMemeTextAlign(align)
    drawCanvas()
}

function onSetFont(font) {
    console.log('new font', font);
    setMemeFont(font)
    console.log(getMemeFont());
    if (getMemeImgId() || getMemeLines().length) drawCanvas()
}