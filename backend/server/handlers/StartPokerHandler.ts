import * as WebSocket from 'ws';
import {MessageHandler} from './MessageHandler';
import {SessionStore} from '../services/SessionStore';
import {StartPoker} from '../../../shared/domain/StartPoker';

export class StartPokerHandler implements MessageHandler {
    constructor(private sessionStore: SessionStore) {}

    handle(message: any, ws: WebSocket): boolean {
        const startPokerMessage = new StartPoker( message._id );

        // Rebroadcast them message to all attendees
        this.sessionStore.broadcastTo( startPokerMessage.id, startPokerMessage );
        return false;
    }
}
