package com.tamilmusic

import android.media.MediaPlayer
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.tamilmusic.utils.MyFiles
import java.io.IOException

class MyModules(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext)  {
    private var mediaPlayer: MediaPlayer? = null

    override fun getName(): String {
        return "AudioPlayerModule"
    }

    @ReactMethod
    fun getAllAudio(): List<String>{
        val mp3FileScanner = MyFiles(reactContext)
        val mp3Files = mp3FileScanner.getAllMP3Files()

        for (mp3File in mp3Files) {
            Log.d("MP3FileScanner", "MP3 File: $mp3File")
        }
        return  mp3Files;
    }

    @ReactMethod
    fun stopAudio() {
        mediaPlayer?.let {
            if (it.isPlaying) {
                it.stop()
            }
            it.release()
        }
        mediaPlayer = null
    }
}