/*****************
  Video elem var
******************/
var video = document.getElementById("video");
var image_tracker = 'play';

/******************
 WebVTT
 ******************/

var captionsContainer = document.getElementById("textCaptions");
var captions = captionsContainer.getElementsByTagName("span");



/**************
  Buttons var
***************/
var playButton = document.getElementById("play-pause");
var fullScreenButton = document.getElementById("full-screen");
var muteButton = document.getElementById("mute");

/**************
  Seekbar var
***************/
var seekBar = document.getElementById("seek-bar");
var progressBar = document.getElementById("progress-bar");
var curtimetext = document.getElementById("curtimetext");
var durtimetext = document.getElementById("durtimetext");

/*******************
  play/pause button 
********************/
//Note: did not use event listener. 

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
};


/**************
  Mute Button
***************/

//add event listener to trigger on click. 
muteButton.addEventListener("click", function(){
  //Add a var to get the image 
  var vol_image = document.getElementById('mute-icon');
  //test if muted or not and update image 
  if(video.muted == false){
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
fullScreenButton.addEventListener("click", function(){
  if(video.requestFullscreen){
    video.requestFullscreen();
    } else if (video.mozRequestFullScreen){
      video.mozRequestFullScreen(); //firefox
    } else if (video.webkitRequestFullScreen){
      video.webkitRequestFullscreen(); //Chrom and Safari
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

video.addEventListener("timeupdate", function(){
  //Caculate the slider value
  var value = (100 / video.duration) * video.currentTime;
  
  //Update the slider value
  seekBar.value = value;
  
  //Track the time 
  
  /*takes the current time from the time update 
  event listener rounds down and converts into min and sec*/
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
  
  
});

/*********************
 Seekbar Skip Ahead
**********************/

seekBar.addEventListener('click', function(e){
  var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
            video.currentTime = pos * video.duration;
  
});

/*********************
  Caption 
**********************/


/*var convertTimeString = function (time){
  var result;
  var hours = parseInt(time.substr(0, 2));
  var minutes = parseInt(time.substr(3,2));
  var seconds = parseInt(time.substr(6,2));
  var milliseconds = parseInt(time.substr(9, 3));
  result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
  
}



video.addEventListener('change', function(){
  var timeViedo = this.curtimetext;
  var startTime;
  var endTime;
  
  for(var i = 0; i < captions.length; i++){
      startTime = convertTimeString(captions[i].dataset.timeStart);
      endTime = convertTimeString(captions[i].dataset.timeEnd);
  if(timeViedo >= startTime && timeViedo < endTime){
    captions[i].style.color = "orange";
    }else{
        captions[i].style.color = "black";
      }
    
  }   

  
  
});*/

/*function highlightTranscript(){
  var time = video.currentTime;
  if(captions.length > 0){
    for(var i = 0; i < captions.length; i++){
      var startTime = convertTimeString(captions[i].dataset.timeStart)
      var endTime = convertTimeString(captions[i].dataset.timeEnd);
      if (time >= startTime && time < endTime){
        captions[i].style.color = "orange";
      } else{
        captions[i].style.color = "black";
      }
    
  }
    }
  
  
  
};*/