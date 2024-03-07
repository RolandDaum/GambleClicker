const buttonElement = document.getElementById('button_top')
const scoreElement = document.getElementById('button_count')
const highscoreElement = document.getElementById('highscore')
const percbarElement = document.getElementById('percbar')
const audioClick = document.getElementById('audio_click')
const divbarElement = document.getElementById('div_bar')
const graphBars = document.querySelectorAll('.bar')
let score = 0;
let highscore
let scoreArray

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorage()
    drawBars()
    document.addEventListener('contextmenu', (event) => {event.preventDefault();});

    // buttonElement.addEventListener('transitionend', () => {
    //     buttonTop.classList.remove('active'); // Entferne die Klasse 'active' nach Abschluss der Transition
    // });
    // buttonElement.addEventListener('click', () => {
    //     buttonTop.classList.add('active'); // Füge die Klasse 'active' hinzu, wenn das Element geklickt wird
    // });

    buttonElement.addEventListener('click', () => {
        audioClick.currentTime = 0;
        audioClick.play()
        let randomeNum = Math.random()*100
        if (randomeNum < score) {
            // Neuer Highscore?
            if (score > localStorage.getItem('heighscore')) {
                localStorage.setItem('heighscore', score)
                highscore = score;
            }

            // increade score in Array and save Array
            scoreArray[score] = scoreArray[score]++ +1;
            localStorage.setItem('scoreArray', JSON.stringify(scoreArray))

            score = 0;
            highscoreElement.innerHTML = highscore + '%';
        } else {
            score++
        }
        drawBars()
        percbarElement.style.background = `linear-gradient(90deg, var(--blassgreen) 0%, var(--blassgreen) ${100-score}%, var(--blassred) ${100-score+0.2}%, var(--blassred) 100%)`
        scoreElement.innerHTML = score + '%';
    })
})

function loadLocalStorage() {
    highscore = localStorage.getItem('heighscore')
    if (highscore == null) {localStorage.setItem('heighscore', 0)}
    highscore = localStorage.getItem('heighscore')
    highscoreElement.innerHTML = highscore + '%';

    scoreArray = localStorage.getItem('scoreArray')
    if (scoreArray == null) {localStorage.setItem('scoreArray', JSON.stringify(new Array(100).fill(0)))}
    scoreArray = JSON.parse(localStorage.getItem('scoreArray'))

}

function drawBars() {
    let heighestValInx = 0
    for (let i = 0; i < scoreArray.length; i++) {
        if (scoreArray[i] > scoreArray[heighestValInx]) {
            heighestValInx = i
        }
    }
    for (let i = 0; i < graphBars.length; i++) {
        graphBars[i].style.height = 100/scoreArray[heighestValInx]*scoreArray[i]+1 + '%'
    }
}