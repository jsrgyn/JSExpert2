class Business {
    constructor ({ room, media, view, socketBuilder, peerBuilder}) {
        this.room = room
        this.media = media
        this.view = view

        this.socketBuilder = socketBuilder
                            // .setOnUserConnected(this.onUserConnected())
                            // .setOnUserDisconnected(this.onUserDisconnected())
                            // .build()
        this.peerBuilder = peerBuilder

        
        this.socket = {} 

        this.currentStream = {}
        
        this.currentPeer = {}

        this.peers = new Map()
    }

    static initialize(deps) {
        const instance = new Business(deps)
        return instance._init()
    }

    // _init() {
    //     this.currentStream = this.media.getCamera()
    //     console.log('init!!', this.currentStream)
    // }

    async _init() {
        
        this.currentStream = await this.media.getCamera()

        this.socket = this.socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconnected(this.onUserDisconnected())
            .build()

        // this.socket.emit('join-room', this.room, 'teste01')
        this.currentPeer = await this.peerBuilder
            .setOnError(this.onPeerError())
            .setOnConnectionOpened(this.onPeerConnectionOpened())
            .setOnCallReceived(this.onPeerCallReceived())
            .setOnPeerStreamReceived(this.onPeerStreamReceived())
            .build()

        // this.currentStream = await this.media.getCamera(true)
        console.log('init!!', this.currentStream)

        this.addVideoStream('test01')
    }

    addVideoStream(userId, stream = this.currentStream ) {
        const isCurrentId = false
        this.view.renderVideo({
            userId,
            muted: true,
            stream,
            isCurrentId
        })
    }

    onUserConnected = function()  {
        return userId => {
            console.log('user connected!', userId)
            this.currentPeer.call(userId, this.currentStream)
        }
    } 

    onUserDisconnected = function() {
        return userId => {
            console.log('user disconnected!', userId)
        }
    }

    onPeerError = function() {
        return error => {
            console.error('error on peer!', error)
        }
    }

    onPeerConnectionOpened = function () {
        return (peer) => {
            const id = peer.id
            console.log('peer!!', peer) 
            this.socket.emit('join-room', this.room, id)
        }
    }

    onPeerCallReceived = function () {
        return call => {
            console.log('answering call', call)
            call.answer(this.currentStream)
        }
    }

    onPeerStreamReceived = function () {
        return (call, stream) => {
            const callerId = call.peer
            this.addVideoStream(callerId, stream)
            this.peers.set(callerId, {call})
            this.view.setParticipants(this.peers.size)
        }
        
    }
 }