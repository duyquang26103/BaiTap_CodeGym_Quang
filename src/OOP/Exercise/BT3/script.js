class Hero {
    constructor(image, top, left, size) {
        this.image = image;
        this.top = top;
        this.left = left;
        this.size = size;
    }


    getHeroElement() {
        return '<img width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;" />';
    }

    moveRight() {
        this.left += yDistance;
    }

    moveLeft() {
        this.left -= 20;
    }

}

let hero1 = new Hero('dragon.jpg', 220, 230, 200);

let yDistance1 = 20;

function start1() {
    let isTouchLeft1 = hero1.left > window.innerWidth - hero1.size;
    let isTouchRigth1 = hero1.left < 1;

    if (isTouchLeft1 || isTouchRigth1) {
        yDistance1 = -yDistance1;
        console.log(yDistance1);
    }

    hero1.left += yDistance1;
    console.log('ok: ' + hero1.getHeroElement());
    document.getElementById('game').innerHTML = hero1.getHeroElement();

}

setInterval(start1, 10);
