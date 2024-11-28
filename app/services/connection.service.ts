import { Observable } from '@nativescript/core';

export interface ConnectionConfig {
    type: 'rest' | 'pptp';
    ipAddress: string;
    username: string;
    password: string;
    port?: number;
}

export class ConnectionService extends Observable {
    private static instance: ConnectionService;
    private currentConfig: ConnectionConfig | null = null;

    static getInstance(): ConnectionService {
        if (!ConnectionService.instance) {
            ConnectionService.instance = new ConnectionService();
        }
        return ConnectionService.instance;
    }

    async connect(config: ConnectionConfig): Promise<boolean> {
        try {
            // Validate connection parameters
            this.validateConfig(config);

            // Simulate connection (replace with actual implementation)
            await new Promise(resolve => setTimeout(resolve, 1500));

            this.currentConfig = config;
            return true;
        } catch (error) {
            console.error('Connection error:', error);
            throw error;
        }
    }

    private validateConfig(config: ConnectionConfig): void {
        if (!config.ipAddress || !config.username || !config.password) {
            throw new Error('Required fields missing');
        }

        if (config.type === 'rest' && !config.port) {
            throw new Error('Port number is required for REST API connection');
        }

        // Validate IP address format
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(config.ipAddress)) {
            throw new Error('Invalid IP address format');
        }
    }
}