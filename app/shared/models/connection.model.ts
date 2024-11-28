export interface ConnectionConfig {
    type: 'rest' | 'pptp';
    ipAddress: string;
    username: string;
    password: string;
    port?: number;
}

export interface ConnectionState {
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
}