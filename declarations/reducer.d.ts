import { Reducer as ReduxReducer } from 'redux';
import { VoidKeys } from './util';
export declare const reduxReducer: unique symbol;
export declare const reducerSlice: unique symbol;
export declare const makeReducerAlive: unique symbol;
declare const actionHandlers: unique symbol;
declare const isAlive: unique symbol;
declare type Handler<S, A> = (slice: S, action: A) => void;
export declare class Reducer<TSliceRecord, TActionsRecord, ActionVK extends VoidKeys<TActionsRecord> = VoidKeys<TActionsRecord>, ActionNVK extends Exclude<keyof TActionsRecord, ActionVK> = Exclude<keyof TActionsRecord, ActionVK>> {
    private [actionHandlers];
    [reduxReducer]: ReduxReducer;
    [reducerSlice]: string;
    private [isAlive];
    constructor(sliceName: string, init: any);
    handle<P extends ActionNVK>(action: P, handler: Handler<TSliceRecord, TActionsRecord[P]>): void;
    handle<P extends ActionVK>(action: P, handler: () => void): void;
    [makeReducerAlive](): void;
}
export {};
