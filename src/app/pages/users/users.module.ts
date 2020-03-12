import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../_service/user.service';

import{UsersComponent} from './users.component'
import { AjoutUserComponent } from './ajout-user/ajout-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { GestionUserComponent } from './gestion-user/gestion-user.component';




@NgModule({
  declarations: [AjoutUserComponent, ModifierUserComponent, GestionUserComponent,routedComponents],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    UsersRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [

  ],
  providers: [UserService,ToastrService],

})
export class UsersModule { }
