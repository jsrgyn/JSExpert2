/**
 *  Aqui vc tem que ter muito cuídado!
 * Browsers Compatíveis com o Media Recorder: https://caniuse.com/?search=media%20r...
 * Reposta no StackOverflow sobre Regex: http://bit.ly/3iQKt3v
 * Não são todos que suportam o media recorder, são poucos neste momento.
 * No chorme mobile nem funciona em alguns dispositovos.
 * Por este motivo que ZOOM preferiu usar o eletron js https://www.electronjs.org/ por conta de compatibilidade para gravar,
 * na web temos todos este problema de compatibilidade entre broswer.
 * https://www.google.com/search?q=electron+js&sxsrf=ALeKk02rI-vt2gfrTiuoQu0cN-dEKNSmfw%3A1616375254298&ei=1u1XYOThEcjW5OUP-q-Q0AY&oq=electron+js&gs_lcp=Cgdnd3Mtd2l6EAEYADIHCCMQsAMQJzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQsAMQQ1AAWABgzRRoAXACeACAAc4CiAHOApIBAzMtMZgBAKoBB2d3cy13aXrIAQrAAQE&sclient=gws-wiz
 * https://www.electronjs.org/apps
*/
class Recorder {
    constructor(userName, stream) {
        this.userName = userName
        this.stream = stream

        this.filefname = `id:${userName}-when:${Date.now()}`
        this.videoType = 'video/webm'

        this.MediaRecorder = {}
        this.recordedBlobs = []
        this.completeRecordings = []
        this.recordingActive = false
    }
    _setup() {
        const commonCodecs = [
            "codecs=vp9,opus",
            "codecs=vp8,opus",
            ""
        ]

        const options = commonCodecs
          .map(codec => ({mimeType: `${this.videoType};${codec}`}))
          .find(options => MediaRecorder.isTypeSupported(options.mimeType))

          if(!options) {
              throw new Error(`none of the codecs: ${commonCodecs.join(',')} are supported`)
          }

          return options
    }
    startRecording() {
        console.log('recording', this.userName, this.filefname)
        const options = this._setup()
        // se não estiver recebendo mais video, já ignora!
        if(!this.stream.active) return;
        this.mediaRecorder = new MediaRecorder(this.stream, options)
        console.log(`Created MediaRecorder ${this.mediaRecorder} with options ${options}`)

        this.mediaRecorder.onstop = (event) => {
            console.log('Recorded Blobs', this.recordedBlobs)
        }

        this.mediaRecorder.ondataavailable = (event) => {
            if(!event.data || !event.data.size) return;

            this.recordedBlobs.push(event.data)
        }

        this.mediaRecorder.start()
        console.log(`Media Recorded started`, this.mediaRecorder)
        this.recordingActive = true;
    }

    async stopRecording() {
        if(!this.recordingActive) return;
        if(this.mediaRecorder.state === "inactive") return;

        console.log('`media recorded stopped!', this.userName)
        this.mediaRecorder.stop()

        this.recordingActive = false
        await Util.sleep(200)

        this.completeRecordings.push([...this.recordedBlobs])
        this.recordedBlobs = []
    }

    getAllVideoURLs() {
        return this.completeRecordings.map(recording => {
            const superBuffer = new Blob(recording, { type: this.videoType})

            return window.URL.createObjectURL(superBuffer)
        })
    }
}