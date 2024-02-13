import { Player as RPlayer } from '@react-native-community/audio-toolkit'
import { SelectItem, durations, interval, isPlayings } from '../Store/action';

const defaultPlayerOptions = {
    continuesToPlayInBackground: true,
};


let plays = null;
let clearIntervalId = null;
let currentTime = 0;
let duration = 0;
let isPlaying = false;

export function playerPlayAndPause(dis) {
    if (plays && plays.isPlaying) {
        plays.pause();

        isPlaying = false;
        dis(isPlayings(false))

        clearInterval(clearIntervalId);
    } else if (plays) {
        plays.play();

        isPlaying = true;
        dis(isPlayings(true))

        clearIntervalId = setInterval(() => dis(interval(plays.currentTime)), 1000);
        setTimeout(() => dis(durations(plays.duration)), 1000);
    }
}

export function msToMINS(ms) {
    let s = ms / 1000;
    let seconds = Math.floor(s % 60);
    let minutes = Math.floor(s / 60);
    return `${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
}

export function playsougFunction(selectsong, dis) {
    if (plays) {
        plays.destroy();
    }
    currentTime = 0;
    dis(interval(0));

    duration = 0;
    dis(durations(0));

    isPlaying = false;
    dis(isPlayings(false));

    clearInterval(clearIntervalId);
    plays = new RPlayer(selectsong, defaultPlayerOptions);
    playerPlayAndPause(dis);
}

export function banckward(selectItem, AllSongs, dis) {
    if (plays) {
        plays.destroy();
    }
    currentTime = 0;
    dis(interval(0));

    duration = 0;
    dis(durations(0));

    isPlaying = false;
    dis(isPlayings(false));

    clearInterval(clearIntervalId);
    const currentIndex = AllSongs.findIndex(song => song.Id === selectItem.songs.Id);
    const nextIndex = (currentIndex - 1 + AllSongs.length) % AllSongs.length;
    playsougFunction(AllSongs[nextIndex].streamURL, dis);
    dis(SelectItem({ songs: AllSongs[nextIndex], RouterN: "Search", }))
}

export function forward(selectItem, AllSongs, dis) {
    if (plays) {
        plays.destroy();
    }
    currentTime = 0;
    dis(interval(0));

    duration = 0;
    dis(durations(0));

    isPlaying = false;
    dis(isPlayings(false));

    clearInterval(clearIntervalId);
    const currentIndex = AllSongs.findIndex(song => song.Id === selectItem.songs.Id);
    const nextIndex = (currentIndex + 1) % AllSongs.length;
    playsougFunction(AllSongs[nextIndex].streamURL, dis);
    dis(SelectItem({ songs: AllSongs[nextIndex], RouterN: "Search", }))
}

export function playSeek(Seek) {
    plays.seek(Seek);
}

export function songCompleteForward(selectItem, AllSongs, dis) {
    if (plays) {
        plays.destroy();
    }
    currentTime = 0;
    dis(interval(0));

    duration = 0;
    dis(durations(0));

    isPlaying = false;
    dis(isPlayings(false));

    clearInterval(clearIntervalId);
    const currentIndex = AllSongs.findIndex(song => song.Id === selectItem.songs.Id);
    const nextIndex = (currentIndex + 1) % AllSongs.length;
    playsougFunction(AllSongs[nextIndex].streamURL, dis);
    dis(SelectItem({ songs: AllSongs[nextIndex], RouterN: "Search", }))
}

export function getCurrentState() {
    return {
        currentTime,
        isPlaying,
        duration
    };
}