/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <react-native-branch/RNBranch.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Uncomment this line to use the test key instead of the live one.
  //[RNBranch useTestInstance];
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES]; // <-- add this
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Homecooked"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  // Add any custom logic here.
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if (![RNBranch.branch application:application openURL:url options:options]) {
    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
  }
  if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]) {
    return YES;
  }
  
  if ([RCTLinkingManager application:application openURL:url options:options]) {
    return YES;
  }
  
  return NO;
}
  
  
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:sourceApplication
                                                             annotation:annotation
                  ];
  // Add any custom logic here.
  return handled;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}


- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
  return [RNBranch continueUserActivity:userActivity];
}

@end
