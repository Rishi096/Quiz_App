const userName = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
finalScore.innerText = mostRecentScore;


userName.addEventListener("keyup",() => {
    saveScoreBtn.disabled = !userName.value;

});

const saveHighScore = (e) => {
    e.preventDefault();
    const score = {
        score:mostRecentScore,
        name:userName.value
    };
    highScore.push(score);
    highScore.sort((a,b) => b.score - a.score);
    highScore.splice(8);

    localStorage.setItem('highScore',JSON.stringify(highScore));
    window.location.assign("/");
};
