export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

export default class ToDoModel {
  id: string;
  name: string;
  desc: string;
  date_creation: Date;
  status: TodoStatusEnum;
}
