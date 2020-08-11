export class FabSpeedDial {
    private _fixed : boolean;
    
    get fixed() { return this._fixed; }
    set fixed(fixed: boolean) {
        this._fixed = fixed;
        if (this._fixed) {
            this.open = true;
        }
    } 

    private _open: boolean;  

    public get open(): boolean {
        return this._open;
    }

    public set open(value: boolean) {
        this._open = value;
    }

    private _spin: boolean = false;
    
    public get spin(): boolean {
        return this._spin;
    }

    public set spin(value: boolean) {
        this._spin = value;
    }

    private _direction: string = 'up';
    public get direction(): string {
        return this._direction;
    }
    public set direction(value: string) {
        this._direction = value;
    }

    private _animationMode: string = 'fling'; 
    public get animationMode(): string {
        return this._animationMode;
    }
    public set animationMode(value: string) {
        this._animationMode = value;
    }

}
