'use strict'

let gCtx, gCanvas
let gCurrShown = 'gallery'

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    renderFontSelection()
}

function renderMemeButtons() {
    let symbol = org.apache.commons.text.StringEscapeUtils.unescapeJava( "\\" + "u2764" + "\\" + "uFE0F" )
    document.querySelector('.text-align-left').innerText = 'symbol'
}

function toggleHidden(sectionId) {
    document.getElementById(sectionId).classList.toggle('hidden')
    document.getElementById(gCurrShown).classList.toggle('hidden')
    gCurrShown = sectionId
    console.log(gCurrShown);
}

function onGetText(txt) {
    setMemeText(txt)
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
    
    setTextPreferences()
    const space = 50
    let txt = getMemeText()
    let x = calculateAxisX()
    let y = gCanvas.height / 2
    console.log('size of canvas:', x, y);
    gCtx.fillText(txt, x, space)
    gCtx.strokeText(txt, x, space)
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme-review(clap-clap)'
}

function setTextPreferences() {
    gCtx.font = `${getMemeTextSize()}px ${getMemeFont()}`
    gCtx.strokeStyle = getMemeTextStrokeColour()
    gCtx.fillStyle = getMemeTextColour()
    gCtx.lineWidth = 2
    gCtx.textAlign = getMemeTextAlign()

}

function calculateAxisX() {
    let x, space = 15
    
    switch (gCtx.textAlign) {
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