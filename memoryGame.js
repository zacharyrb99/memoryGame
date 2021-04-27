const cards = document.querySelectorAll('.card');

let isFlipped = false;
let stop = false;
let card1, card2;
let cardsFlipped = 0;


shuffle();
cards.forEach(function(card){
    card.addEventListener('click', flipCard)
});

function flipCard(){
    if(stop) return;
    if(this === card1) return;

    this.classList.add('flip');

    if(!isFlipped){
        isFlipped = true;
        card1 = this;
    }else{
        card2 = this;
    }
    matchCheck();
}

function matchCheck(){
        //do cards match based on data attribute in div
    if(card1.dataset.number === card2.dataset.number){
        //they match (have same data attribute numbers)
        lockCards();
    }else{
        //they don't match (have different data attribute numbers)
        resetCards();
}}

function lockCards(){
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    cardsFlipped += 2;
    reset();
}

function resetCards(){
    stop = true;

    setTimeout(()=>{
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        reset();
    }, 1000);
}

function reset(){
    isFlipped = false;
    stop = false;
    card1 = null;
    card2 = null;
    endGame();
}

function shuffle(){
    for(let card of cards){
        let randomOrder = Math.floor(Math.random()*16);
        card.style.order = randomOrder;
    }
}

function endGame(){
    if(cardsFlipped === 16){
        setTimeout(function(){alert("YOU WIN")}, 1500);
        setTimeout(function(){location.reload()}, 5000);
    }else{
        return;
    }
}