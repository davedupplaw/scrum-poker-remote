import * as WebSocket from 'ws';

export interface MessageHandler {
    handle(message: any, ws: WebSocket): boolean;
}
