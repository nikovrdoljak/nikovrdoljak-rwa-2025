import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housinglocation";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { YesNoPipe } from "../yes-no.pipe";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-details",
  imports: [CommonModule, ReactiveFormsModule, YesNoPipe, MatButtonModule],
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation?: HousingLocation;
  housingLocationId: string = "";
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor(private router: Router) {
    this.housingLocationId = this.route.snapshot.params["id"];
    this.housingService
      .getHousingLocationById(this.housingLocationId)
      .subscribe((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }

  deleteHouse(): void {
    this.housingService.deleteHouse(this.housingLocationId).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
