import * as WebSocket from 'ws';

import {MessageHandler} from './MessageHandler';
import {SessionStore} from '../services/SessionStore';
import {Estimate} from '../../../shared/domain/Estimate';

export class EstimateHandler implements MessageHandler {
    constructor(private sessionStore: SessionStore) {
    }

    handle(message: any, ws: WebSocket): boolean {
        const estimate = new Estimate( message._whom, message._estimate, message._story, message._sessionId );

        this.sessionStore.estimate( estimate );

        return false;
    }
}
