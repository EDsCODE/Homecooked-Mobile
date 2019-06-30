import Permissions from "react-native-permissions";
import _ImagePicker from "react-native-image-picker";
import { Alert } from "react-native";

export const ImagePicker = async () => {
    let checkPermissions = () => {
        return Permissions.check("photo");
    };

    let requestPermissions = () => {
        return Permissions.request("photo");
    };

    let launchImageLibrary = () => {
        const options = {
            title: "Select Image",
            storageOptions: {
                skipBackup: true,
                path: "images"
            }
        };
        return _showImagePicker(options);
    };

    let alertForPhotosPermission = () => {
        Alert.alert(
            "Can we access your photos?",
            "We need access so you can set your pictures",
            [
                {
                    text: "No thanks",
                    onPress: () => console.log("Permission denied"),
                    style: "cancel"
                },
                { text: "Open Settings", onPress: Permissions.openSettings }
            ]
        );
    };

    try {
        let permissionCheck = await checkPermissions();
        console.log(permissionCheck);
        if (permissionCheck == "authorized") {
            let response = await launchImageLibrary();
            return response;
        } else if (permissionCheck == "undetermined") {
            let permissionRequest = await requestPermissions();
            if (permissionRequest == "authorized") {
                let response = await launchImageLibrary();
                return response;
            } else {
                alertForPhotosPermission();
            }
        } else {
            alertForPhotosPermission();
        }
    } catch (error) {
        return error;
    }
};

const _showImagePicker = options => {
    return new Promise((resolve, reject) => {
        _ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel || response.error) {
                resolve(null);
            } else {
                resolve(response);
            }
        });
    });
};
