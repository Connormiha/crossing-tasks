declare var bem: any;
declare var immutable: any;
declare var global: any;

declare module 'bem-cn' {
  var x: any;
  export = x;
}

declare module 'seamless-immutable' {
  var x: any;
  export = x;
}

declare module 'redux-batched-actions' {
  export function enableBatching(reducer: any): any;
  export function batchActions(actions: Array<any>): any;
}
