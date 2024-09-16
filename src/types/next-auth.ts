import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User{
        _id: string;
        username?: string;
        role?: string;
        isVerified?: boolean;
        
        
    }
    interface Session{
        user: {
        _id: string;
        isVerified?: boolean;
        username?: string;
        role?: string;
        }&DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT{
        _id: string;
        isVerified?: boolean;
        role?: string;
        username?: string;
    }
}