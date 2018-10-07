import * as express from 'express';
import {Application} from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as root from 'app-root-path';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import * as cors from 'cors';
import * as WebSocket from 'ws';

import IndexController from './controllers/IndexController';
import ConfigurationController from './controllers/ConfigurationController';

import {MessageType} from '../../shared/domain/MessageType';
import {RegistrationHandler} from './handlers/RegistrationHandler';
import {MessageHandler} from './handlers/MessageHandler';
import {SessionStore} from './services/SessionStore';
import {StartSessionHandler} from './handlers/StartSessionHandler';
import {StartPokerHandler} from './handlers/StartPokerHandler';
import {StoryChosenHandler} from './handlers/StoryChosenHandler';
import {EstimateHandler} from './handlers/EstimateHandler';

export default class Server {
    private readonly _app: Application;
    private _server: http.Server;
    private wss: WebSocket.Server;
    private _sessionStore: SessionStore = new SessionStore();

    constructor(app: Application) {
        this._app = app;
        this._app.use(cors());

        this.viewEngineSetup();
        this.loggerSetup();
        this.parserSetup();
        this.routerSetup();

        this.registerErrorHandler();
        this.registerNotFoundHandler();
    }

    get app() {
        return this._app;
    }

    private static errorHandler(error, port) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    public listen(port: number) {
        this._app.set('port', port);
        this._server = http.createServer(this._app);

        this._server.on('error', (error) => Server.errorHandler(error, port));
        this._server.on('listening', () => this.listeningHandler);

        this._server.listen(port);
        this.sockets();
    }

    private listeningHandler() {
        const bind = `port ${this._server.address()}`;
        console.log(`Listening on ${bind}`);
    }

    private viewEngineSetup() {
        this._app.set('views', `${root}/server/views/`);
        this._app.set('view engine', 'ejs');
    }

    private loggerSetup() {
        this._app.use(logger('dev'));
    }

    private parserSetup() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: false}));
        this._app.use(cookieParser());
    }

    private routerSetup() {
        const router = express.Router();

        IndexController.register(this._app);
        ConfigurationController.register(this._app);

        this._app.use('/', router);
    }

    private registerNotFoundHandler() {
        this._app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: any = new Error(`Not Found: ${req.originalUrl}`);
            err.status = 404;
            next(err);
        });
    }

    private registerErrorHandler() {
        if (this._app.get('env') === 'development') {
            // development error handler
            // will print stacktrace
            this._app.use((err: any, req: express.Request, res: express.Response, _: express.NextFunction) => {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        this._app.use((err: any, req: express.Request, res: express.Response, _: express.NextFunction) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }

    private sockets(): void {
        this.wss = new WebSocket.Server({port: 3001});

        const handlers: { [t: string]: MessageHandler } = {};
        handlers[MessageType.REGISTRATION] = new RegistrationHandler(this._sessionStore);
        handlers[MessageType.SESSION_START] = new StartSessionHandler(this._sessionStore);
        handlers[MessageType.START_POKER] = new StartPokerHandler(this._sessionStore);
        handlers[MessageType.STORY_CHOSEN] = new StoryChosenHandler(this._sessionStore);
        handlers[MessageType.ESTIMATE] = new EstimateHandler(this._sessionStore);

        console.log(handlers);

        this.wss.on('connection', function connection(ws: WebSocket) {
            ws.on('message', function incoming(messageString: string) {
                const message = JSON.parse(messageString);

                if (handlers[message._type]) {
                    handlers[message._type].handle(message, ws);
                }
            });

            // ws.send('something');
        });
    }
}
