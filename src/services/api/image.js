import request from "Homecooked/src/utils/request";

const uploadImage = file => {
    var form = new FormData();
    form.append("image", {
        uri: file.uri,
        name: file.fileName,
        type: file.type
    });
    return request({
        method: "POST",
        headers: {
            "Content-Type":
                "multipart/form-data; boundary=--------------------------183055608420652174343921"
        },
        url: "/image",
        data: form
    });
};

const ImageService = {
    uploadImage
};

export default ImageService;
