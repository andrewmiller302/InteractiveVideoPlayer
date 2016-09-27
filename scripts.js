/*****************
  Video elem var
******************/
var video = document.getElementById("video");
var image_tracker = 'play';

/**************
  Buttons var
***************/
var playButton = document.getElementById("play-pause");
var fullScreenButton = document.getElementById("full-screen");
var muteButton = document.getElementById("mute");
var subtitleButton = document.getElementById("subtitles");
var subMode = 'hidden';

/**************
  Seekbar var
***************/
var seekBar = document.getElementById("seek-bar");
var curtimetext = document.getElementById("curtimetext");
var durtimetext = document.getElementById("durtimetext");


/******************
 Transcript
 ******************/

var captionsContainer = document.getElementById("textCaptions");
var captions = captionsContainer.getElementsByTagName("span");

/*******************
  play/pause button 
********************/
//add event listener to trigger on click.
playButton.addEventListener("click", function(){
  //add a var to track what the image is
  var image = document.getElementById('play-pause-icon');
  //test if played
  if(video.paused === true){
    video.play();
    image.src = "icons/pause-icon.png";
    image_tracker = 'pause';
  }else{
    video.pause();
    image.src = "icons/play-icon.png" ;  
    image_tracker = 'play';
  }
  
});

/**************
  Mute Button
***************/

//add event listener to trigger on click. 
muteButton.addEventListener("click" , function(){
  //Add a var to track what the image is
  var vol_image = document.getElementById('mute-icon');
  //test if muted or not and update image 
  if(video.muted === false){
    video.muted = true;
    vol_image.src = "icons/volume-off-icon.png";
      }else{
      video.muted = false;
      vol_image.src = "icons/volume-on-icon.png" ;
      }
        
});

/******************
 fullscreen toggle
******************/

// Add event listener to trigger on click.
fullScreenButton.addEventListener('click',function(){
  if(video.requestFullscreen){
    video.requestFullscreen();
    } else if (video.mozRequestFullScreen){
      video.mozRequestFullScreen(); //firefox
    } else if (video.webkitRequestFullScreen){
      video.webkitRequestFullscreen(); //Chrom and Safari
    }else if (video.msRequestFullscreen){
      video.msRequestFullscreen(); //IE 11
    }
  
});

/******************
 subtitles
******************/

for (var i = 0; i < video.textTracks.length; i++){
  video.textTracks[i].mode = 'hidden';
}

var hideSubtitles = function(){
  for (var i = 0; i < video.textTracks.length; i++){
  video.textTracks[i].mode = 'hidden';
} };

var showSubtitles = function(){
  for (var i = 0; i < video.textTracks.length; i++){
  video.textTracks[i].mode = 'showing';
}
  
};

subtitleButton.addEventListener('click', function(){
  if(subMode === 'hidden'){
    showSubtitles();
    subMode = 'showing';
    }else{
    hideSubtitles();
    subMode = 'hidden';
    
  }
  
});

/*************
 Seekbar
**************/

seekBar.addEventListener("change", function(){
  //Calculate the new time
  var time = video.duration * (seekBar.value / 100);
  
  //update the video time
  video.currentTime = time;
});

//update the seek bar as the video palys

var curTimeTrack = video.addEventListener("timeupdate", function(){
  //Caculate the slider value
  var value = (100 / video.duration) * video.currentTime;
  
  //Update the slider value
  seekBar.value = value;
  
  //Track the time 
  
  /*takes the current time from the time update 
  event listener rounds down and converts into min and sec*/
  var result
  var curmins = Math.floor(video.currentTime / 60);
  var cursecs = Math.floor(video.currentTime - curmins * 60);
  var durmins = Math.floor(video.duration / 60);
  var dursecs = Math.floor(video.duration - durmins * 60);
  
  //Formats time to add additional 0 if under 10 sec ie 00:07
  if(cursecs <10){
    cursecs = "0"+cursecs;
  }
  if(dursecs <10){
    dursecs = "0"+dursecs;
  }
  if(curmins <10){
    curmins = "0"+curmins;
  }
  if(durmins <10){
    durmins = "0"+durmins;
  }
  
  //Adds time to the html documents updates Span
  curtimetext.innerHTML = curmins+":"+cursecs+ " / ";
  durtimetext.innerHTML = durmins+":"+dursecs;
  return result;

  
});


/*********************
 Seekbar Skip Ahead
**********************/

seekBar.addEventListener('click', function(e){
  var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
            video.currentTime = pos * video.duration;
  
});

/*********************
 Transcript
**********************/

// Function to convert the dataset into time  and return a value. 
var convertTimeString = function (time) {
  var result;
  var hours = parseInt(time.substr(0, 2));
  var minutes = parseInt(time.substr(3, 2));
  var seconds = parseInt(time.substr(6, 2));
  var milliseconds = parseInt(time.substr(9, 3));
  result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
  return result;
};

// add an event listener to check for time update from the video. 
video.addEventListener("timeupdate", function () {
  // var to will get the current time and store it.
  var curTimeTrack = video.currentTime;
  //loop over the transcript
  for (var i = 0; i < captions.length; i++) {
    //convert each dataset and puts them into a var
    var startTime = convertTimeString(captions[i].dataset.timeStart);
    var endTime = convertTimeString(captions[i].dataset.timeEnd);
    //Highlights the transcript when the times match
    if (curTimeTrack >= startTime && curTimeTrack <= endTime) {
      captions[i].style.color = "orange";
    } else {
      captions[i].style.color = "black";
    }
  }

});

 



