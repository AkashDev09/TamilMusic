package com.tamilmusic.Modules

import android.media.MediaMetadataRetriever
import android.util.Base64
import com.facebook.react.bridge.*
import java.io.ByteArrayOutputStream

class ThumbnailExtractorModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ThumbnailExtractor"
    }

    @ReactMethod
    fun extractThumbnail(uri: String, promise: Promise) {
        val retriever = MediaMetadataRetriever()
        retriever.setDataSource(uri)

        val rawArt = retriever.embeddedPicture

        retriever.release()

        if (rawArt != null) {
            val outputStream = ByteArrayOutputStream()
            outputStream.write(rawArt)
            val base64String =Base64.encodeToString(outputStream.toByteArray(), Base64.DEFAULT)
            promise.resolve(base64String)
        } else {
            promise.reject("THUMBNAIL_NOT_FOUND", "No thumbnail found in the MP3 file.")
        }
    }
}