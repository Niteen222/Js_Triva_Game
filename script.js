const startGameBtn=document.getElementById('submit')
const firstPlayer=document.getElementById('firstplayer')
const secondPlayer=document.getElementById('secondplayer')

startGameBtn.addEventListener('click', function (event) {
    if (firstPlayer.value.trim()===''||secondPlayer.value.trim()===''){
        alert('Please enter both players Names');
    } else{
        event.preventDefault()
        window.location.href='play/play.html'
        storeData(firstPlayer.value,secondPlayer.value)
    }
    
})

function storeData(player1,player2){
    localStorage.setItem('data',JSON.stringify({player1,player2}))
}