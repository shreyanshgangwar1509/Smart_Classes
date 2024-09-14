import { Resourse } from "@/model/student";
export interface ApiResponse {
    success: boolean,
    message: string,
    isAcceptingMessage?: boolean,
    messages?:Array<Resourse>
    
}

