import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housinglocation";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { YesNoPipe } from "../yes-no.pipe";
@Component({
  selector: "app-details",
  imports: [CommonModule, ReactiveFormsModule, YesNoPipe],
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation?: HousingLocation;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });
  housingLocationId = -1;

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params["id"], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
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
}
