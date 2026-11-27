import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuIdServiceService {


  constructor() { }

  uniqueId() : string{
    return crypto.randomUUID()
  }
}
