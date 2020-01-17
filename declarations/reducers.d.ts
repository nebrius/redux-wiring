import { Reducer as ReduxReducer } from 'redux';
export declare type ReducerActionListener = (state: any, action: any) => any;
declare const reduxReducer: unique symbol;
declare const actionHandlers: unique symbol;
export declare class Reducer {
    [reduxReducer]: ReduxReducer;
    private [actionHandlers];
    constructor(init: any);
    registerActionHandler: (actionType: string, listener: ReducerActionListener) => Reducer;
    unregisterActionHandler: (actionType: string) => void;
    isActionHandlerRegistered: (actionType: string) => boolean;
}
export declare function createReducer(dataId: string, initialData: any): Reducer;
export declare function buildReduxReducerSet(): ReduxReducer;
export {};
