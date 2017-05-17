var
  scores = [0,0],
  roundScore = 0,
  activePlayer = 0,
  gamePlay = false;
  document.querySelector(`.player-0-panel`).classList.remove('active'),
  numOfGames = 0;

//document.querySelector('#current-' + activePlayer).textContent = dice;
// $('#current-0').textContent = dice;

//document.querySelector(`#current-${activePlayer}`).innerHTML = `<em> ${dice} </em>`;
// $(`#current-${activePlayer}`).innerHTML = `<em> ${dice} </em>`;

//var x = document.querySelector(`#score-${activePlayer}`).textContent;
// var x = $(`#score-${activePlayer}`).textContent;
// function removeDice(){
//   document.querySelector(`.dice`).style.display = 'none';
// }


// $(`.dice`).style.display = none;
var
  gameMechanics = {
    toggleActive : function(){
      document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    },
    removeDice : function(){
      document.querySelector(`#dice1`).style.display = 'none';
      // document.querySelector(`#dice2`).style.display = 'none';
    },
    getTotalScore : function(){
      return document.getElementById(`score-${activePlayer}`);
    },
    getCurrentScore : function(){
      return document.getElementById(`current-${activePlayer}`);
    },
    switchPlayers : function(){
      this.getCurrentScore.textContent = 0;
      roundScore = 0;
      this.toggleActive();
      activePlayer===0 ? activePlayer = 1 : activePlayer = 0;
      this.toggleActive();
    },
    setDice : function(){
      var
        dice1 = Math.floor(Math.random()*6)+1,
        // dice2 = Math.floor(Math.random()*6)+1,
        diceDOM1 = document.querySelector('#dice1');
        // diceDOM2 = document.querySelector('#dice2');

      diceDOM1.style.display = 'block';
      // diceDOM2.style.display = 'block';
      diceDOM1.src = `dice-${dice1}.png`;
      // diceDOM2.src = `dice-${dice2}.png`;
      // return [dice1, dice2];
      return dice1;
    },
    removeCurrentScore : function(){
      this.getCurrentScore().textContent = 0;
    },
    removeTotalScore : function(){
      this.getTotalScore().textContent = 0;
    },
    declareWinner : function(player){
      document.getElementById(`name-${player}`).textContent = `Player ${player+1} is the winner!`;
      document.querySelector(`.player-${player}-panel`).classList.add('winner');
      gamePlay=false;
    }
  };

gameMechanics.removeDice();

var newGame = function(){
  winScore = document.getElementById('winScore').elements[0].value;
  winScore === "" ? winScore = 100 : winScore = winScore;
  // elem = document.getElementById('win-score');
  // elem.parentNode.removeChild(elem);

  if (numOfGames>=1){
    var parent = document.getElementById("setWinScore");
    var child = document.querySelector('#setWinScore p');
    parent.removeChild(child);
  }

  var
    para = document.createElement("p"),
    node = document.createTextNode(`Set at ${winScore}`),
    parent = document.getElementById("setWinScore");
  para.appendChild(node);
  parent.appendChild(para);

  gameMechanics.removeDice();
  if (activePlayer === 1){
    gameMechanics.switchPlayers();
  }
  for(let i=0;i<2;i++){
    document.getElementById(`score-${i}`).textContent = '0';
    document.getElementById(`current-${i}`).textContent = '0';
    document.getElementById(`name-${i}`).textContent = `Player ${i+1}`;
    document.querySelector(`.player-${i}-panel`).classList.remove('winner');
    document.querySelector(`.player-${i}-panel`).classList.remove('active');
  }
  document.querySelector(`.player-0-panel`).classList.add('active');
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlay = true;
  numOfGames++;
}

//New Game button is clicked
document.querySelector('.btn-new').addEventListener('click', newGame);
// document.querySelector(function(){
//   document.querySelector('form').submit(function(){return false;});
// });

//Roll Dice button is clicked
document.querySelector('.btn-roll').addEventListener(`click`, function(){
  if (gamePlay){
    var
      currentScore = gameMechanics.getCurrentScore(),
      dice = gameMechanics.setDice();

    // if (dice[0]!==1 && dice[1]!==1){
    if (dice !== 1){
      // roundScore = roundScore + dice[0] + dice[1];
      roundScore = roundScore + dice;
      currentScore.textContent = roundScore;

    // } else if(dice[0]===1 && dice[1]===1){
    }else if(dice === 1) {
      // gameMechanics.removeTotalScore();
      gameMechanics.removeCurrentScore();
      gameMechanics.switchPlayers();
    } else {
      gameMechanics.removeCurrentScore();
      gameMechanics.switchPlayers();
    }
  }
});

//Hold button is clicked
document.querySelector('.btn-hold').addEventListener(`click`, function(){
  if(gamePlay){
    var
      totalScore = gameMechanics.getTotalScore(),
      currentScore = gameMechanics.getCurrentScore();

    totalScore.textContent = parseInt(totalScore.textContent)+ parseInt(currentScore.textContent);

    parseInt(totalScore.textContent)>=winScore ? gameMechanics.declareWinner(activePlayer) : ()=>{};

    gameMechanics.removeCurrentScore();
    gamePlay ? gameMechanics.switchPlayers() : gameMechanics.toggleActive();
    gameMechanics.removeDice();
  }
});
