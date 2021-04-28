import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  bookings = [];

  constructor(private bookingService: BookingService, private alertController: AlertController) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  async deleteBookingByKey($key) {
    const alert = await this.alertController.create({
      header: 'Anfrage löschen',
      message: 'Möchten Sie die Anfrage wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        }, {
          text: 'Löschen',
          cssClass: 'danger',
          handler: () => {
            this.bookingService.deleteBooking($key);
          }
        }
      ]
    });

    await alert.present();
  }

}
