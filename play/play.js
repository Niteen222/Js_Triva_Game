// for get user name 
document.addEventListener("DOMContentLoaded",()=>{
    const playerdata=JSON.parse(localStorage.getItem('data'))
    console.log(playerdata);
    const player1st= document.getElementById('player1')
    player1st.innerText = playerdata.player1
    const player2nd= document.getElementById('player2')
    player2nd.innerText=playerdata.player2
    getdata()

})

// API Fetch 
let rightans;


const getdata = async () => {
    let data = await fetch(`https://the-trivia-api.com/v2/questions`)
    let jsondata = await data.json()
    // console.log("fetch data here",jsondata)

    document.querySelector(".question_heading").innerHTML=`Q.${jsondata[0].question.text}`
    rightans=jsondata[0].correctAnswer
    // console.log(rightans)
    const allAnswers = [jsondata.correctAnswer, ...jsondata.incorrectAnswers].sort(() => Math.random()-0.5)
    .forEach((btns) =>{
        
        if (jsondata[0].correctAnswer === rightans){
            btns.innerHTML=jsondata[0].correctAnswer
        }
        else{
            jsondata[0].incorrectAnswers.forEach((options) =>{
                btns.innerHTML=options
            })
        }
    })
}

