
export class TypedEventEmitter<T> {
    
    private _listeners: Array<{
        callback: (eventData: T) => void,
        context?: any
    }> = [];

    private getListenerId(aListener: (eventData: T) => void, aCtx?: any): number {
        if (aCtx) {
            return this._listeners.findIndex(item => item.callback === aListener && item.context === aCtx);
        }
        else {
            return this._listeners.findIndex(item => item.callback === aListener);
        }
    }

    on(aListener: (eventData: T) => void, aCtx?: any) {
        this._listeners.push({ callback: aListener, context: aCtx } );
    }

    off(aListener: (eventData: T) => void, aCtx?: any) {
        let id = this.getListenerId(aListener, aCtx);
        while (id >= 0) {
            this._listeners.splice(id, 1);
            id = this.getListenerId(aListener, aCtx);
        }
    }

    offAll() {
        this._listeners = [];
    }

    emit(aEventData: T) {
        this._listeners.forEach(aListener => {
            if (aListener.context) {
                aListener.callback.call(aListener.context, aEventData);
            }
            else {
                aListener.callback(aEventData);
            }
        });
    }

}