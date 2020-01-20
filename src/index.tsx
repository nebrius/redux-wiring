/*
MIT License

Copyright (c) Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { Dispatch } from 'react';
import { createStore, Store, Reducer as ReduxReducer, combineReducers } from 'redux';
import { State } from './state';
import { Reducer, reduxReducer } from './reducer';

type MapStateToProps = (state: State) => any;
type MapDispatchToProps = (dispatch: (action: string, data?: any) => void) => any;

const reducers = Symbol('reducers');
const store = Symbol('store');

export class ReduxWiring {

  private [reducers]: Record<string, Reducer> = {};
  private [store]: Store;

  public createContainer = (
    mapStateToProps: MapStateToProps,
    mapDispatchToProps: MapDispatchToProps,
    component: any
  ) => {
    return connect(
      (rawState: any) => mapStateToProps(new State(rawState)),
      (rawDispatch: Dispatch<any>) => mapDispatchToProps((type, data) => rawDispatch({ type, data }))
    )(component);
  }

  public createReducer = (dataType: string, initialData: any): Reducer => {
    if (typeof dataType !== 'string') {
      throw new Error('"dataType" argument must be a string');
    }
    if (this[reducers].hasOwnProperty(dataType)) {
      throw new Error(`Cannot create reducer at ${dataType} because that type is already taken`);
    }
    const reducer = new Reducer(initialData);
    this[reducers][dataType] = reducer;
    return reducer;
  }

  public dispatch = (type: string, data: any) => {
    this[store].dispatch({ type, data });
  }

  public createRoot = (Container: any) => {
    const reducerSet: Record<string, ReduxReducer> = {};
    // tslint:disable forin
    for (const dataType in this[reducers]) {
      const reducer = this[reducers][dataType];
      reducerSet[dataType] = reducer[reduxReducer];
    }
    this[store] = createStore(combineReducers(reducerSet));
    return (
      <Provider store={this[store]}>
        <Container />
      </Provider>
    );
  }
}

const defaultWiring = new ReduxWiring();

export const createContainer = defaultWiring.createContainer;
export const createReducer = defaultWiring.createReducer;
export const createRoot = defaultWiring.createRoot;
export const dispatch = defaultWiring.dispatch;
