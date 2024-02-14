package com.tamilmusic.utils

import android.content.ContentResolver
import android.content.Context
import android.database.Cursor
import android.net.Uri
import android.provider.MediaStore

class MyFiles(private val context: Context) {
    fun getAllMP3Files(): List<String> {
        val mp3Files = mutableListOf<String>()

        // Get MP3 files from internal storage
        // mp3Files.addAll(getMP3FilesFromUri(MediaStore.Audio.Media.INTERNAL_CONTENT_URI))

        // Get MP3 files from external storage
        mp3Files.addAll(getMP3FilesFromUri(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI))

        return mp3Files
    }

    private fun getMP3FilesFromUri(uri: Uri): List<String> {
        val mp3Files = mutableListOf<String>()
        val contentResolver: ContentResolver = context.contentResolver
        val selection = "${MediaStore.Audio.Media.IS_MUSIC} != 0"
        val projection = arrayOf(MediaStore.Audio.Media.DATA)

        val cursor: Cursor? = contentResolver.query(
            uri,
            projection,
            selection,
            null,
            null
        )

        cursor?.use {
            val dataColumn: Int = it.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA)
            while (it.moveToNext()) {
                val data = it.getString(dataColumn)
                mp3Files.add(data)
            }
        }

        return mp3Files
    }
}