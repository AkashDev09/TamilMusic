package com.tamilmusic

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.tamilmusic.Modules.MyAudioFile
import com.tamilmusic.Modules.ThumbnailExtractorModule
import java.util.Collections

class MyModules : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modules = ArrayList<NativeModule>()
        modules.add(MyAudioFile(reactContext))
        modules.add(ThumbnailExtractorModule(reactContext))
        return modules;
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*,*>> {
        return Collections.emptyList<ViewManager<*,*>>()
    }
}