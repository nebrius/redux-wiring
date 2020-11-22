import { Reducer as ReduxReducer } from 'redux';
import { VoidKeys } from './util';
export declare const reduxReducer: unique symbol;
declare const actionHandlers: unique symbol;
declare type Handler<S, A> = (slice: S, action: A) => S;
export declare class Reducer<TSliceRecord, TActionsRecord, ActionVK extends VoidKeys<TActionsRecord> = VoidKeys<TActionsRecord>, ActionNVK extends Exclude<keyof TActionsRecord, ActionVK> = Exclude<keyof TActionsRecord, ActionVK>> {
    [reduxReducer]: ReduxReducer;
    private [actionHandlers];
    constructor(init: any);
    handle<P extends ActionNVK>(action: P, handler: Handler<TSliceRecord, TActionsRecord[P]>): void;
    handle<P extends ActionVK>(action: P, handler: () => void): void;
    removeHandler: (actionType: string) => void;
    isHandlerRegistered: (actionType: string) => boolean;
}
export {};
