import { inject } from "@angular/core";
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export class DomainService<T> {
  protected firestore = inject(Firestore);
  protected domain: string;
  protected collectionRef: CollectionReference;
  
  findAll(): Observable<T[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<T[]>;
  }

  findById(id: string): Observable<T> {
    return docData(doc(this.firestore, `${this.domain}/${id}`)) as Observable<T>;
  }

  async create(t: T): Promise<void> {
    Object.keys(t).filter(k => t[k] == undefined).forEach(k => t[k] = null);
    await addDoc(this.collectionRef, t);
  }
  
  async update(id: string, t: Partial<T>): Promise<void> {
    const docRef = doc(this.firestore, `${this.domain}/${id}`);
    await updateDoc(docRef, { ...t as any });
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `${this.domain}/${id}`));
  }
}
