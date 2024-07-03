import { DestroyRef, Signal, inject, signal } from "@angular/core";
import { Observable } from "rxjs";

export function computedAsync<T>(source: Observable<T> | Promise<T>, initialValue?: T): Signal<T> {
  const destroyRef = inject(DestroyRef);
  const output = signal<T>(initialValue ? initialValue : null);

  if (source instanceof Observable) {
    const subscription = source.subscribe(v => output.set(v));
    destroyRef.onDestroy(subscription.unsubscribe.bind(subscription));
  }

  if (source instanceof Promise) {
    source.then(v => output.set(v));
  }

  return output.asReadonly();
}
