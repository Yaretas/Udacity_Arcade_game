// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        this.x = x;
        this.y = y + 55;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.step = 101;
        this.top = this.step * 5;
        this.initPos = -this.step;
    }
    // Update the enemy's position, required method for game
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < this.top) {
            this.x += this.speed * dt;
        }
        else
            // Reset pos to start
            this.x = this.initPos;
    }
    // Draw the enemy on the screen....
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


class Hero {
    // Constructor
    constructor () {
        this.sprite = 'images/char-horn-girl.png';
        this.step = 101;
        this.jump = 83;
        this.initX = this.step * 2;
        this.initY = (this.jump * 4) + 55;
        this.x = this.initX;
        this.y = this.initY;
        this.win = false;
    }
    // Draw hero sprite on current x and y Position
    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(){ // Update Player's position.
        for(let enemy of allEnemies) {
            if(this.y === enemy.y && (enemy.x + enemy.step > this.x && enemy.x < this.x + this.step/2)){
                this.reset();
            }
        }

        if(this.y === 55) {
            this.winner = true;
        }
    }

        
   /**
    * 
    *  @param {string} input - travel direction
    */
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if(this.y > 0) {
                    this.y -= this.jump;    
                }
                break;
            case 'right':
            if( this.x < this.step * 4) {
                this.x += this.step;
            }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }

    reset() { // Reset player to initial position.
        this.x = this.initX;
        this.y = this.initY;
    }
}

// Calling Player and Enemies........

const player = newFunction();
const enemyOne = new Enemy(-101, 0, 300);
const enemyTwo = new Enemy(-101, 83, 150);
const enemyThree = new Enemy((-101 * 4), 166, 150);
const enemyFour = new Enemy((-101 * 2.5), 0, 100);
const enemyFive = new Enemy(-101, 90, 100);
const allEnemies = [];
allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive);

// This listens for key presses and sends the keys to your

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function newFunction() {
    return new Hero();
}

