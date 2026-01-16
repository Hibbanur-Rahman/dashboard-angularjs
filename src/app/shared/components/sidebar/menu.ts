import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuItem } from "./menuitem";

@Component({
    standalone: true,
    imports: [CommonModule,MenuItem,RouterModule],
    selector:'[app-menu]',
    template:`
        <ul class="list-none m-0 p-0">
            <ng-container *ngFor="let item of model; let i=index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="h-px bg-gray-200 my-3 mx-5"></li>
            </ng-container>
        </ul>`,
})
export class Menu{
    model: any[] = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Overview',
                    icon: 'pi pi-fw pi-chart-line',
                    routerLink: ['/']
                },
                {
                    label: 'Analytics',
                    icon: 'pi pi-fw pi-chart-bar',
                    routerLink: ['/analytics']
                }
            ]
        },
        { separator: true },
        {
            label: 'Inventory',
            icon: 'pi pi-box',
            items: [
                {
                    label: 'Stocks',
                    icon: 'pi pi-fw pi-warehouse',
                    routerLink: ['/inventory/stocks']
                },
                {
                    label: 'Products',
                    icon: 'pi pi-fw pi-tags',
                    routerLink: ['/inventory/products']
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/inventory/categories']
                },
                {
                    label: 'Stock Adjustment',
                    icon: 'pi pi-fw pi-arrows-h',
                    routerLink: ['/inventory/adjustments']
                },
                {
                    label: 'Low Stock Alert',
                    icon: 'pi pi-fw pi-exclamation-triangle',
                    routerLink: ['/inventory/low-stock']
                }
            ]
        },
        { separator: true },
        {
            label: 'Product Management',
            icon: 'pi pi-tags',
            items: [
                {
                    label: 'All Products',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/products']
                },
                {
                    label: 'Add Product',
                    icon: 'pi pi-fw pi-plus',
                    routerLink: ['/products/add']
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-fw pi-folder',
                    routerLink: ['/products/categories']
                },
                {
                    label: 'Brands',
                    icon: 'pi pi-fw pi-bookmark',
                    routerLink: ['/products/brands']
                },
                {
                    label: 'Attributes',
                    icon: 'pi pi-fw pi-sliders-h',
                    routerLink: ['/products/attributes']
                },
                {
                    label: 'Product Reviews',
                    icon: 'pi pi-fw pi-star',
                    routerLink: ['/products/reviews']
                },
                {
                    label: 'Import/Export',
                    icon: 'pi pi-fw pi-upload',
                    routerLink: ['/products/import-export']
                }
            ]
        },
        { separator: true },
        {
            label: 'Orders',
            icon: 'pi pi-shopping-cart',
            items: [
                {
                    label: 'All Orders',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/orders']
                },
                {
                    label: 'Pending',
                    icon: 'pi pi-fw pi-clock',
                    routerLink: ['/orders/pending']
                },
                {
                    label: 'Processing',
                    icon: 'pi pi-fw pi-sync',
                    routerLink: ['/orders/processing']
                },
                {
                    label: 'Completed',
                    icon: 'pi pi-fw pi-check-circle',
                    routerLink: ['/orders/completed']
                },
                {
                    label: 'Returns',
                    icon: 'pi pi-fw pi-replay',
                    routerLink: ['/orders/returns']
                }
            ]
        },
        { separator: true },
        {
            label: 'POS System',
            icon: 'pi pi-desktop',
            items: [
                {
                    label: 'Point of Sale',
                    icon: 'pi pi-fw pi-calculator',
                    routerLink: ['/pos']
                },
                {
                    label: 'Sales History',
                    icon: 'pi pi-fw pi-history',
                    routerLink: ['/pos/history']
                },
                {
                    label: 'Receipts',
                    icon: 'pi pi-fw pi-receipt',
                    routerLink: ['/pos/receipts']
                }
            ]
        },
        { separator: true },
        {
            label: 'Transactions',
            icon: 'pi pi-wallet',
            items: [
                {
                    label: 'All Transactions',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/transactions']
                },
                {
                    label: 'Sales',
                    icon: 'pi pi-fw pi-arrow-up',
                    routerLink: ['/transactions/sales']
                },
                {
                    label: 'Purchases',
                    icon: 'pi pi-fw pi-arrow-down',
                    routerLink: ['/transactions/purchases']
                },
                {
                    label: 'Payments',
                    icon: 'pi pi-fw pi-dollar',
                    routerLink: ['/transactions/payments']
                },
                {
                    label: 'Reports',
                    icon: 'pi pi-fw pi-file-pdf',
                    routerLink: ['/transactions/reports']
                }
            ]
        },
        { separator: true },
        {
            label: 'Branches',
            icon: 'pi pi-building',
            items: [
                {
                    label: 'All Branches',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/branches']
                },
                {
                    label: 'Add Branch',
                    icon: 'pi pi-fw pi-plus',
                    routerLink: ['/branches/add']
                },
                {
                    label: 'Branch Performance',
                    icon: 'pi pi-fw pi-chart-line',
                    routerLink: ['/branches/performance']
                }
            ]
        },
        { separator: true },
        {
            label: 'Users',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'All Users',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/users']
                },
                {
                    label: 'Add User',
                    icon: 'pi pi-fw pi-user-plus',
                    routerLink: ['/users/add']
                },
                {
                    label: 'Staff',
                    icon: 'pi pi-fw pi-id-card',
                    routerLink: ['/users/staff']
                },
                {
                    label: 'Customers',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/users/customers']
                }
            ]
        },
        { separator: true },
        {
            label: 'Access Control',
            icon: 'pi pi-shield',
            items: [
                {
                    label: 'Roles & Permissions',
                    icon: 'pi pi-fw pi-lock',
                    routerLink: ['/access/roles']
                },
                {
                    label: 'User Roles',
                    icon: 'pi pi-fw pi-users',
                    routerLink: ['/access/user-roles']
                },
                {
                    label: 'Activity Log',
                    icon: 'pi pi-fw pi-eye',
                    routerLink: ['/access/activity']
                }
            ]
        },
        { separator: true },
        {
            label: 'Audit Logs',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'System Logs',
                    icon: 'pi pi-fw pi-server',
                    routerLink: ['/audit/system']
                },
                {
                    label: 'User Activity',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/audit/user-activity']
                },
                {
                    label: 'Inventory Changes',
                    icon: 'pi pi-fw pi-box',
                    routerLink: ['/audit/inventory']
                },
                {
                    label: 'Transaction Logs',
                    icon: 'pi pi-fw pi-wallet',
                    routerLink: ['/audit/transactions']
                }
            ]
        },
        { separator: true },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            items: [
                {
                    label: 'General',
                    icon: 'pi pi-fw pi-sliders-h',
                    routerLink: ['/settings/general']
                },
                {
                    label: 'Business Info',
                    icon: 'pi pi-fw pi-building',
                    routerLink: ['/settings/business']
                },
                {
                    label: 'Payment Methods',
                    icon: 'pi pi-fw pi-credit-card',
                    routerLink: ['/settings/payment']
                },
                {
                    label: 'Tax Settings',
                    icon: 'pi pi-fw pi-percentage',
                    routerLink: ['/settings/tax']
                },
                {
                    label: 'Notifications',
                    icon: 'pi pi-fw pi-bell',
                    routerLink: ['/settings/notifications']
                },
                {
                    label: 'Backup & Restore',
                    icon: 'pi pi-fw pi-database',
                    routerLink: ['/settings/backup']
                }
            ]
        }
    ];
}