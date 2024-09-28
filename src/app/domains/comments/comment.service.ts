import { Injectable, inject } from "@angular/core";
import { Firestore, addDoc, collection, collectionData, query, where } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Comment } from "./comment.interface";

@Injectable({ providedIn: 'root' })
export class CommentService {
  private firestore = inject(Firestore);
  private ref = collection(this.firestore, 'comments');

  findAll(slug: string): Observable<Comment[]> {
    const q = query(this.ref, where('slug', '==', slug));
    return collectionData(q, { idField: 'id' }) as Observable<Comment[]>;
  }

  async create(comment: Comment): Promise<void> {
    await addDoc(this.ref, comment);
  }
}
