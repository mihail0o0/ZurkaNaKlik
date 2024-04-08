export class AuthError extends Error {
    constructor(message, type, error) {
        super(message);
        this.name = 'AuthError';
        this.type = type;
        this.error = error;
    }
}

