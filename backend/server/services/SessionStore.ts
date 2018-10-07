import * as WebSocket from 'ws';

import {Registration} from '../../../shared/domain/Registration';
import {Session} from '../../../shared/domain/Session';
import {Message} from '../../../shared/domain/Message';
import {EndSession} from '../../../shared/domain/EndSession';
import {Deregister} from '../../../shared/domain/Deregister';
import {ActiveParticipants} from '../../../shared/domain/ActiveParticipants';

export class SessionStore {
    private _sessionsInProgress: {[sessionId: string]: Session} = {};
    private _sessionToSocketMap: {[sessionId: string]: WebSocket[]} = {};
    private _sessionToRegistrations: {[sessionId: string]: {[regId: string]: Registration}} = {};
    private _sessionLeaderSockets: {[sessionId: string]: WebSocket} = {};

    register( registration: Registration, ws: WebSocket ) {
        const sessionId = registration.session;
        console.log('Registering ', registration.name);

        if ( !this._sessionsInProgress[sessionId] ) {
            console.log( 'No such session' );
        } else {
            // Tell the player about the session they registered with
            ws.send(JSON.stringify(this.sessionFor(sessionId)));

            // Tell the player who is already registered with the session
            const registrations = this.registrationsFor(sessionId);
            ws.send(JSON.stringify(new ActiveParticipants(Object.keys(registrations).map(k => registrations[k]))));

            this._sessionToRegistrations[sessionId][registration.id] = registration;
            this._sessionToSocketMap[sessionId].push( ws );

            // Tell everyone this registration happened
            this.broadcastTo(registration.session, registration);

            ws.onclose = () => this.deregister(registration, ws);
            ws.onerror = () => this.deregister(registration, ws);

            this.sessionStats();
        }
    }

    deregister(registration: Registration, ws: WebSocket) {
        const sessionId = registration.session;

        if ( this._sessionsInProgress[sessionId] ) {
            delete this._sessionToRegistrations[sessionId][registration.id];

            const index = this._sessionToSocketMap[sessionId].indexOf( ws );
            this._sessionToSocketMap[sessionId].splice(index, 1);

            this.broadcastTo(sessionId, new Deregister(registration) );

            console.log('Deregistered ', registration);
            this.sessionStats();
        }
    }

    startSession( session: Session, ws: WebSocket ) {
        const sessionId = session.id;

        if ( !this._sessionsInProgress[sessionId] ) {
            this._sessionToRegistrations[sessionId] = {};
            this._sessionToSocketMap[sessionId] = [];
            this._sessionsInProgress[sessionId] = session;
            this._sessionLeaderSockets[sessionId] = ws;

            ws.onclose = () => this.endSession( sessionId );
            ws.onerror = () => this.endSession( sessionId );
        } else {
            console.log( 'Session already in progress' );
        }
    }

    socketsFor( sessionId: string ) {
        return this._sessionToSocketMap[sessionId];
    }

    registrationsFor( sessionId: string ) {
        return this._sessionToRegistrations[sessionId];
    }

    endSession( sessionId: string ) {
        this.broadcastTo( sessionId, new EndSession(sessionId) );

        delete this._sessionsInProgress[sessionId];
        delete this._sessionToRegistrations[sessionId];
        delete this._sessionToSocketMap[sessionId];
        delete this._sessionLeaderSockets[sessionId];

        console.log( 'Ended session', sessionId );
        this.sessionStats();
    }

    broadcastTo(sessionId: string, message: Message) {
        if ( this._sessionsInProgress[sessionId] ) {
            const msgStr = JSON.stringify(message);
            this._sessionLeaderSockets[sessionId].send(msgStr);
            this._sessionToSocketMap[sessionId].forEach(ws => {
                ws.send(msgStr);
            });
        }
    }

    private sessionStats() {
        console.log('Session count: ', Object.keys(this._sessionsInProgress).length);
        console.log('Registration Counts: ', Object.keys(this._sessionToRegistrations)
            .map(sid => `${sid} = ${Object.keys(this._sessionToRegistrations[sid]).length}`));
    }

    sessionFor(sessionId: string) {
        return this._sessionsInProgress[sessionId];
    }
}
