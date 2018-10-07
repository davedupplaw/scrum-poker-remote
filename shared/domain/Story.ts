import {Message} from './Message';
import {MessageType} from './MessageType';

export class Story extends Message {
    constructor( private _sessionId: string,
                 private _number: string,
                 private _title: string ) {
        super( MessageType.STORY_CHOSEN );
    }

    get sessionId(): string { return this._sessionId; }
    get number(): string { return this._number; }
    set number(number: string) { this._number = number; }
    get title(): string { return this._title; }
    set title(title: string) { this._title = title; }
}