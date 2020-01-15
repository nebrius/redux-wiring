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

import { connect, ConnectedComponent } from 'react-redux';
import { state, State } from './state';

type MapStateToProps = (state: State) => any;
type MapDispatchToProps = (dispatch: (action: string, data: any) => void) => any;

export type Container = ConnectedComponent<any, Pick<unknown, never>>;

export interface CreateContainerOptions {
  mapStateToProps: MapStateToProps;
  mapDispatchToProps: MapDispatchToProps;
  component: any; // Type is too loose
}

export function createContainer(options: CreateContainerOptions): Container;
export function createContainer(
  mapStateToProps: MapStateToProps,
  mapDispatchToProps: MapDispatchToProps,
  component: any
): Container;
export function createContainer(
  optionsOrMapStateToProps: CreateContainerOptions | MapStateToProps,
  mapDispatchToProps?: MapDispatchToProps,
  component?: any
): Container {
  let mapStateToProps: MapStateToProps;
  if (typeof optionsOrMapStateToProps === 'object') {
    mapStateToProps = optionsOrMapStateToProps.mapStateToProps;
    mapDispatchToProps = optionsOrMapStateToProps.mapDispatchToProps;
    component = optionsOrMapStateToProps.component;
  } else {
    mapStateToProps = optionsOrMapStateToProps;
  }
  return createContainerWrapper(mapStateToProps, mapDispatchToProps as MapDispatchToProps, component);
}

function createContainerWrapper(
  mapStateToProps: MapStateToProps,
  mapDispatchToProps: MapDispatchToProps,
  component: any
): Container {
  console.log('createContainer', mapStateToProps, mapDispatchToProps, component);
  return connect(
    (rawState) => mapStateToProps(state),
    mapDispatchToProps
  )(component);
}
