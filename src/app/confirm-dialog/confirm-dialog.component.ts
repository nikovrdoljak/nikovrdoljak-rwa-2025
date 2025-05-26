import { Component, inject } from "@angular/core";
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"],
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  confirm(): void {
    this.dialogRef.close(true); // Return true on confirm
  }

  cancel(): void {
    this.dialogRef.close(false); // Return false on cancel
  }
}
