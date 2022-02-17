export const zip = <A, B>(a: A[], b: B[]) => a.map((k, i) => [k, b[i]] as [A, B]);
export const zipWith
  = <A, B, C>(a: A[], b: B[]) =>
    (f: (a: A, b: B) => C) =>
      a.map((k, i) => f(k, b[i]));
export const diff = ([a, b]: [number, number]) => a - b;
