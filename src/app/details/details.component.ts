import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housinglocation";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { YesNoPipe } from "../yes-no.pipe";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-details",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    YesNoPipe,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.housingService
          .deleteHouse(this.housingLocationId)
          .subscribe(() => {
            this.router.navigate(["/"]);
          });
        this.snackBar.open(
          `Location "${this.housingLocation?.name}" deleted successfully!`,
          "Close",
          {
            duration: 5000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          }
        );
      }
    });
  }
}
