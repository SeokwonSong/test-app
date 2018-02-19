import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class TestService {

  constructor(private http: Http) { }


  public sendMail() {
    return this.http.post('/api/mail', {}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }
}
