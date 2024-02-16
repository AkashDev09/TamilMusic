package com.tamilmusic.Modules

import android.content.ContentUris
import android.content.Context
import android.net.Uri
import android.provider.MediaStore
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class MyAudioModule(reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "MyAudioModule"
    }

    @ReactMethod
    open fun getAudioFiles(successCallback: Callback) {
        val context: Context = reactApplicationContext
        val contentResolver = context.contentResolver
        val uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
        val selection = MediaStore.Audio.Media.IS_MUSIC + "!= 0"
        val cursor = contentResolver.query(uri, null, selection, null, null)
        val audioArray = Arguments.createArray()
        if (cursor != null) {
            val titleColumnIndex = cursor.getColumnIndex(MediaStore.Audio.Media.TITLE)
            val artistColumnIndex = cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)
            val urlColumnIndex = cursor.getColumnIndex(MediaStore.Audio.Media.DATA)
            val albumIdColumnIndex = cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID)
            while (cursor.moveToNext()) {
                val audioObject = Arguments.createMap()
                val title = cursor.getString(titleColumnIndex)
                val artist = cursor.getString(artistColumnIndex)
                val url = cursor.getString(urlColumnIndex)
                val albumId = cursor.getLong(albumIdColumnIndex)
                val albumArtUri = ContentUris.withAppendedId(
                    Uri.parse("content://media/external/audio/albumart"),
                    albumId
                )
                audioObject.putString("title", title ?: "")
                audioObject.putString("artist", artist ?: "")
                audioObject.putString("url", url ?: "")
                audioObject.putString("albumArtUri", albumArtUri.toString())
                audioArray.pushMap(audioObject)
            }
            cursor.close()
        }
        successCallback.invoke(audioArray)
    }
}