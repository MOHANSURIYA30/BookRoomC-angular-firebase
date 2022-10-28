import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookingDetails:any =[];
  userDetails:any;
  constructor(private db:AngularFirestore) {

   }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user')!);
    console.log(this.userDetails.email);
    this.filterBy().subscribe( (data: any) => {
      console.log(data);
      this.bookingDetails =  data;
  });
  }

  filterBy() {
    let data = this.db.collection('bookings', ref => ref.where('user_email','==',this.userDetails.email  )).valueChanges({idField: 'customIdName'})
    return data;
  };

}
