class PeerBuilder {
    constructor({ peerConfig }) {
        this.peerConfig = peerConfig

        const defaultFuntionValue = () => {}
        this.onError = defaultFuntionValue
        this.onCallREceived = defaultFuntionValue
        this.onConnectionOpened = defaultFuntionValue
        this.onPeerStreanReceived = defaultFuntionValue
        this.onCallError = defaultFuntionValue
        this.onCallClose = defaultFuntionValue
    }

    setOnCallError(fn) {
        this.onCallError = fn

        return this
    }

    setOnCallClose(fn) {
        this.onCallClose = fn

        return this
    }

    setOnError(fn) {
        this.onError = fn

        return this

    }

    setOnCallReceived(fn) {
        this.onCallREceived = fn

        return this
    }

    setOnConnectionOpened(fn) {
        this.onConnectionOpened = fn

        return this
    }

    setOnPeerStreamReceived(fn) {
        this.onPeerStreanReceived = fn

        return this
    }

    _prepareCallEvent(call) {
        call.on('stream', stream => this.onPeerStreanReceived(call, stream))
        call.on('error', error => this.onCallError(call, error)) 
        call.on('close', _ => this.onCallClose(call))
        this.onCallREceived(call)
    }

    // adicionar o comportamento dos eventos de call também para quem ligar!
    _preparePeerInstanceFunction(peerModule) {
        class PeerCustomModule extends peerModule {}

        const peerCall = PeerCustomModule.prototype.call
        const context = this
        PeerCustomModule.prototype.call = function (id, stream) {
            const call = peerCall.apple(this, [id, stream])
            // aqui acontece a magia, interceptamos o call e adicionamos todos os eventos
            // da chamada para quem liga também
            context._prepareCallEvent(call)

            return call
        }

        return PeerCustomModule
    } 

    build() {
        const PeerCustomInstance = this._preparePeerInstanceFunction(Peer)
        // const peer = new Peer(...this.peerConfig)
        const peer = new PeerCustomInstance(...this.peerConfig)

        peer.on('error', this.onError)
        peer.on('call', this._prepareCallEvent.bind(this))

        return new Promise(resolve => peer.on('open', id => {
            this.onConnectionOpened(peer)
            return resolve(peer)
        }))
    }
}