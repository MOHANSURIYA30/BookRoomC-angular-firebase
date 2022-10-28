import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  value:any;
  rooms:any = [];
  selectedRooms:any = [];
  constructor(private route: ActivatedRoute,
    private router:Router,private db:AngularFirestore,
    private location:Location) {
       
   }

  ngOnInit(): void {
    this.value = this.route.snapshot.paramMap.get('type');
    console.log(this.value);
    this.getRoomData();
  
  }

  getRoomData() {                                        
    this.db.collection('rooms').ref.get().then(snapshot =>{snapshot.docs.forEach(doc =>{ 
      // console.log(doc.data());
      // console.log(doc.id);
      let s_data:any =doc.data()
      let data = {
        ...s_data,
        id:doc.id
      }
      this.rooms.push(data);
      console.log(this.rooms);
      
    })
  
    this.getSelectedData();
  })  
    
 

    
   
  }

  getSelectedData()
  {
    
    this.selectedRooms = this.rooms.filter((data:any)=>{
      if(data.roomType == this.value)
      {
        return data
      }
    })
    console.log(this.selectedRooms);
  }

  goBack()
  {
    this.location.back()
  }
}
