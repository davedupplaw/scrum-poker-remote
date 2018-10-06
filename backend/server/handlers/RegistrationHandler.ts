import * as WebSocket from 'ws';

import {MessageHandler} from './MessageHandler';
import {Registration} from '../../../shared/domain/Registration';
import {SessionStore} from '../services/SessionStore';

/**
 * Class to handle messages for new registrations to a planning session.
 */
export class RegistrationHandler implements MessageHandler {
    constructor( private _sessionStore: SessionStore ) {
    }

    handle(message: any, ws: WebSocket): boolean {
        const registration = Registration.fromJson( message );
        console.log( 'Registration received.', registration );

        this._sessionStore.register(registration, ws);

        return false;
    }
}
