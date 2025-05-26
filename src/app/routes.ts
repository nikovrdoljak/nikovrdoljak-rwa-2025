import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { HomeFormComponent } from "./home-form/home-form.component";
const routeConfig: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home page",
  },
  {
    path: "details/:id",
    component: DetailsComponent,
    title: "Home details",
  },
  {
    path: "add",
    component: HomeFormComponent,
    title: "Add house",
  },
  {
    path: "edit/:id",
    component: HomeFormComponent,
    title: "Edit house",
  },
];
export default routeConfig;
