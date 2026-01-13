import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponents } from "../../shared/components/sidebar/sidebar.components";

@Component({
    selector:'app-layout-dashboard',
    imports: [RouterOutlet,SidebarComponents],
    templateUrl:'./dashboard.layout.html',
    styleUrl:'./dashboard.layout.css'
})
export class DashboardLayout{

}