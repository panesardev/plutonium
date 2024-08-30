import { Injectable } from "@angular/core";
import { collection } from "firebase/firestore";
import { DomainService } from "../../shared/services/domain.service";
import { Task } from "./task.interface";

@Injectable({ providedIn: 'root' })
export class TaskService extends DomainService<Task> { 
  override domain = 'tasks';
  override collectionRef = collection(this.firestore, this.domain);
}
