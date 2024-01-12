import React, { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';

function AudioList() {
  const [audioFiles, setAudioFiles] = useState([]);

  // const requestStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'Storage Permission',
  //         message: 'App needs access to your storage to read files.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Permission granted, proceed with file access
  //       readFileContents();
  //     } else {
  //       console.log('Storage permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const directoryPath = RNFS.ExternalStorageDirectoryPath + '/Download';
        const files = await RNFS.readDir(directoryPath);
        const audioFiles = files.filter(file => file.isFile() && file.name.endsWith('.mp3'));
        setAudioFiles(audioFiles);
      } catch (error) {
        console.error('Error fetching audio files:', error.message);
      }
    };

    fetchAudioFiles();
  }, []);
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.path}</Text>
    </View>
  );
  console.log(audioFiles, "haii");

  return (
    <View>
      <FlatList
        data={audioFiles}
        renderItem={renderItem}
        keyExtractor={item => item.path}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AudioList;
