'use strict'

let gCtx, gCanvas
let gCurrShown = 'memes'

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
}

function toggleHidden(sectionId) {
    document.getElementById(sectionId).classList.toggle('hidden')
    document.getElementById(gCurrShown).classList.toggle('hidden')
    gCurrShown = sectionId
    console.log(gCurrShown);
}

function onGetText(txt) {
    console.log('OnGetText');
    setMemeText(txt)
    clearCanvas()
    drawCanvas()
    // gCtx.lineWidth = 2
    // // gCtx.strokeStyle = 'brown'
    // // gCtx.fillStyle = 'black'
    // gCtx.font = '40px Roboto bold'
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'

    // gCtx.fillText(getMemeText(), 150, 150) // Draws (fills) a given text at the given (x, y) position.
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawCanvas() {
    const success = drawImage()
    if (!success) drawText() 
}

// returns true if drawing was succeful and false if an issue accured
// failure accures when no image was chosen, or when image failed to load
function drawImage() {
    const imgId = getMemeImgId()
    if (imgId) {
        let elImg = new Image()
        const img = getImgById(imgId)
        elImg.src = img.imgUrl
        console.log(elImg.src);
        elImg.onload = () => {
            gCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gCanvas.width
            gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
            drawText()
            return true
        }
        return false
    }
    return false
}

function drawText() {
    const space = 50
    gCtx.font = '48px Impact'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = 2
    let txt = getMemeText()
    gCtx.textAlign = 'center'
    let x = gCanvas.width / 2
    // let y = 50
    let y = gCanvas.height / 2
    console.log('size of canvas:', x, y);
    // gCtx.fillText(txt, x, y)
    // gCtx.strokeText(txt, x, y)
    // gCtx.fillText(txt, x, gCanvas.height - space/2)
    // gCtx.strokeText(txt, x, gCanvas.height - space/2)
    gCtx.fillText(txt, x, space)
    gCtx.strokeText(txt, x, space)
}


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme-review(clap-clap)'
}

// function drawText(x, y, text= 'Hello!') {
//     console.log('Draw Text');
//     gCtx.lineWidth = 2
//     // gCtx.strokeStyle = 'brown'
//     // gCtx.fillStyle = 'black'
//     gCtx.font = '40px Roboto bold'
//     gCtx.textAlign = 'center'
//     gCtx.textBaseline = 'middle'

//     gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
//     gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
// }

// function drawImage() {
//     const imgId = getMemeImgId()
//     if (imgId) {
//         let elImg = new Image()
//         const img = getImgById(imgId)
//         elImg.src = img.imgUrl
//         // console.log('img height', elImg.naturalHeight, 'img width' , elImg.naturalWidth);
//         // console.log('canvas height', gCanvas.height, 'canvas width', gCanvas.width);
//         elImg.onload = () => {
//             gCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gCanvas.width
//             gCtx.drawImage(elImg, 0, 0)
//             drawText()
//             return true
//         }
//         return false
//     }
//     return false
// }