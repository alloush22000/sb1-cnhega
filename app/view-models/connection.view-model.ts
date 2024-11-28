import { Observable } from '@nativescript/core';
import { ConnectionService, ConnectionConfig } from '../services/connection.service';

export class ConnectionViewModel extends Observable {
    private connectionService: ConnectionService;
    private _isLoading = false;
    private _errorMessage = '';
    private _connectionType: 'rest' | 'pptp' = 'rest';
    private _ipAddress = '';
    private _username = '';
    private _password = '';
    private _port = '';

    constructor() {
        super();
        this.connectionService = ConnectionService.getInstance();
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    get connectionType(): 'rest' | 'pptp' {
        return this._connectionType;
    }

    set connectionType(value: 'rest' | 'pptp') {
        if (this._connectionType !== value) {
            this._connectionType = value;
            this.notifyPropertyChange('connectionType', value);
        }
    }

    async connect() {
        try {
            this.isLoading = true;
            this.errorMessage = '';

            const config: ConnectionConfig = {
                type: this._connectionType,
                ipAddress: this._ipAddress,
                username: this._username,
                password: this._password,
                port: this._connectionType === 'rest' ? parseInt(this._port, 10) : undefined
            };

            await this.connectionService.connect(config);
            // Handle successful connection
        } catch (error) {
            this.errorMessage = error.message;
        } finally {
            this.isLoading = false;
        }
    }
}