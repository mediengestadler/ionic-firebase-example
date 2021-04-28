import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.page.html',
  styleUrls: ['./upsert.page.scss'],
})
export class UpsertPage implements OnInit, OnDestroy {
  bookingForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['test@test', [Validators.required, Validators.email, Validators.pattern('test@test')]],
    mobile: ['']
  });

  currentKey: string;
  isSubmitted: boolean;

  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.currentKey = this.activatedRoute.snapshot.paramMap.get('key');
    if (this.currentKey) {
      this.bookingService.getBookingById(this.currentKey).subscribe(booking => {
        this.bookingForm.patchValue(booking)
      });
    }
  }

  ngOnDestroy () {
    this.bookingForm.reset();
  } 

  submitBooking() {
    this.isSubmitted = true;
    
    if (!this.bookingForm.valid) {
      return false;
    }

    let upsert;

    if (this.currentKey) {
      upsert = this.bookingService.updateBooking(this.currentKey, this.bookingForm.value);
    } else {
      upsert = this.bookingService.createBooking(this.bookingForm.value);
    }

    upsert
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }
}
