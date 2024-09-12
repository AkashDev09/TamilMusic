import { Player as RPlayer } from '@react-native-community/audio-toolkit'
import { SelectItem, durations, interval, isPlayings, thumbnailImageUri } from '../Store/action';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const defaultPlayerOptions = {
    continuesToPlayInBackground: true,
};

const { ThumbnailExtractor } = NativeModules;

let plays = null;
let clearIntervalId = null;
let currentTime = 0;
let duration = 0;
let isPlaying = false;


const storeDataDurations = async (name, value) => {
    try {
        const jsonValue = {
            duration: "",
        };
        await AsyncStorage.setItem('duration', JSON.stringify({ ...jsonValue, [name]: value }));
    } catch (e) {
        // saving error
    }
};

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
        setTimeout(() => { dis(durations(plays.duration)), storeDataDurations("durations", plays.duration) }, 1000);
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
    thunmbnail(AllSongs[nextIndex].streamURL, dis)
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
    thunmbnail(AllSongs[nextIndex].streamURL, dis)
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
    thunmbnail(AllSongs[nextIndex].streamURL, dis)
    dis(SelectItem({ songs: AllSongs[nextIndex], RouterN: "Search", }))
}
export function thunmbnail(streamURL, Dis) {
    // Use the module function to extract thumbnail
    ThumbnailExtractor.extractThumbnail(streamURL)
        .then(base64Thumbnail => {
            Dis(thumbnailImageUri(base64Thumbnail))
        })
        .catch(error => {
            // Handle error
            Dis(thumbnailImageUri(null))
        });
}
export function getCurrentState() {
    return {
        currentTime,
        isPlaying,
        duration
    };
}
// export const storeDataFavorite = async (name, value) => {
    
//     try {

//         function AddStore() {
//             let jsonValue = []
//             if (name === "favorite") {
//                 return jsonValue = [...jsonValue, value]
//             }else if (name === "Rfavorite") {
//                 return jsonValue = [...jsonValue.filter((x) => x.Id !== value)]
//             }
//             return jsonValue
//         }
//         await AsyncStorage.setItem('Favorite', JSON.stringify(AddStore()));
//     } catch (e) {
//         // saving error
//     }
// };


export const addItemToStorage = async (item) => {
    try {
      // Get the stored array
      const jsonValue = await AsyncStorage.getItem('Favorite');
      let itemsArray = jsonValue != null ? JSON.parse(jsonValue) : [];
  
      // Add the new item
      itemsArray.push(item);
  
      // Save back to storage
      await AsyncStorage.setItem('Favorite', JSON.stringify(itemsArray));
      console.log('Item added successfully');
    } catch (e) {
      console.error('Error adding item to AsyncStorage', e);
    }
  };

  export const removeItemFromStorage = async (itemId) => {
    try {
      // Get the stored array
      const jsonValue = await AsyncStorage.getItem('Favorite');
      let itemsArray = jsonValue != null ? JSON.parse(jsonValue) : [];
  
      // Filter out the item you want to remove
      const updatedArray = itemsArray.filter(item => item.Id !== itemId);
  
      // Save the updated array
      await AsyncStorage.setItem('Favorite', JSON.stringify(updatedArray));
      console.log('Item removed successfully');
    } catch (e) {
      console.error('Error removing item from AsyncStorage', e);
    }
  };