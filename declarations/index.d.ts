/// <reference types="react" />
import { ConnectedComponent } from 'react-redux';
import { Middleware } from 'redux';
import { GetSlice } from './state';
import { Reducer } from './reducer';
import { VoidKeys } from './util';
declare type Listener<T> = (data: T) => void;
declare const reducers: unique symbol;
declare const store: unique symbol;
declare const actionListeners: unique symbol;
export declare class Reduxology<TStateRecord, TActionsRecord, ActionVK extends VoidKeys<TActionsRecord> = VoidKeys<TActionsRecord>, ActionNVK extends Exclude<keyof TActionsRecord, ActionVK> = Exclude<keyof TActionsRecord, ActionVK>, DispatchVK extends VoidKeys<TActionsRecord> = VoidKeys<TActionsRecord>, DispatchNVK extends Exclude<keyof TActionsRecord, DispatchVK> = Exclude<keyof TActionsRecord, DispatchVK>> {
    private [reducers];
    private [actionListeners];
    private [store];
    constructor();
    createContainer: (mapStateToProps: (getSlice: GetSlice<TStateRecord>, ownProps?: any) => any, mapDispatchToProps: (dispatch: Reduxology<TStateRecord, TActionsRecord>['dispatch'], ownProps?: any) => any, component: any) => ConnectedComponent<any, Pick<unknown, never>>;
    createReducer: <K extends keyof TStateRecord>(slice: K, initialData: TStateRecord[K]) => Reducer<TStateRecord[K], TActionsRecord, keyof TActionsRecord extends (TActionsRecord[keyof TActionsRecord] extends void ? keyof TActionsRecord : never) ? (TActionsRecord[keyof TActionsRecord] extends void ? keyof TActionsRecord : never) & keyof TActionsRecord : never, Exclude<keyof TActionsRecord, keyof TActionsRecord extends (TActionsRecord[keyof TActionsRecord] extends void ? keyof TActionsRecord : never) ? (TActionsRecord[keyof TActionsRecord] extends void ? keyof TActionsRecord : never) & keyof TActionsRecord : never>>;
    dispatch<P extends DispatchNVK>(action: P, data: TActionsRecord[P]): void;
    dispatch<P extends DispatchVK>(action: P): void;
    createRoot: (Container: any, ...middleware: Middleware[]) => JSX.Element;
    listen<P extends ActionNVK>(action: P, listener: Listener<TActionsRecord[P]>): void;
    listen<P extends ActionVK>(action: P, listener: () => void): void;
}
export declare const createContainer: (mapStateToProps: (getSlice: GetSlice<unknown>, ownProps?: any) => any, mapDispatchToProps: (dispatch: {
    <P extends never>(action: P, data: unknown): void;
    <P_1 extends never>(action: P_1): void;
}, ownProps?: any) => any, component: any) => ConnectedComponent<any, Pick<unknown, never>>;
export declare const createReducer: <K extends never>(slice: K, initialData: unknown) => Reducer<unknown, unknown, never, never>;
export declare const createRoot: (Container: any, ...middleware: Middleware[]) => JSX.Element;
export declare const dispatch: {
    <P extends never>(action: P, data: unknown): void;
    <P_1 extends never>(action: P_1): void;
};
export declare const listen: {
    <P extends never>(action: P, listener: Listener<unknown>): void;
    <P_1 extends never>(action: P_1, listener: () => void): void;
};
export {};
