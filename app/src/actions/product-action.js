/* @flow */

export default function (context, payload, done) {
  context.dispatch(payload.actionType, payload);
  done();
};
