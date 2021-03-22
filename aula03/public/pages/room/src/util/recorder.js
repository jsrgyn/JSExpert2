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
    }
    _setup() {
        const commonCodecs = [
            "codecs=vp9,opus",
            "codecs=vp8,opus",
            ""
        ]

        const options = commonCodecs
          .map(codec => ({mimeType: ``}))
    }
    startRecording() {
        console.log('recording', this.userName, this.filefname)
    }
}