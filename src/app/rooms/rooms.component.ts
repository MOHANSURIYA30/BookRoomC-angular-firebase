import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  roomType = new FormControl('single ac room'); 
  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  onSearch()
  {
    console.log(this.roomType.value);
    this.router.navigate(['/list',{type:this.roomType.value}]);
    
  }

  
}
