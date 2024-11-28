import { Observable } from '@nativescript/core';
import { ConnectionService } from '../services/connection.service';
import { ConnectionConfig, ConnectionState } from '../models/connection.model';

export class ConnectionViewModel extends Observable {
    private connectionService: ConnectionService;
    private _connectionType: 'rest' | 'pptp' = 'rest';
    private _ipAddress = '';
    private _username = '';
    private _password = '';
    private _port = '';

    constructor() {
        super();
        this.connectionService = ConnectionService.getInstance();
    }

    get connectionType(): 'rest' | 'pptp' {
        return this._connectionType;
    }

    set connectionType(value: 'rest' | 'pptp') {
        if (this._connectionType !== value) {
            this._connectionType = value;
            this.notifyPropertyChange('connectionType', value);
            this.notifyPropertyChange('isRestType', this.isRestType);
        }
    }

    get ipAddress(): string {
        return this._ipAddress;
    }

    set ipAddress(value: string) {
        if (this._ipAddress !== value) {
            this._ipAddress = value;
            this.notifyPropertyChange('ipAddress', value);
        }
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange('username', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get port(): string {
        return this._port;
    }

    set port(value: string) {
        if (this._port !== value) {
            this._port = value;
            this.notifyPropertyChange('port', value);
        }
    }

    get isRestType(): boolean {
        return this._connectionType === 'rest';
    }

    get state(): ConnectionState {
        return this.connectionService.state;
    }

    async connect() {
        try {
            const config: ConnectionConfig = {
                type: this._connectionType,
                ipAddress: this._ipAddress,
                username: this._username,
                password: this._password,
                port: this._connectionType === 'rest' ? parseInt(this._port, 10) : undefined
            };

            await this.connectionService.connect(config);
        } catch (error) {
            console.error('Connection error:', error);
        }
    }

    disconnect() {
        this.connectionService.disconnect();
    }
}