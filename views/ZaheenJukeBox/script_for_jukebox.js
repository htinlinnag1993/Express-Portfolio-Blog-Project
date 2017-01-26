var playBtn;

$(document).ready(function(){
    //references to commonly used elements
    //volume level
    volume = $("#volumeLevel");

    //play button
    playBtn = document.getElementById('play');

    // Creating Jukebox object with its variables and methods
    function Jukebox(){ this.playing = false;   // True if currently playing
      this.autoplaying = false;   // True if autoplay is active
      // List of all songs in jukebox
      this.songs = [ new Song( new Audio('Fleslit-MIA.mp3'), "MIA", "Fleslit") ];
      this.current = this.songs[0];   // Current is the current audio file loaded
      this.currentIndex = 0;    // Index of current song in songs list
      this.volume = 1;    // Volume level

      this.play = function(){
        // Play is the main function to be called to play the current song
        this.current.play();
        this.playing = true;
        toggle(this.playing);
      };

      this.autoplay = function(){
        // Toggle autoplay
        this.autoplaying = !this.autoplaying;
        if (this.autoplaying){
            $("#autoplay").css({backgroundColor: "rgb(63, 234, 77)"});
        }
        else{
            $("#autoplay").css({backgroundColor: "rgba(160,180,240,0.5)"});
        }
      };

      this.pause = function(){
        // To pause current song
        this.current.pause();
        this.playing = false;
        toggle(this.playing);
      };

      this.stop = function(){
        // To stop current song
        this.current.stop();
        this.playing = false;
        toggle(this.playing);
      };

      this.select = function(index){
        // To select a song from the list
        if (this.playing === true) this.stop();
        this.currentIndex = index;
        this.current = this.songs[index];
        $("#title").text("Current song: " + this.current.title);
        $("#artist").text("Artist: " + this.current.artist);
        this.updateVolume(this.volume);
        $("#albumImage").css({backgroundImage: "url(" + this.current.image + ")"});
        if (this.autoplaying === true)
        { this.play(); }
      };

      this.next = function(){
        // To select the next song in the list
        this.currentIndex++;
        this.currentIndex %= this.songs.length;
        this.select(this.currentIndex);
      };

      this.previous = function(){
        // To select previous song in the list
        this.currentIndex--;
        this.currentIndex = (this.currentIndex + this.songs.length) % this.songs.length;
        this.select(this.currentIndex);
      };

      this.skip = function(percent){
        // To skip to any point in the song
        this.current.skip(percent);
      };

      this.updateVolume = function(vol){
        // Change volume
        if (vol > 1) vol = 1;
        else if (vol < 0) vol = 0;
        this.volume = vol;
        this.current.audio.volume = vol;
        // To update volume bar
        volume.css({width: (vol * 100) + "%"});
      };

      this.add = function(song){
        // To sdd a song to playlist
        // Add song to jukebox playlist
        jukebox.songs.push(song);
        // Add title to UI playlist
        $(".playlist").append("<p class='playlistItem'>" + artist + " - " + title + "</p>");
        // Add event listener to the new playlist item
        index = jukebox.songs.length - 1;
        item = $(".playlistItem")[index];
        item.index = index;
        $(item).on("click", function()
        {
          jukebox.select(this.index);
        });
        // Finally, switch to this track automatically
        jukebox.select(index);
      };
    };

    // Instantiate jukebox
    jukebox = new Jukebox();

    //ADDING ALL EVENT LISTENERS------------------------------------------------

    // Initialize the playlist
    playlist = $(".playlistItem");
    for (i = 0; i < playlist.length; i++) {
      // Give this item its index
      playlist[i].index = i;
      // Attach event listener for user click
      $(playlist[i]).on("click", function(){
        jukebox.select(this.index);
      });
    }

    // Add event listener to autoplay button
    $("#autoplay").on("click", function(){
      jukebox.autoplay();
    });

    // Add event listener to play/pause button
    $("#play").on("click", function(){
      if (jukebox.playing === false) jukebox.play();
      else jukebox.pause();
    });

    // Add event listener to stop button
    $("#stop").on("click", function(){
      jukebox.stop();
    });

    // Add event listener to random song button
    $("#random").on("click", function(){
      rand = Math.floor(Math.random() * jukebox.songs.length);
      jukebox.select(rand);
    });

    // Add event listener to previous song button
    $("#previous").on("click", function(){
      jukebox.previous();
    });

    // Add event listener to next song button
    $("#next").on("click", function(){
      jukebox.next();
    });

    // Add event listener to volume up button
    $("#volumeUp").on("click", function(){
      jukebox.updateVolume(jukebox.volume + 0.1);
    });

    // Add event listener to volume down button
    $("#volumeDown").on("click", function(){
      jukebox.updateVolume(jukebox.volume - 0.1);
    });

    // Add event listener to volume bar (so user can click on bar to choose volume)
    $("#volumeDiv").on("mousedown", function(){
      rect = this.getBoundingClientRect();
      localX = event.clientX - rect.left;
      percent = localX / rect.width;
      jukebox.updateVolume(percent);
    });

    // Add event listener to progress bar (seek song position)
    $(".progressBar").on("mousedown", function(){
      rect = this.getBoundingClientRect();
      localX = event.clientX - rect.left;
      percent = localX / rect.width;
      jukebox.skip(percent);
    });

    // Add event listener to search bar (search spotify for tracks)
    $(".searchForm").on("submit", function(){
      $.ajax(
        "https://api.spotify.com/v1/search",
        {
          data:
          {
            q: $("#search").val(),
            type: "track",
          },
          success: function(response){
            if (response.tracks.items.length)
            {
              // Format the track into a song object
              track = response.tracks.items[0];
              audio = new Audio(track.preview_url);
              title = track.name;
              artist = track.artists[0].name;
              image = track.album.images[0].url;
              song = new Song(audio, title, artist, image);
              // Add song to jukebox
              jukebox.add(song);
            }
            else {
              $(".noResults").text("No results");
              setTimeout(function(){
                $(".noResults").text("");
              }, 2000);
            }
          }
        });
    });

    //add event listener to body (listen for dragging files into body)
    // $("html").on("dragover", function(evt){
    //   evt.stopPropagation();
    //   evt.preventDefault();
    //   evt.originalEvent.dataTransfer.dropEffect = 'copy';
    // });

    //add event listener to body (listen for user dropping files to add to playlist)
    // $("html").on("drop", function(evt){
    //   evt.stopPropagation();
    //   evt.preventDefault();
    //   files = evt.originalEvent.dataTransfer.files; //get selected files
    //
    //   for (i = 0; i < files.length; i++) {
    //     f = files[i];
    //     if (f.type.match(/audio.*/)){
    //       reader = new FileReader();
    //       reader.onload = function(e2){
    //         //generate song object from file data
    //         audio = new Audio(e2.target.result);
    //         title = "Track " + jukebox.songs.length;
    //         artist = "";
    //         song = new Song(audio, title, artist);
    //         //add song to jukebox
    //         jukebox.add(song);
    //       }
    //       reader.readAsDataURL(f);
    //     }
    //   }
    // });

    //DONE ADDING ALL EVENT LISTENERS-------------------------------------------
});

