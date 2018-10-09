import * as WebSocket from 'ws';

import {MessageHandler} from './MessageHandler';
import {SessionStore} from '../services/SessionStore';

export class EstimatedStoryHandler implements MessageHandler {
    constructor(private sessionStore: SessionStore) {
    }

    handle(message: any, ws: WebSocket): boolean {
        this.sessionStore.broadcastTo( message._sessionId, message );

        return false;
    }
}
