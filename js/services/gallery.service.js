'use strict'

var gId = 0
var gImgs = createImgs()

function createImgs() {
    // categories: cat, cute, classic
    return [
        // keywords will include names of the meme, categories the meme belongs to and any other keywords which might help navigate the library
        createImg('src/img/cat-01.jpg', ['cat', 'sleepy', 'cute', 'animal']),
        createImg('src/img/willy-wonka.jpg', ['classic', 'willy wonka']),
        createImg('src/img/x-everywhere.jpg', ['classic', 'x everywhere', 'toy story'])
    ]
}

function createImg(imgUrl, keywords = []) {
    return {
        id: ++gId,
        imgUrl,
        keywords
    }
}

function getImages() {
    return gImgs
}

function getImgById(id) {
    return gImgs.find((img) => img.id === id)
}

function getImgKeysById(id) {
    return gImgs
}