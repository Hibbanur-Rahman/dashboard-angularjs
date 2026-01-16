import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
    standalone: true,
    imports: [CommonModule,RouterModule],
    selector:'[app-menuitem]',
    template:`
        <ng-container>
            <div *ngIf="root && item.visible !==false" class="text-xs font-bold tracking-wider text-gray-800 py-5 px-5 pb-3 uppercase">
                {{ item.label }}
            </div>
            <a *ngIf="(!item.routerLink || item.items) && item.visible !== false" 
               [attr.href]="item.url || null" 
               (click)="itemClick($event)"
               [ngClass]="item.class" 
               [attr.target]="item.target" 
               tabindex="0" 
               class="flex items-center py-3 px-5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:rounded-r-3xl border-l-3 border-transparent hover:border-blue-400 transition-all cursor-pointer relative">
                <i [ngClass]="item.icon" class="text-base mr-3 w-5 text-center"></i>
                <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
                <i class="pi pi-fw pi-angle-down text-xs transition-transform" [class.rotate-180]="active" *ngIf="item.items"></i>
            </a>
            <a *ngIf="(item.routerLink && !item.items) && item.visible !== false" 
               (click)="itemClick($event)" 
               [ngClass]="item.class"
               [routerLink]="item.routerLink" 
               routerLinkActive="!bg-blue-400/10 !text-blue-400 !border-blue-400" 
               [routerLinkActiveOptions]="{ exact: true }"
               [fragment]="item.fragment" 
               [queryParamsHandling]="item.queryParamsHandling" 
               [preserveFragment]="item.preserveFragment"
               [skipLocationChange]="item.skipLocationChange" 
               [replaceUrl]="item.replaceUrl" 
               [state]="item.state" 
               [queryParams]="item.queryParams"
               [attr.target]="item.target" 
               tabindex="0" 
               class="flex items-center py-3 px-5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:rounded-r-3xl border-l-3 border-transparent hover:border-blue-400 transition-all cursor-pointer relative">
                <i [ngClass]="item.icon" class="text-base mr-3 w-5 text-center"></i>
                <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
                <i class="pi pi-fw pi-angle-down text-xs transition-transform" [class.rotate-180]="active" *ngIf="item.items"></i>
            </a>

            <ul *ngIf="item.items && item.visible !== false" [@children]="submenuAnimation" class="list-none m-0 p-0 overflow-hidden">
                <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
                    <li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="'submenu-item'" [class.active-menuitem]="activeIndex === i" ></li>
                </ng-template>
            </ul>
        </ng-container>
    `,
    animations: [
        trigger('children', [
            state('collapsed', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class MenuItem implements OnInit, OnDestroy {
    @Input() item:any;
    @Input() index! :number;
    @Input() parentKey! :string;
    @Input() root:boolean=false;

    active=false;
    menuSourceSubscription: Subscription;
    menuResetSubscription: Subscription;
    key: string='';
    activeIndex: number | null = null;

    constructor(private router: Router) {
        this.menuSourceSubscription = new Subscription();
        this.menuResetSubscription = new Subscription();
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.routerLink[0], {
            paths: 'exact',
            queryParams: 'ignored',
            fragment: 'ignored',
            matrixParams: 'ignored'
        });

        if (activeRoute) {
            this.active = true;
        }
    }

    itemClick(event: Event) {
        console.log('MenuItem clicked:', this.item);
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // Prevent default if item has subitems (expand/collapse only)
        if (this.item.items) {
            event.preventDefault();
            this.active = !this.active;
        }

        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        if (!this.item.items && (this.item.routerLink || this.item.url)) {
            this.active = false;
        }
    }

    get submenuAnimation() {
        return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}