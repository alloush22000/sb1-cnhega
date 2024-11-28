import { Observable } from '@nativescript/core';
import { ConnectionConfig, ConnectionState } from '../models/connection.model';

export class ConnectionService extends Observable {
    private static instance: ConnectionService;
    private _state: ConnectionState = {
        isConnected: false,
        isLoading: false,
        error: null
    };

    static getInstance(): ConnectionService {
        if (!ConnectionService.instance) {
            ConnectionService.instance = new ConnectionService();
        }
        return ConnectionService.instance;
    }

    get state(): ConnectionState {
        return this._state;
    }

    async connect(config: ConnectionConfig): Promise<boolean> {
        try {
            this.updateState({ isLoading: true, error: null });
            
            // Validate connection parameters
            this.validateConfig(config);
            
            // Simulate connection (replace with actual MikroTik API implementation)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.updateState({ isConnected: true, isLoading: false });
            return true;
        } catch (error) {
            this.updateState({ 
                isConnected: false, 
                isLoading: false, 
                error: error.message 
            });
            throw error;
        }
    }

    disconnect(): void {
        this.updateState({
            isConnected: false,
            isLoading: false,
            error: null
        });
    }

    private validateConfig(config: ConnectionConfig): void {
        if (!config.ipAddress || !config.username || !config.password) {
            throw new Error('Required fields missing');
        }

        if (config.type === 'rest' && !config.port) {
            throw new Error('Port number is required for REST API connection');
        }

        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(config.ipAddress)) {
            throw new Error('Invalid IP address format');
        }
    }

    private updateState(newState: Partial<ConnectionState>): void {
        this._state = { ...this._state, ...newState };
        this.notifyPropertyChange('state', this._state);
    }
}