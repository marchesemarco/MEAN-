import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  obsUnit: Observable<Unit[]>;
  data: Unit[];

  postObserver : Observable<Object>;
  postData : Object;

  b: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit():void{
    this.listUnit();
  }

  listUnit(): void {
    this.obsUnit = this.http.get<Unit[]>('https://3000-cdbd7f19-59b7-49e7-b513-1edddaf7951e.ws-eu01.gitpod.io/api');
    this.obsUnit.subscribe((data: Unit[]) => {this.data = data;});
  }

  addUnit(b, newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement, newSpeed: HTMLInputElement, newDeployTime: HTMLInputElement, newRange: HTMLInputElement, newTarget: HTMLInputElement, newCount: HTMLInputElement, newTransport: HTMLInputElement, newType: HTMLInputElement, newRarity: HTMLInputElement): boolean {
    let newData = new Unit(newUnit.value, newCost.value, newHitSpeed.value, newSpeed.value, newDeployTime.value, newRange.value, newTarget.value, newCount.value, newTransport.value, newType.value, newRarity.value);
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-cdbd7f19-59b7-49e7-b513-1edddaf7951e.ws-eu01.gitpod.io/api/add', JSON.stringify(newData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    if (this.b == false){
      this.b = true;
    }
    return false;
  }
}