function Song(audio, title, artist, image){
  this.audio = audio;
  this.title = title;
  this.artist = artist;
  if(image != undefined)
  { this.image = image; }
  else
  { this.image = "images/BlueMusicNote.png";}

  $(this.audio).on("ended", function(){
    if (jukebox.autoplaying === true)
    { jukebox.next(); }
    else
    { jukebox.stop(); }
  });

  this.play = function(){
    this.audio.play();
  };

  this.pause = function(){
    this.audio.pause();
  };

  this.stop = function(){
    this.audio.pause();
    this.audio.currentTime = 0;
  };

  // The progress bar is updated every frame
  $(this.audio).on("timeupdate", function(){
    progress = Math.floor(this.currentTime / this.duration * 10000) / 100;
    $(".progress").css({width: progress + "%"});
  });

  // Function to skip through song by clicking on progress bar. The argument is in the form of percent of duration
  this.skip = function(percent){
    // Convert the percent into seconds
    time = percent * this.audio.duration;
    this.audio.currentTime = time;
  }
}

// Takes a div (the play/pause button) and toggles the image
function toggle(playing)
{
    console.log(playBtn);
  if (playing === true)
  { playBtn.id = "pause";
    playBtn.title = "Pause";
  }
  else
  { playBtn.id = "play";
    playBtn.title = "Play";
  }
}
