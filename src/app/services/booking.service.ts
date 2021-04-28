import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.bookingsRef = this.db.list('/appointment');
  }

  // Create
  createBooking(data) {
    return this.bookingsRef.push(data);
  }

  // Read List
  getBookings() {
    return this.bookingsRef.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.val() as {};
        const $key = a.payload.key

        return { $key, ...data };
      });
    }));
  }

  // Read Single
  getBookingById(id: string) {
    return this.db
      .list('/appointment', ref => ref.orderByKey().equalTo(id))
      .snapshotChanges()
      .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.val() as {};
        const $key = a.payload.key

        return { $key, ...data };
      })[0];
    }));
    
    
  }

  // Update
  updateBooking(id, data) {
    return this.bookingsRef.update(id, data);
  }

  // Delete
  deleteBooking(id: string) {
    return this.bookingsRef.remove(id);
  }
}
