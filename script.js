let G = 250
let bob = document.getElementById("blub")
let floor = document.getElementById("floor")
let game = document.getElementById("game")
let coin = document.getElementById("coin")
let scoreDisplay = document.getElementById("score")
let score = 0
let bobTop = 500
let bobLeft = 100
let platformBottom = 150
let platformLeft = 300
let size = bob.style.width
let isJumping = false
const platforms = [
    {
        x: 300,
        y: 700
    }, 
    {
        x: 350,
        y: 600
    },
    {
        x: 400,
        y: 500
    } 
]


const coins = [
    {
        x: 300,
        y: 710
    }, 
    {
        x: 350,
        y: 610
    },
    {
        x: 400,
        y: 510
    } 
]
for (let index = 0; index < platforms.length; index++) {
    const element = platforms[index];
    let platform = document.createElement('div')
    platform.className = "platform"
    platform.style.left = platforms[index].x+"px"
    platform.style.top = platforms[index].y+"px"
    game.appendChild(platform)
    platforms[index].element = platform
}
for (let index = 0; index < coins.length; index++) {
    const element = coins[index];
    let coin = document.createElement('div')
    coin.innerHTML = "🪙"
    coin.className = "coin"
    coin.style.left = coins[index].x+"px"
    coin.style.top = coins[index].y+"px"
    game.appendChild(coin)
    coins[index].element = coin
}

function effectBobWithG(){
    bobTop += G 
    bob.style.top = bobTop+"px"
    if(bobTop+bob.offsetHeight>floor.offsetTop){
        G=0
        isJumping = false
    }
    else{G=10}
    for (let index = 0; index < platforms.length; index++) {
        const platform = platforms[index].element;
         platformcCollision(bobLeft, bobTop, bob.offsetWidth, bob.offsetHeight,
        platform.offsetLeft, platform.offsetTop, platform.offsetWidth, platform.offsetHeight)
    }
    // if(collectCoin(bob,coin)){
    //     coin.style.display = "none"
    //     score++
    //     scoreDisplay.innerHTML = `score:${score}`
    // }
}
document.addEventListener("keydown",(e)=>{
    if(e.key == "ArrowRight"){
        moveRight()
    }
    if (e.key == "ArrowUp") {
       jump()
       isJumping=true
    }
    if(e.key == "ArrowLeft"){
        moveLeft()
    }  
    if (e.key == "ArrowUp" && "ArrowRight") {
        moveDiagonalRight()
    }
    if (e.key == "ArrowUp" && "ArrowLeft") {
        moveDiagonalLeft()
    }       
})
function bobOffScreen(){
    if (bobLeft > window.innerWidth) {
        bobLeft = 0 
    }
    if (bobLeft < 0) {
        bobLeft = window.innerWidth
    }
    console.log(bobLeft)
}
function moveRight(){
    bobLeft+=10
    bobOffScreen()
    bob.style.left = bobLeft+"px"
}
function jump() {
    if(!isJumping){
        bobTop -= 120
        bob.style.top = bobTop+"px"
    }
}
function moveLeft(){
    bobLeft-=10
    bobOffScreen()
    bob.style.left = bobLeft+"px"
}
function moveDiagonalRight() {
    moveRight()
    jump()
}
function moveDiagonalLeft() {
    moveLeft()
    jump()
}
function platformcCollision(bobLeft, bobTop, bobWidth, bobHeight,
    platformLeft, platformTop, platformWidth, platformHeight
){
    let bobRight = bobLeft+bobWidth
    let bobBottom = bobTop+bobHeight
    let platformRight = platformLeft+platformWidth
    let platformBottom = platformTop+platformHeight
    if (bobRight>platformLeft && bobLeft<platformRight && 
        bobBottom>=platformTop && bobTop<platformTop) {
        G=0
        bob.style.top = platformTop-bobHeight+"px"
        isJumping=false
    } 
    console.log(platformTop)   
}

function collectCoin(coin, bob){
    let coinSides = {
        top: coin.offsetTop,
        bottom: coin.offsetTop+coin.offsetHeight,
        left: coin.offsetLeft,
        right: coin.offsetLeft+coin.offsetWidth
    }
    let bobSides = {
        top: bob.offsetTop,
        bottom: bob.offsetTop+bob.offsetHeight,
        left: bob.offsetLeft,
        right: bob.offsetLeft+bob.offsetWidth
    }
    if(bobSides.right > coinSides.left && 
        bobSides.top < coinSides.bottom &&
        bobSides.left < coinSides.right &&
        bobSides.bottom > coinSides.top
    ){
        console.log("bog")
        return true
    }
}
setInterval(effectBobWithG, 67)
