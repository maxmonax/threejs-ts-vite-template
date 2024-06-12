import { EventEmitter } from "../../monax/events/EventEmitter";

export enum FrontEventName {
    WINDOW_RESIZE = 'WINDOW_RESIZE'
}

/**
 * Events from front page
 * How to use: GameEvents.getInstance().addListener(GameEvents.ON_WINDOW_RESIZE, () => {}, this);
 */
export class FrontEvents {
    private static instance: FrontEvents;

    private _events: Map<FrontEventName, EventEmitter>;

    private constructor() {
        this._events = new Map();
        Object.keys(FrontEventName).forEach(eventName => {
            this._events.set(eventName as FrontEventName, new EventEmitter());
        });
    }

    static getInstance(): FrontEvents {
        if (!FrontEvents.instance) FrontEvents.instance = new FrontEvents();
        return FrontEvents.instance;
    }

    private getEmitter(aEventName: FrontEventName): EventEmitter {
        return this._events.get(aEventName);
    }

    on(aEventName: FrontEventName, aListener: Function, aCtx?: any) {
        let emitter = this.getEmitter(aEventName);
        if (!emitter) {
            throw new Error(`Event Emitter <${aEventName}> is undefined`);
            return;
        }
        emitter.on(aListener, aCtx);
    }

    off(aEventName: FrontEventName, aListener: Function, aCtx?: any) {
        let emitter = this.getEmitter(aEventName);
        if (!emitter) {
            throw new Error(`Event Emitter <${aEventName}> is undefined`);
            return;
        }
        emitter.off(aListener, aCtx);
    }

    offAllOf(aEventName: FrontEventName) {
        let emitter = this.getEmitter(aEventName);
        if (!emitter) {
            throw new Error(`Event Emitter <${aEventName}> is undefined`);
            return;
        }
        emitter.offAll();
    }

    emit(aEventName: FrontEventName, aData?: any) {
        let emitter = this.getEmitter(aEventName);
        if (!emitter) {
            throw new Error(`Event Emitter <${aEventName}> is undefined`);
            return;
        }
        emitter.emit(aData);
    }

}