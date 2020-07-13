import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { RegistrationComponent } from '../registration/registration.component'
import { ProjectCreateComponent } from './projects/project-create/project-create.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'tasks',
      component: TasksComponent
    },
    {
      path: 'task-create',
      component: TaskCreateComponent
    },
    {
      path: 'user-list',
      component: UserListComponent
    },
    {
      path: 'user-edit/:_id',
      component: RegistrationComponent
    },

    {
      path: 'project-details/:id',
      component: ProjectDetailsComponent
    },
    {
      path: 'project/create',
      component:ProjectCreateComponent
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
