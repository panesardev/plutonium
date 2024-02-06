import { Observable, ObservableInput, combineLatest, isObservable, map, of } from "rxjs";

type SourceObject = {
  [key: string]: ObservableInput<any>;
} 

export function view<T>(sourceObject: SourceObject) {
  const keys = Object.keys(sourceObject);
  return combineLatest(keys.map(key => sourceObject[key])).pipe(
    map(array => {
      const newSourceObject = {};
      keys.forEach((key, index) => {
        newSourceObject[key] = array[index];
      });
      return newSourceObject;
    }),
  ) as Observable<T>;
}

type InputObject<T> = { [K in keyof T]: T[K] | Observable<T[K]> };

export function combineLatestObject<T>(object: InputObject<T>): Observable<T> {
  type K = keyof T;
  const entries = Object.entries(object) as [K, T[K] | Observable<T[K]>][];
  const observables = entries.map(([, value]) =>
    isObservable(value) ? value : of(value)
  );
  return combineLatest(observables).pipe(
    map((values) =>
      values.reduce((acc, value, index) => {
        acc[entries[index][0]] = value;
        return acc;
      }, {} as T)
    )
  );
}