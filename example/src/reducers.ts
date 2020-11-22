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

import { createReducer } from './reduxology';

const appointmentsReducer = createReducer('Appointments', {
  appointments: []
});

appointmentsReducer.handle('AddAppointment', (state, { time, duration }) => {
  let id = 0;
  for (const appointment of state.appointments) {
    if (id <= appointment.id) {
      id = appointment.id + 1;
    }
  }
  state.appointments.push({ id, time, duration });
});

appointmentsReducer.handle(
  'CancelAppointment',
  (state, appointmentToCancel) => {
    for (let i = 0; i < state.appointments.length; i++) {
      if (state.appointments[i].time === appointmentToCancel.time) {
        state.appointments.splice(i, 1);
      }
    }
  }
);
