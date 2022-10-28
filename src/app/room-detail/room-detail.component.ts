import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  showOverlay:any = false;
  booked:any = false;
  id:any;
  roomDetails:any;
  userDetails:any;
  fromDate = new FormControl('');
  toDate = new FormControl(''); 
  constructor(private location:Location,private route: ActivatedRoute,private router:Router,private db:AngularFirestore) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getObjectById(this.id).subscribe( data => {
      console.log(data);
      this.roomDetails =  data;
  })

  this.userDetails = JSON.parse(localStorage.getItem('user')!);
  console.log(this.userDetails.email);
  
    this.showOverlay = false;
    this.booked = false;
  }

  showPopup()
  {
    this.showOverlay = true;
  }

  closeOverlay()
  {
    this.showOverlay = false; 
  }

  bookRoom()
  {
    console.log(this.fromDate.value);
    console.log(this.toDate.value);

    let post_data = {
      room_id:this.id,
      room_no:this.roomDetails.roomNo,
      user_email:this.userDetails.email,
      fromDate:this.fromDate.value,
      toDate:this.toDate.value,
      status:'pending'
    }

    this.db.collection('bookings').add(post_data)
    .then((res)=>{
      console.log(res);
      this.booked = true;
    })
   

  }
  goBack()
  {
    this.location.back();
  }

  getObjectById(id:any) { 
    return this.db.collection('rooms').doc(id).valueChanges()
}

}
