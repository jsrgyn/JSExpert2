class PeerBuilder {
    constructor({ peerConfig }) {
        this.peerConfig = peerConfig

        const defaultFuntionValue = () => {}
        this.onError = defaultFuntionValue
        this.onCallREceived = defaultFuntionValue
        this.onConnectionOpened = defaultFuntionValue
        this.onPeerStreanReceived = defaultFuntionValue
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

        this.onCallREceived(call)
    }

    build() {
        const peer = new Peer(...this.peerConfig)

        peer.on('error', this.onError)
        peer.on('call', this._prepareCallEvent.bind(this))

        return new Promise(resolve => peer.on('open', id => {
            this.onConnectionOpened(peer)
            return resolve(peer)
        }))
    }
}