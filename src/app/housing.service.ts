import { inject, Injectable } from "@angular/core";
import { HousingLocation } from "./housinglocation";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class HousingService {
  private http = inject(HttpClient);
  url = "http://localhost:3000/locations";
  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url);
  }
  getHousingLocationById(id: string): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`);
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }

  addHouse(house: HousingLocation): Observable<HousingLocation> {
    house.id = crypto.randomUUID();
    return this.http.post<HousingLocation>(this.url, house);
  }

  updateHouse(house: HousingLocation): Observable<HousingLocation> {
    return this.http.put<HousingLocation>(`${this.url}/${house.id}`, house);
  }

  deleteHouse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
