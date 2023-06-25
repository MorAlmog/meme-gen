'use strict'

let gCtx, gCanvas
let gCurrShown = 'gallery'

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    renderFontSelection()
    gCanvas.addEventListener('click', onCanvasSelection)
}

function toggleHidden(sectionId) {
    document.getElementById(sectionId).classList.toggle('hidden')
    document.getElementById(gCurrShown).classList.toggle('hidden')
    gCurrShown = sectionId
}

function onGetText(txt) {
    const lines = getMemeLines()
    if (!lines.length) onAddLine() 
    setMemeText(txt)
    calculateTextArea(txt)
    drawCanvas()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawCanvas() {
    const success = drawImage()
    if (!success && getMemeLines().length) drawText() 
}

// returns true if drawing was succeful and false if an issue accured
// failure accures when no image was chosen, or when image failed to load
function drawImage() {
    const imgId = getMemeImgId()

    if (imgId) {
        let elImg = new Image()
        const img = getImgById(imgId)
        elImg.src = img.imgUrl

        elImg.onload = () => {

            // scale canvas
            gCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gCanvas.width
            // draw image
            gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

            // if there is no text input, return
            if (!getMemeLines().length) return true

            // if there is, draw user's input and return
            drawText()
            return true

        }

    }

    // if no image or failure during onload, return indication
    return false
}

function drawText() {
    if (!getMemeImgId()) clearCanvas()

    const lines = getMemeLines()
    let lineIdx = getMemeSelectedLineIdx()
    if (isNaN(lineIdx)) lineIdx = lines.findIndex(line => line !== 'empty')
    setTextPreferences(lineIdx)

    for (let i = 0 ; i < lines.length ; i++) {
        if (lines[i] === 'empty') continue

        let txt = getMemeText(i)
        let x = getMemeAxisX(i)
        let y = getMemeAxisY(i)
        gCtx.fillText(txt, x, y)
        gCtx.strokeText(txt, x, y)
    }
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme-review(clap-clap)'
}

function setTextPreferences(lineIdx) {
    gCtx.font = `${getMemeTextSize(lineIdx)}px ${getMemeFont()}`
    gCtx.strokeStyle = getMemeTextStrokeColour(lineIdx)
    gCtx.fillStyle = getMemeTextColour(lineIdx)
    gCtx.lineWidth = 2
    gCtx.textAlign = getMemeTextAlign(lineIdx)

}

function calculateAxisY(idx) {
    let y
    const space = 50
    switch (idx) {
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

function calculateTextArea(txt) {
    const metrics = gCtx.measureText(txt)
    let x = getMemeAxisX()
    let y = getMemeAxisY()
    let x1, x2, y1, y2
    x1 = x - metrics.actualBoundingBoxLeft
    x2 = x + metrics.actualBoundingBoxRight
    y1 = y - (metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent)
    y2 = y
    setTextArea(x1, x2, y1, y2)
}

/////////////// EVENT LISTENERES ////////////////

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onCanvasSelection(ev) {
    const {x, y} = getEvPos(ev)
    const lines = getMemeLines()
    const selectedLineIdx = lines.findIndex(line => {
        if (line === 'empty') return false
        else return isInsideArea(x, y, line.area)  
    })
    if (selectedLineIdx === -1) return 
    setMemeSelectedLineIdx(selectedLineIdx)
    const txt = getMemeText(selectedLineIdx)
    document.querySelector('.text-input').value = txt
}

// fits for rectangles only
function isInsideArea(x, y, rect) {
    
    if (rect.x1 <= x && x <= rect.x2 && 
        rect.y1 <= y && y <= rect.y2) {
            
            return true

        } 
    
    return false
}

function getEvPos(ev) {

    let pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }

    // mobile and tablet support
    if (TOUCH_EVS.includes(ev.type)) {
      // Prevent triggering the mouse ev
      ev.preventDefault()
      // Gets the first touch point
      ev = ev.changedTouches[0]
      // Calc the right pos according to the touch screen
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }
    }
    return pos
  }