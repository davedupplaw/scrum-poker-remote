import * as WebSocket from 'ws';

import {MessageHandler} from './MessageHandler';
import {Story} from '../../../shared/domain/Story';
import {SessionStore} from '../services/SessionStore';

export class StoryChosenHandler implements MessageHandler {
    constructor(private sessionStore: SessionStore) {
    }

    handle(message: any, ws: WebSocket): boolean {
        const storyChosen = new Story( message._sessionId, message._number, message._title );

        this.sessionStore.storyChosen( storyChosen );

        return false;
    }
}
