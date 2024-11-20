const loadUserNameData= () => {
    const playerdata = JSON.parse(localStorage.getItem("data"))
    // console.log(playerdata)
    const player1st= document.getElementById("player1")
    player1st.innerText= playerdata.player1
    const player2nd= document.getElementById("player2")
    player2nd.innerText= playerdata.player2
  }
  loadUserNameData()
  
  // API Fetch
  
  let questionData
  const answerbtns=document.querySelector(".answerbtns")
  let index=0
  // console.log(answerbtns);
  const getdata=async() =>{
    let easyQuestions=await fetch("https://the-trivia-api.com/api/questions?difficulty=easy&limit=2")
    let mediumQuestions=await fetch("https://the-trivia-api.com/api/questions?difficulty=medium&limit=2")
    let hardQuestions=await fetch("https://the-trivia-api.com/api/questions?difficulty=hard&limit=2")
    easyQuestions=await easyQuestions.json()
    mediumQuestions=await mediumQuestions.json()
    hardQuestions=await hardQuestions.json()
    // console.log(questionData);
    questionData=[...easyQuestions,...mediumQuestions,...hardQuestions]
    renderQuestion(questionData[index])
  }
  
  const nextQuestion = () => {
    index=index+1
    // console.log(index)
    if (index==6){
      console.log("game end now")
      endGameMessage() 
  
    }
    renderQuestion(questionData[index])
  }
  
  const question=document.querySelector(".question_heading")
  const renderQuestion=(questionData) =>{
    const trun=document.querySelector(".turn")
    const userTurn=JSON.parse(localStorage.getItem("data"))
    const level = document.querySelector(".level")
    // console.log("level",level)
    if (questionData) {
      level.textContent=`Level :)  ${(questionData.difficulty).toUpperCase()}`
      trun.innerHTML=`Turn :)  ${(userTurn.player1).toUpperCase()}`
      question.innerHTML=`<span class="qs">Q. :) </span> ${questionData.question}`
      const allAnswers=[questionData.correctAnswer,...questionData.incorrectAnswers,].sort(() =>Math.random()-0.5)
      // console.log(allAnswers)
      answerbtns.innerHTML=""
      allAnswers.forEach((answer) =>{
        const button=document.createElement("button")
        button.className="answer-btn"
        button.textContent=answer
        answerbtns.append(button)
      })
    }
  }
  
  
  const questionScore={easy:10,medium:15,hard:20}
//   console.log(questionScore)
  answerbtns.addEventListener("click",(e) =>{
    let targetButton=e.target
    if (targetButton.classList.contains("answer-btn")){
      if (targetButton.textContent===questionData[index].correctAnswer){
        // console.log("correct")
        alert("Correct Answer")
        swapPlayer()
        // console.log(player1)
        if(questionData[index].difficulty==="easy"){
          updateScore(questionScore.easy)
        } 
        else if(questionData[index].difficulty==="medium"){
          updateScore(questionScore.medium)
        }
        else{
          updateScore(questionScore.hard)
        }
        nextQuestion()
      } else {
        // console.log("incorrect")
        alert("Incorrect Answer")
        updateScore(points=0)
        swapPlayer()
  
        nextQuestion()
      }
    } else {
    }
  })
  
  
  getdata()
  
  const player1Name =(JSON.parse(localStorage.getItem("data"))).player1
  const player2Name =(JSON.parse(localStorage.getItem("data"))).player2
  
  
  const playerScore={
    [player1Name]:{ score:0},
    [player2Name]:{ score:0 },
    activePlayer:player1Name
  }
  
  
  function resetGameScore() {
    localStorage.setItem('gameData',JSON.stringify(playerScore))
    // console.log('Game has been reset.')
  }
  resetGameScore()
  
  // saving data if not in localstaorage 
  if (!localStorage.getItem('gameData')){
    localStorage.setItem('gameData',JSON.stringify(playerScore))
  }
  
  
  function getGameData() {
    return JSON.parse(localStorage.getItem('gameData'));
  }
  
    // updating score 
  function updateScore(points) {
    const data = getGameData()
    const activePlayer = data.activePlayer
    data[activePlayer].score+=points
  
    // Save the updated daata
    localStorage.setItem('gameData',JSON.stringify(data))
    console.log(`${activePlayer} now has ${data[activePlayer].score} points.`)
  }
  
  // playes name swaping
  function swapPlayer() {
    const data=getGameData()
    // player name changing
    data.activePlayer=data.activePlayer=== player1Name ? player2Name : player1Name
  
    // saving here updated data
    localStorage.setItem('gameData', JSON.stringify(data))
    // console.log(`It's now ${data.activePlayer}'s turn.`)
    const playerdata = JSON.parse(localStorage.getItem("data"));
      // console.log(playerdata);

      if (playerdata && playerdata.player1 && playerdata.player2) {
        [playerdata.player1, playerdata.player2] = [
          playerdata.player2,
          playerdata.player1,
        ];
    
        // updatign data local stirage
        localStorage.setItem("data",JSON.stringify(playerdata));
      }
  }
  
  const restartgamebtn=document.querySelector('.restart')
  console.log(restartgamebtn);
  
  // after game end
  const endGameMessage = () => {
    const data = getGameData()
    const player1Score = data[player1Name].score
    const player2Score = data[player2Name].score
    // console.log(player1Score)
    // console.log(player2Score)

    if (player1Score < player2Score) {
      alert(`${player1Name} wins with a score of ${player1Score} points.`)
    } else if (player2Score < player1Score) {
      alert(`${player2Name} wins with a score of ${player2Score} points.`)
    } else {
      alert("It's a tie!");
    }
    restartgamebtn.style.display= "block"
    }

  
  
  
  
  
  
