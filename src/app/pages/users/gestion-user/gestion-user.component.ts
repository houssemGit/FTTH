import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from '../../../_service/user.service';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {

  status: NbComponentStatus ;
  user: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<User> = new Subject();
  ID_user: Number
  Nom: string
  Prenom: string
  Email: string
  Fonction: string
  Role: string
  Password: string

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  constructor(private toastrService: NbToastrService,private http: HttpClient, private router: Router, private toaster: ToastrService, private userService: UserService ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    //get<any>('api/users')
    this.userService.allusers().subscribe(data => {
      this.user = data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  editUser(e: any) {
    this.ID_user=e.ID_user;
    this.Nom = e.Nom;
    this.Prenom = e.Prenom;
    this.Email = e.Email;
    this.Fonction = e.Fonction;
    this.Role = e.Role;
    this.Password = e.Password;

    localStorage.setItem('ID_user', this.ID_user.toString());
    localStorage.setItem('Nom', this.Nom);
    localStorage.setItem('Prenom', this.Prenom);
    localStorage.setItem('Email', this.Email);
    localStorage.setItem('Fonction', this.Fonction);
    localStorage.setItem('Role', this.Role);
    localStorage.setItem('Password', this.Password);
    this.router.navigateByUrl('pages/utilisateurs/modifier-user');
  }

  deleteUser(e) {
    this.userService.deleteuser(e.ID_user.toString()).subscribe(
      Response => {
          this.status="danger"
          this.toastrService.show(``,`Utilisateur supprimé!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.userService.allusers().subscribe(data => {
              this.user = data;
              this.dtTrigger.next();
            });
          });

      }, error => {this.status="danger"
      this.toastrService.show(``,`Erreur Suppression!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }



}
