'use strict'

var gId = 0
var gImgs = createImgs()

function createImgs() {
    // categories: cat, cute, classic, israeli
    return [
        // keywords will include names of the meme, categories the meme belongs to and any other keywords which might help navigate the library
        createImg('src/img/cat-01.jpg', ['cat', 'sleepy', 'cute', 'animal']),
        createImg('src/img/willy-wonka.jpg', ['classic', 'willy wonka']),
        createImg('src/img/x-everywhere.jpg', ['classic', 'x everywhere', 'toy story']),
        createImg('src/img/004.jpg', ['dog', 'cute']),
        createImg('src/img/5.jpg', ['success', 'baby', 'classic']),
        createImg('src/img/12.jpg', ['israeli', 'chaim', 'hecht']),
        createImg('src/img/19.jpg', ['DJ Pauly D', 'classic']),
        createImg('src/img/Ancient-Aliens.jpg', ['aliens', 'classic']),
        createImg('src/img/img6.jpg', ['dog']),
        createImg('src/img/One-Does-Not-Simply.jpg', ['classic', 'one does not simply']),
        createImg('src/img/Oprah-You-Get-A.jpg', ['classic', 'you get', 'oprah']),
        createImg('src/img/patrick.jpg', ['classic', 'patrick stewart']),
        createImg('src/img/putin.jpg', ['putin']),
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