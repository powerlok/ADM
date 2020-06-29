import { Injectable } from "@angular/core";

@Injectable()
export class Utils {
    
    guidId(){
        let id: string = '_' + Math.random().toString(36).substr(2, 9);
        return id;
    }
}