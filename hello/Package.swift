// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SinariHello",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "SinariHello",
            targets: ["HelloPluginPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "HelloPluginPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/HelloPluginPlugin"),
        .testTarget(
            name: "HelloPluginPluginTests",
            dependencies: ["HelloPluginPlugin"],
            path: "ios/Tests/HelloPluginPluginTests")
    ]
)