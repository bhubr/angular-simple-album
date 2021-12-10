import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from './album/album.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: AlbumComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'details', component: DetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
