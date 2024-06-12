import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, getFirestore, query, where } from "firebase/firestore";
import { collectionData as collection$ } from 'rxfire/firestore';
import { Observable } from "rxjs";
import { Comment } from "./comment.interface";

@Injectable()
export class CommentService {
  private firestore = getFirestore();
  private ref = collection(this.firestore, 'comments');

  findAll(slug: string): Observable<Comment[]> {
    const q = query(this.ref, where('slug', '==', slug));
    return collection$(q, { idField: 'id' }) as Observable<Comment[]>;
  }

  async add(comment: Comment): Promise<void> {
    await addDoc(this.ref, comment);
  }

  async delete(comment: Comment): Promise<void> {
    await deleteDoc(doc(this.firestore, `/comments/${comment.id}`));
  }
}
