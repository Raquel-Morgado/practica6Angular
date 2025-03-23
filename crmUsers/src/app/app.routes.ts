import { ActivatedRoute, Routes } from '@angular/router';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

export const routes: Routes = [  
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: UsersListComponent },
    { path: "user/:id", component: UserViewComponent },
    {path: "newuser", component: UserFormComponent},
    {path: "updateuser/:id", component: UserFormComponent},
    { path: "**", redirectTo: 'home' }];
