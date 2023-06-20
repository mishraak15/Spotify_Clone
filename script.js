// console.log("Welcome to JS");

// Initializing the variables
let songIndex = 0;
// let audioElement=new Audio('./assets/Asur Web Series - Background Music.mp3');
let audioElement = document.getElementById('audioElement');
let master_play = document.getElementById('master_play');
let total_time = document.getElementById('total_time');
let running_time = document.getElementById('running_time');
let progressBar = document.getElementById('progressBar');
let song_img = document.getElementById('song_img');
let songItems = Array.from(document.getElementsByClassName('songItems'));

let master_song_name = document.getElementById('master_song_name');




let songs = [
    { songName: 'Bella-Ciao', filePath: "songs/1.mp3", coverPath: "covers/1.jpg", artistName: "Money Hiest" },
    { songName: 'Keshariya', filePath: "songs/2.mp3", coverPath: "covers/kesariya.jpg", artistName: "Arjit Singh" },
    { songName: 'Salaam-e-Ishq', filePath: "songs/3.mp3", coverPath: "covers/6.jpeg", artistName: "Atif Aslam" },
    { songName: 'Kya Loge', filePath: "songs/4.mp3", coverPath: "covers/kya-loge.jpg", artistName: "B Parak" },
    { songName: 'Maan Meri Jaan', filePath: "songs/5.mp3", coverPath: "covers/2.jpg", artistName: "King" },
    { songName: 'Ziahl-e-Miskin', filePath: "songs/6.mp3", coverPath: "covers/3.jpg", artistName: "Kaifi Khalil" }
]

songItems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('song_name')[0].innerHTML = songs[i].songName;
});

// audioElement.play()

// Listen to the elements

// console.log(audioElement.currentTime);

master_play.addEventListener('click', (e) => {
    // console.log('clicked');
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        master_play.src = './assets/pause-circle.png';
        makeallplays();
        let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
        songItemPlay[index - 1].src = './assets/pause-circle.png';
        song_img.style.opacity = '1';
    }

    else {
        makeallplays();
        audioElement.pause();
        master_play.src = './assets/play-button.png';
        song_img.style.opacity = '0';
    }
});

audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    // console.log(progress);
    progressBar.value = progress;
    let m = parseInt(audioElement.currentTime / 60);
    let s = parseInt(audioElement.currentTime);
    if (s >= 60) {
        s = (s % 60);
    }
    if (s <= 9) {
        s = `0${s}`;
    }
    running_time.innerHTML = `${m}:${s}`


    let x = parseInt(audioElement.duration / 60);
    let y = parseInt(audioElement.duration - x * 60);
    if (y <= 9) {
        y = `0${y}`;
    }
    total_time.innerHTML = `${x}:${y}`;

    if (progress == 100) {
        audioElement.pause();
        master_play.src = './assets/play-button.png';
        song_img.style.opacity = '0';
    }
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = ((progressBar.value * audioElement.duration) / 100);
});

function makeallplays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.src = "./assets/play-button.png"
    })
}

let index = 0;
let a = 0;
let b=0;
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.id == index && !audioElement.paused) {
            b=e.target.id;
            audioElement.pause();
            song_img.style.opacity = '0';
            a = audioElement.currentTime;
            makeallplays();
            master_play.src = './assets/play-button.png';
        }
        else {
            makeallplays();
            index = parseInt(e.target.id);
            e.target.src = './assets/pause-circle.png';
            audioElement.src = `./songs/${index}.mp3`;
            master_play.src = './assets/pause-circle.png';
            if(b==e.target.id){
                audioElement.currentTime = a;
            }
            else{
                audioElement.currentTime = '0';

            }
            master_song_name.innerHTML = `${songs[index - 1].songName} - ${songs[index - 1].artistName}`;
            song_img.src = songs[index - 1].coverPath;
            song_img.style.opacity = '1';
            audioElement.play();

        }
    })
})

let previous = document.getElementById('previous');
let next = document.getElementById('next');

next.addEventListener('click', (e) => {
    if (index >= 6) {
        index = 1;
    }
    else {
        index = index + 1;
    }
    audioElement.src = `./songs/${index}.mp3`;
    master_song_name.innerHTML = `${songs[index - 1].songName} - ${songs[index - 1].artistName}`;
    song_img.src = songs[index - 1].coverPath;
    audioElement.currentTime = 0;
    master_play.src = './assets/pause-circle.png';
    makeallplays();
    let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
    songItemPlay[index - 1].src = './assets/pause-circle.png';
    song_img.style.opacity = '1';
    audioElement.play();

});

previous.addEventListener('click', (e) => {
    if (index <= 1) {
        index = 6;
    }
    else {
        index = index - 1;
    }
    master_song_name.innerHTML = `${songs[index - 1].songName} - ${songs[index - 1].artistName}`;
    song_img.src = songs[index - 1].coverPath;
    audioElement.src = `./songs/${index}.mp3`;
    audioElement.currentTime = 0;
    master_play.src = './assets/pause-circle.png';
    makeallplays();
    let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
    songItemPlay[index - 1].src = './assets/pause-circle.png';
    song_img.style.opacity = '1';
    audioElement.play();

});

