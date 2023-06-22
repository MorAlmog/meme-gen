'use strict'

function onGetImg(elImg, id) {
    setMemeImgId(id)
    toggleHidden('memes')
    clearCanvas()
    drawCanvas()
}

function renderGallery() {
    const imgs = getImages()
    console.log('imgs', imgs);
    let strHTML = imgs.reduce((acc, img) => {
        console.log('inside reduce img.id:', img);
        acc += `<div class="card">
        <img onclick="onGetImg(this, ${img.id})" src="${img.imgUrl}" class="card-img">
        </div>`
        return acc
    }, '')
    document.querySelector('.gallery-container').innerHTML = strHTML
}