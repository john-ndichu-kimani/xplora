export interface Event {
  id?: string;
  destination: string;
  duration: number;
  price: number;
  type: string;
  imageUrl: string ;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
