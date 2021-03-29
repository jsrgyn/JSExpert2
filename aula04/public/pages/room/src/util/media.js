class Media {
    // async getCamera(audio = false, video = true) {
        async getCamera(audio = true, video = true) {
        return navigator.mediaDevices.getUserMedia({
            video,
            audio
        })
    }
}