package com.homecooked;

import android.app.Application;

import com.facebook.react.ReactApplication;
import iyegoroff.RNColorMatrixImageFilters.ColorMatrixImageFiltersPackage;
import com.urbanairship.reactnative.ReactAirshipPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.branch.rnbranch.RNBranchPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.imagepicker.ImagePickerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ColorMatrixImageFiltersPackage(),
            new ReactAirshipPackage(),
            new FastImageViewPackage(),
            new FBSDKPackage(),
            new RNBranchPackage(),
            new RNSensitiveInfoPackage(),
            new ImagePickerPackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
