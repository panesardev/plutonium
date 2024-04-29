import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comment } from './comment.interface';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private firestore = inject(Firestore);
  private collectionRef = collection(this.firestore, 'comments');

  findAll(slug: string) {
    const q = query(this.collectionRef, where('slug', '==', slug));
    return collectionData(q, { idField: 'id' }) as Observable<Comment[]>;
  }

  async add(comment: Comment) {
    await addDoc(this.collectionRef, comment);
  }

  async delete(comment: Comment) {
    await deleteDoc(doc(this.firestore, `/comments/${comment.id}`));
  }

}
