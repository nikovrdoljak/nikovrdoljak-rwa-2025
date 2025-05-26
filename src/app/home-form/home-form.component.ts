import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housinglocation";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
@Component({
  selector: "app-home-form",
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  templateUrl: "home-form.component.html",
  styles: ``,
})
export class HomeFormComponent implements OnInit {
  home: HousingLocation = {
    id: 0,
    name: "",
    city: "",
    state: "",
    photo: "",
    availableUnits: 0,
    wifi: false,
    laundry: false,
  };

  constructor(private housingService: HousingService, private router: Router) {}

  ngOnInit(): void {}

  saveHouse(): void {
    this.housingService.addHouse(this.home).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }
}
