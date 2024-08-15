console.log("welcome to spotify");
//initialize the variables
let songIndex=0;
let audioElement = new Audio('Assets/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Bad",filePath:"Assets/songs/1.mp3",coverPath:"Assets/covers/1.jpg"},
    {songName:"Water and Wine",filePath:"Assets/songs/2.mp3",coverPath:"Assets/covers/2.jpg"},
    {songName:"Invincible",filePath:"Assets/songs/3.mp3",coverPath:"Assets/covers/3.jpg"},
    {songName:"My Heart",filePath:"Assets/songs/4.mp3",coverPath:"Assets/covers/4.jpg"},
]
songItems.forEach((element,i)=>{
element.getElementsByTagName("img")[0].src = songs[i].filePath;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioelement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value* audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
      makeAllPlays();
      var isPaused = audioElement.paused;
      var clickedSongIndex = parseInt(e.target.id);
  
      if (songIndex === clickedSongIndex && !isPaused) {
        // Pause the currently playing song
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
      } else {
        // Play the clicked song
        songIndex = clickedSongIndex;
        audioElement.src = `Assets/songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
      }
    });
  });
  

//Click Actions on next and previous button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=3){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `Assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `Assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})
