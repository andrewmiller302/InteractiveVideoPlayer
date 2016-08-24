//Video
var video = document.getElementById("video");
var image_tracker = 'play';

//Buttons
var playButton = document.getElementById("play-pause");
var fullScreenButton = document.getElementById("full-screen");

//Sliders
var seekBar = document.getElementById("seek-bar");
var progressAmount = document.getElementById("progress-amount")
var seekableTimeRanges = seekBar.seekable;
var seekableEnd = seekBar.seekable.end(seekBar.seekable.length -1);
//var volumeBar = docment.getElementById("volume-bar");


//play/pause button

function change(){
  var image = document.getElementById('play-pause-icon');
  if(image_tracker=='play'){
    video.play();
    image.src = "icons/pause-icon.png";
      image_tracker = 'pause';
    }else{
      video.pause();
      image.src = "icons/play-icon.png" ;  
      image_tracker = 'play';
    
    }
}


//Seekbar
video.addEventListener('timeupdate', function(){
  seekBar.value = video.currentTime;
  progressAmount.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});

//Seekbar Skip Ahead

seekBar.addEventListener('click', function(e){
  var pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
            video.currentTime = pos * video.duration;
  
});

