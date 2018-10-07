import * as WebSocket from 'ws';

import {MessageHandler} from './MessageHandler';
import {SessionStore} from '../services/SessionStore';
import {Session} from '../../../shared/domain/Session';

export class StartSessionHandler implements MessageHandler {
    constructor(private _sessionStore: SessionStore) {}

    handle(message: any, ws: WebSocket): boolean {
        const session = new Session( message._name, message._id, message._facilitator );
        console.log( 'Received session start', session );

        this._sessionStore.startSession( session, ws );

        return false;
    }
}
