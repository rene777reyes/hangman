document.querySelector("#submit").addEventListener("click",analyze);
document.querySelector("#reset").addEventListener("click",initializeGame);
let wins = localStorage.getItem("total_wins");
let losses = localStorage.getItem("total_losses");
let triesLeft;
let word;
let blankSpaces;
initializeGame();

function initializeGame(){
    document.querySelector("#blankSpaces").innerHTML = "";
    document.querySelector("#guess").value = "";
    document.querySelector("#congratsImg").innerHTML = "";
    document.querySelector("#congrats").innerHTML = "";
    document.querySelector("#feedback").innerHTML = "";
    document.querySelector("#triesLeft").innerHTML = "";
    if (wins > 0){
        document.querySelector("#totalWins").innerHTML = `total wins: ${wins}`;
        
    } else {
        document.querySelector("#totalWins").innerHTML = "";
    }

    if (losses > 0){
        document.querySelector("#totalLosses").innerHTML = `total losses: ${losses}`;
    } else {
        document.querySelector("#totalLosses").innerHTML = "";
    }

    triesLeft = 15;
    word = generateWord();
    score = 0;
    blankSpaces = new Array(word.length).fill("_");
    for (let i=0; i < word.length; i++){
        document.querySelector("#blankSpaces").innerHTML += blankSpaces[i] + " ";
    }
    console.log(word);
    document.querySelector("#submit").style.display = "inline";
    document.querySelector("#reset").style.display = "none";
}

function generateWord(){
    
    let wordList = ["Twilight", "Dracula", "Nosferatu", "It", "Inception", "Gladiator", 
        "Titanic", "Avatar", "Frozen", "Coco", "Joker", "Up", "Moana", "Interstellar", 
        "Memento", "Brave", "Cars", "Dune", "Scarface", "Alien", "Goodfellas", "Garfield", 
        "Amadeus", "Troy", "Parasite", "Rocky", "Vertigo", "Psycho", "Casablanca", "Zootopia", 
        "Soul", "Ratatouille", "Shrek", "Encanto", "Skyfall", "Speed", "Twister", "Beetlejuice", 
        "Sing", "Antz", "Pinocchio", "Coraline", "Hercules", "Tarzan", "Frozen", "Bambi", "Dumbo", "Cinderella"];

    wordList = _.shuffle(wordList);

    let word = wordList[0].toLowerCase();
    return word;
}

function isValid(){
    let isValid = true;

    let guess = document.querySelector("#guess").value;

    if (guess.length !== 1 || guess == " "){
        isValid = false;
    }
    return isValid;

}


function analyze(){
    document.querySelector("#validation").innerHTML = "";
    if (!isValid()){
        document.querySelector("#validation").innerHTML = "not valid, try again";
        return;
    }

    document.querySelector("#guess").focus();
    let guess = document.querySelector("#guess").value.toLowerCase();
    document.querySelector("#guess").value = "";

    triesLeft--;
    //console.log(word);
    let charCount = 0;
    for (let i=0; i<word.length; i++){
        if (word[i] == guess){
            charCount++;
            blankSpaces[i] = guess;

        }
    }
    if (charCount > 1){
        document.querySelector("#feedback").innerHTML = `"${guess}" is in the word ${charCount} times`;
    } else if (charCount == 1){
        document.querySelector("#feedback").innerHTML = `"${guess}" is in the word once`;
    } else {
        document.querySelector("#feedback").innerHTML = `"${guess}" is not in the word`;
    }
    document.querySelector("#blankSpaces").innerHTML = " ";
    let underScoresLeft = 0;
    for (let z=0; z < word.length; z++){
        if (blankSpaces[z] == "_"){
            underScoresLeft++;
        }
        document.querySelector("#blankSpaces").innerHTML += blankSpaces[z] + " ";
    }

    if (underScoresLeft == 0){
        document.querySelector("#congrats").innerHTML = "YOU GOT IT";
        document.querySelector("#congratsImg").innerHTML = "<img src='img/thumb.jpg' alt='Yay' width=100>";
        document.querySelector("#totalWins").innerHTML = `total wins: ${++wins}`;
        document.querySelector("#triesLeft").innerHTML = "";
        localStorage.setItem("total_wins", wins);
        gameOver();

    } else {

        if (triesLeft == 0){
            document.querySelector("#triesLeft").innerHTML = "you're out of tries mate, the movie title was: " + word;
            document.querySelector("#totalLosses").innerHTML = `total losses: ${++losses}`;
            localStorage.setItem("total_losses", losses);
            gameOver();
        } else if (triesLeft == 1){
            document.querySelector("#triesLeft").innerHTML = "you have one more try";
        } else {
            document.querySelector("#triesLeft").innerHTML = `you have ${triesLeft} tries left`;
        }

    }

}

function gameOver(){
    document.querySelector("#submit").style.display = "none";
    document.querySelector("#reset").style.display = "inline";
}