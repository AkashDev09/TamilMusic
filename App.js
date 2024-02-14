import React, { useEffect } from 'react';
import My_stack from './navigation/My_stack';
import { PermissionsAndroid, NativeModules } from 'react-native';
import { SongsLists } from './Store/action';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
 

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to store files.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Storage permission granted');
        _getAllAudios();
      } else {
        // console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _getAllAudios = async () => {
    NativeModules.MyFileAccess.getAllAudio(list => {
      const fList = String(`1__${list}__1`).split(', ');
      fList[0] = fList[0].replace('1__[', '');
      fList[fList.length - 1] = fList[fList.length - 1].replace(']__1', '');
      Createlist(fList);
    });
  };

  function Createlist(SongsList) {

    let Ayy = [];
    for (let index = 0; index < SongsList.length; index++) {
      let ob = {};
      const element = SongsList[index];
      let frist = String(element).split('/');
      let sen = frist[frist.length - 1].split('.')[0];
      ob['name'] = sen;
      ob['streamURL'] = element;
      ob['imageURL'] = '';
      ob['Id'] = index + 1;
      ob['scrollId'] = index;
      ob['desc'] = 'Unkown Artist';
      Ayy.push(ob);
    }
    dispatch(SongsLists(Ayy));
    return Ayy;
  }





  useEffect(() => {
    requestStoragePermission();
  }, []);
  return <My_stack />;
};

export default App;
