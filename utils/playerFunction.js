
import { Player as RPlayer } from '@react-native-community/audio-toolkit'


const defaultPlayerOptions = {
    continuesToPlayInBackground: true,
};

let plays = new RPlayer()
let clearIntervals = null
let cT = 0
let Duration = 0
let Playing = false

export function playerPlayAndPause() {
    if (plays.isPlaying) {
        plays.pause();
        Playing = false;
        clearInterval(clearIntervals)
    } else {
        plays.play();
        Playing = true;
        const newIntervalId = setInterval(() => cT = plays.currentTime, 1000 );
        setTimeout(() => Duration = plays.duration, 1000);
        clearIntervals = newIntervalId;
    }
}

export function msToMINS(ms) {
    let s = ms / 1000;
    let seconds = Math.floor(s % 60);
    let minutes = Math.floor(s / 60);
    return `${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
}

export function playsougFunction(selectsong) {
    plays.destroy();
    cT = 0;
    Duration = 0;
    Playing = false;
    clearInterval(clearIntervals);
    plays = new RPlayer(selectsong, defaultPlayerOptions)
    AutoPlat(true)
}

export function banckward(selectItem, AllSongs) {
    plays.destroy();
    cT = 0;
    Duration = 0;
    Playing = false;
    clearInterval(clearIntervals);
    const currentIndex = AllSongs.findIndex(song => song.Id === selectItem.songs.Id);
    const nextIndex = (currentIndex - 1) % AllSongs.length;
    playsougFunction(AllSongs[nextIndex].streamURL);
}

export function forward(selectItem, AllSongs) {
    plays.destroy();
    cT = 0;
    Duration = 0;
    Playing = false;
    clearInterval(clearIntervals);
    const currentIndex = AllSongs.findIndex(song => song.Id === selectItem.songs.Id);
    const nextIndex = (currentIndex + 1) % AllSongs.length;
    playsougFunction(AllSongs[nextIndex].streamURL);
}

export function AutoPlat(ap) {
    let autoP = ap
    if (autoP === true) {
        plays.play()
        Playing = true;
        const newIntervalId = setInterval(() => cT = plays.currentTime, 1000);
        setTimeout(() => Duration = plays.duration, 1000);
        clearIntervals = newIntervalId;
    }
}

export const AllState = {
    currentTimes: cT,
    playings: Playing,
    duration: Duration
}