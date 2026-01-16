import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Menu } from "./menu";

@Component({
    imports: [CommonModule,Menu,RouterModule],
    standalone: true,
    selector:'app-sidebar',
    templateUrl:'./sidebar.components.html',
    styleUrls:['./sidebar.components.css']
})
export class SidebarComponents {

}