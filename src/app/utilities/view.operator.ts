import { Observable, ObservableInput, combineLatest, map } from "rxjs";

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