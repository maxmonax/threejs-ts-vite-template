
export class EventEmitter {
    
    private _listeners: Array<{
        callback: Function,
        context?: any
    }> = [];

    private getListenerId(aListener: Function, aCtx?: any): number {
        if (aCtx) {
            return this._listeners.findIndex(item => item.callback === aListener && item.context === aCtx);
        }
        else {
            return this._listeners.findIndex(item => item.callback === aListener);
        }
    }

    on(aListener: Function, aCtx?: any) {
        this._listeners.push({ callback: aListener, context: aCtx } );
    }

    off(aListener: Function, aCtx?: any) {
        let id = this.getListenerId(aListener, aCtx);
        while (id >= 0) {
            this._listeners.splice(id, 1);
            id = this.getListenerId(aListener, aCtx);
        }
    }

    offAll() {
        this._listeners = [];
    }

    emit(aEventData?: any) {
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