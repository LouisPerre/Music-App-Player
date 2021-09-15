
const container = document.querySelector('.container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress')
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const cover = document.querySelector('#cover')
const fac = new FastAverageColor();
const body = document.querySelector('body')

//Song Titles
const songTitles = ['Astronaut in The Ocean', 'Rien de spécial']

//Song Artist
const songArtist = ['Masked Wolf', 'Népal']

//Keep track of songs
let songIndex = 0

//Song cover
const songCover = [
    'https://i.ibb.co/5YHMwg0/Astronaut-in-The-Ocean.jpg',
    'https://i.ibb.co/tZWbgQN/Rien-de-spe-cial.jpg'
]

//Initially load song info DOM
loadSong(songTitles[songIndex], songArtist[songIndex], songCover[songIndex])

//Update song details
function loadSong(songTitles, songArtist, songCover) {
    title.innerHTML = songTitles
    artist.innerHTML = songArtist
    audio.src = `music/${songTitles}.mp3`
    cover.src = `img/${songTitles}.jpg`
    artist.style.margin = "0.5% 0.5% 4% 0.5%"

    fac.getColorAsync(songCover)
        .then(color => {
            let averageColor = color
            console.log(Object.values(averageColor))
            const averageColorArray = Object.values(averageColor)
            console.log('colorBase', averageColorArray[3])
            console.log(Object.values(tinycolor(averageColorArray[3]))[0])
            var colorBase = Object.values(tinycolor(averageColorArray[3]))[0]
            var originalColor = tinycolor(averageColorArray[3])
            console.log('originalColor', originalColor)
            var newColor = originalColor.brighten(25).toString();
            console.log('newColor', newColor)
            // body.style.background = `linear-gradient(to bottom right, ${averageColorArray[3]}, ${newColor})`
            body.style.background = `linear-gradient(135deg, ${colorBase} 35%, ${newColor} 100%)`
        })
}



function playSong() {
    container.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    artist.style.margin = "0.5%"
    audio.play()
}

function pauseSong() {
    container.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    artist.style.margin = "0.5% 0.5% 4% 0.5%"
    audio.pause()
}

function prevSong() {
    songIndex--

    if (songIndex < 0 ) {
        songIndex = songTitles.length - 1
    }

    loadSong(songTitles[songIndex], songArtist[songIndex], songCover[songIndex])

    playSong()
}

function nextSong() {
    songIndex++

    if (songIndex > songTitles.length - 1) {
        songIndex = 0
    }

    loadSong(songTitles[songIndex], songArtist[songIndex], songCover[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const clickX = e.offsetX
    const width = this.clientWidth
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () => {
    const isPlaying = container.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Change song event
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)
