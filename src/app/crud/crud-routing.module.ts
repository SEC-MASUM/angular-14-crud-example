import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'post', redirectTo: 'post/home', pathMatch: 'full' },
  { path: 'post/home', component: HomeComponent },
  { path: 'post/details/:id', component: DetailsComponent },
  { path: 'post/create', component: CreateComponent },
  { path: 'post/update/:id', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
