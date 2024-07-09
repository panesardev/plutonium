import { Injectable, inject } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { collectionData as collectionChanges } from 'rxfire/firestore';
import { Observable } from "rxjs";
import { Firestore } from "../../app.config";
import { Comment } from "./comment.interface";

@Injectable({ providedIn: 'root' })
export class CommentService {
  private firestore = inject(Firestore);
  private ref = collection(this.firestore, 'comments');

  findAll(slug: string): Observable<Comment[]> {
    const q = query(this.ref, where('slug', '==', slug));
    return collectionChanges(q, { idField: 'id' }) as Observable<Comment[]>;
  }

  async add(comment: Comment): Promise<void> {
    await addDoc(this.ref, comment);
  }

  async delete(comment: Comment): Promise<void> {
    await deleteDoc(doc(this.firestore, `/comments/${comment.id}`));
  }
}
