package com.tamilmusic.Modules

import android.util.Log
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.tamilmusic.utils.MyFiles

class MyAudioFile internal constructor(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val mp3FileScanner = MyFiles(reactContext);

    override fun getName(): String {
        return "MyFileAccess"
    }

    @ReactMethod
    fun getAllAudio(callback: Callback){
        Log.d("MP3FileScanner", "MP3 File:")
        val mp3Files = mp3FileScanner.getAllMP3Files()

//        for (mp3File in mp3Files) {
//            Log.d("MP3FileScanner", "MP3 File: $mp3File")
//        }
        callback(mp3Files.toString());
    }

}