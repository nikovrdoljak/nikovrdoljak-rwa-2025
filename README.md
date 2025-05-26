# Notes

## first-app tutorial

Official https://angular.dev/tutorials/first-app tutorial is completed.

## HTTP Client

`main.ts`

```
bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideHttpClient(), provideRouter(routeConfig),  ],
```

`app.config.ts`

```
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

`housing.service.ts`

```
  private http = inject(HttpClient);

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url);
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`);
  }
```

`home.component.ts`

```
    this.housingService.getAllHousingLocations().subscribe((houses) => {
      this.housingLocationList = houses;
      this.filteredLocationList = this.housingLocationList;
    });
```

`detail.component.ts`

```
    this.housingService
      .getHousingLocationById(housingLocationId)
      .subscribe((house) => {
        this.housingLocation = house;
      });
```

## YesNo pipe

`ng generate pipe yes-no`

`yes-no.pipe.ts`

```
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "yesNo",
  standalone: true,
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean | undefined): string {
    return value ? "Yes" : "No";
  }
}
```

`details.component`
```
import { YesNoPipe } from "../yes-no.pipe";

  imports: [CommonModule, ReactiveFormsModule, YesNoPipe],

{{ housingLocation?.wifi | yesNo }}
```

## Move template to HTML file
```
templateUrl: "./details.component.html",
```

## Angular Material
https://material.angular.dev/

https://material.angular.dev/guide/getting-started

```
ng add @angular/material
```