import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} from "react-native-fbsdk";

// ref: https://medium.com/building-with-react-native/coding-with-facebook-login-in-react-native-like-a-pro-1x06-9064fc2f5bfc

export class FacebookService {
    constructor(onSuccess, onError) {
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    login = async () => {
        let result;
        try {
            LoginManager.setLoginBehavior("native");
            result = await LoginManager.logInWithReadPermissions([
                "public_profile",
                "email"
            ]);
        } catch (nativeError) {
            try {
                LoginManager.setLoginBehavior("web");
                result = await LoginManager.logInWithReadPermissions([
                    "public_profile",
                    "email"
                ]);
            } catch (webError) {
                this.onError(webError);
            }
        }
        // handle the case that users clicks cancel button in Login view
        if (result.isCancelled) {
            console.log("Cancelled");
        } else {
            // Create a graph request asking for user information
            this.FBGraphRequest(
                "id, email, picture.type(large), first_name, last_name",
                this.FBLoginCallback
            );
        }
    };

    async FBGraphRequest(fields, callback) {
        const accessData = await AccessToken.getCurrentAccessToken();
        // Create a graph request asking for user information
        const infoRequest = new GraphRequest(
            "/me",
            {
                accessToken: accessData.accessToken,
                parameters: {
                    fields: {
                        string: fields
                    }
                }
            },
            callback.bind(this)
        );
        // Execute the graph request created above
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    async FBLoginCallback(error, result) {
        if (error) {
            this.onError("FACEBOOK_GRAPH_REQUEST_ERROR");
        } else {
            // Retrieve and save user details in state. In our case with
            this.onSuccess(result);
        }
    }
}
