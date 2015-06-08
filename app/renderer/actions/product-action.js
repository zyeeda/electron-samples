/* @flow */

export default function(context: any, payload: any, done: any): void {
  context.dispatch(payload.actionType, payload);
  done();
}

