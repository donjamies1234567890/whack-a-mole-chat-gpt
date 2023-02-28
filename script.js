let score = 0;
let holes = document.querySelectorAll('.hole');
let lastHole;
let timeUp = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    let index = Math.floor(Math.random() * holes.length);
    let hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    let time = randomTime(200, 1000);
    let hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    score = 0;
    timeUp = false;
    document.getElementById('score').textContent = 'Score: 0';
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    document.getElementById('score').textContent = 'Score: ' + score;
}

holes.forEach(hole => hole.addEventListener('click', bonk));