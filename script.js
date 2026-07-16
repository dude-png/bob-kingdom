let G = 250
let bob = document.getElementById("blub")
let platform = document.getElementById("platform")
let bobTop = 500
let bobLeft = 100
let platformBottom = 150
let platformLeft = 300
let size = bob.style.width
let isJumping = false
function drawPlatform() {
    platform.style.left = platformLeft+"px"
    platform.style.bottom = platformBottom+"px"
}
function effectBobWithG(){
    bobTop += G 
    bob.style.top = bobTop+"px"
    if(bobTop>window.innerHeight-152){
        G=0
        isJumping = false
    }
    else{G=10}
        platformcCollision(bobLeft, bobTop, bob.offsetWidth, bob.offsetHeight,
        platformLeft, platform.offsetTop, platform.offsetWidth, platform.offsetHeight)
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
function platformcCollision(bobLeft, bobTop, bobWidth, bobHeight,
    platformLeft, platformTop, platformWidth, platformHeight
){
    let bobRight = bobLeft+bobWidth
    let bobBottom = bobTop+bobHeight
    let platformRight = platformLeft+platformWidth
    let platformBottom = platformTop+platformHeight
    if (bobRight>platformLeft && bobLeft<platformRight && bobBottom<platformTop) {
        G=0
        bob.style.bottom = platformTop+"px"
    }    
}
drawPlatform()
setInterval(effectBobWithG,67)
// bobTop<platformBottom &&