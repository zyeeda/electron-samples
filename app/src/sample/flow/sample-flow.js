/* @flow */

function foo(x) {
  return x*10;
}

// foo("Hello, world!");

function foo(x: string, y: number): number {
  return x.length * y;
}

foo("Hello", 42);