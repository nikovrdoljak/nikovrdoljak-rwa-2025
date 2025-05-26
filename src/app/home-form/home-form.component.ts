import { Component, OnInit, inject } from "@angular/core";
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
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-home-form",
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: "home-form.component.html",
  styles: ``,
})
export class HomeFormComponent implements OnInit {
  isEdit: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);

  home: HousingLocation = {
    id: "",
    name: "",
    city: "",
    state: "",
    photo: "",
    availableUnits: 0,
    wifi: false,
    laundry: false,
  };

  constructor(private housingService: HousingService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit = true;
      this.housingService.getHousingLocationById(id).subscribe((house) => {
        this.home = house;
      });
    }
  }

  saveHouse(): void {
    if (this.isEdit) {
      this.housingService.updateHouse(this.home).subscribe(() => {
        this.router.navigate(["/"]);
      });
    } else {
      this.housingService.addHouse(this.home).subscribe(() => {
        this.router.navigate(["/"]);
      });
    }
    this.snackBar.open(
      `Location "${this.home?.name}" saved successfully!`,
      "Close",
      {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }
}
