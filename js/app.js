// Used this video for game instructions and understanding.
// https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
//https://github.com/bloom305/FEND-ArcadeGame/blob/master/js/app.js#L27
//https://github.com/imerx/Udacity-P3-Frogger-Arcade-Game/blob/master/js/app.js
//https://github.com/xorindy/frontend-nanodegree-arcade-game/blob/master/js/engine.js
//https://www.diigo.com/outliner/fj3m65/Udacity-Classic-Arcade-Game-Project-(project-%233)?key=al7ek43dms
//https://matthewcranford.com/arcade-game-walkthrough-part-3-creating-a-hero/

//update ()
//render ()
//checkCollision ()

//------
//enemy
// checkPace ()
//----
// player
//handleInput()
//checkVictory()

class Entity { // https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    //part of managing sprite position and limit it from going off screen // // https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
      update(dt) {
        this.isOffScreenX = this.x > 5;
        this.isOffScreenY = this.y < 1;
    }

    render() { //create sprite on the board
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 85);
    }

    checkCollisions(playerOrEnemy) {//check if player and bug collide https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
        if (this.y === playerOrEnemy.y) {
            if (this.x >= playerOrEnemy.x - 0.55 && this.x <= playerOrEnemy.x + 0.55) {
                return true;
            }
            else {
                return false;
            }
        }
    }

}
// Enemies our player must avoid// // https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
class Enemy extends Entity {
    constructor(x, y, speed) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        super.update();
        if(this.isOffScreenX){
            this.x = -1;
        }
        else {
            this.x += this.speed * dt;
        }
    }
}

//now write your own player class
class Player extends Entity { //place the player object in a variable called player
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.moving = false;
        this.win = false;
    }

    // player movements
    handleInput(input) { // https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
        switch (input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
                break;
            default:
                break;
        }
        this.moving = true; //player has moved,
    }

    // alert for when player wins
    update(dt) { // https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
        super.update();
        if (this.isOffScreenY && !this.moving && !this.win) {
            this.win = true;
            alert('Awesome job! You Won. Kids are out of the cave!!');
            restart();
        } else {
            this.win = false;
        }
    }

    render() {
        super.render();
        this.moving = false;
    }
}


function restart() { //game resets when over
    player.x = 2;
    player.y = 5;

    clearEnemies();
    spawnEnemies();
};
//below creates an array of 3 enemies followed by uncommenting all enemies line//// Place all enemy objects in an array called allEnemies
// written with help from https://github.com/xorindy/frontend-nanodegree-arcade-game/blob/master/js/app.js
//creating multiple Enemies by running through loop
let allEnemies = [];
spawnEnemies();
//creating multiple enemies by running through loop
function spawnEnemies() {
    //Create an array of enemies
    for (var i=0; i < 5; i++){
        var x = 0;
        var y = Math.floor((Math.random() * 4) + 1);
        var speed = Math.floor((Math.random() * 7) + 1);
        allEnemies.push(new Enemy(x, y, speed));
    }
};

//Clear the enemy array
function clearEnemies() {
    for (var i=0; i < 5; i++){
        allEnemies.pop();
    }
};

const player = new Player(); //player referenced in engine.js files
//  const allEnemies = [...Array(3).map(_,1)=>new Enemy(0,i+1));

// This listens for key presses and sends keys instructions
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//player.render() { //putting hero on screen //
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
//  }
//}

//var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
//    this.sprite = '/images/enemy-bug.png';
//};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};
