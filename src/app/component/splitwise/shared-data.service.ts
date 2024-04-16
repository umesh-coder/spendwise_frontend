import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  groupID:any;
  GM:any;
  GName:any;
  

  setData(data: any,groupmem:any,groupName:any): void {
    this.groupID = data;
    this.GM = groupmem;
    this.GName = groupName;

  }
}
