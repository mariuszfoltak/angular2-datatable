export class BoolState {

    public constructor(public state:boolean) {
    }

    public changeState(): void {
        this.state = !this.state;
    }

    public getState(): boolean {
        return this.state;
    }
}