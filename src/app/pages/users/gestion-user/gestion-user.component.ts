import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from '../../../_service/user.service';
@Component({
  selector: 'ngx-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {

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
  constructor(private http: HttpClient, private router: Router, private toaster: ToastrService, private userService: UserService ) { }

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

    this.http.delete('api/users/' + e.ID_user).subscribe(
      Response => {
        if (Response['success']) {
          this.toaster.success("Suppresion avec succés");
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.http.get<any>('api/users').subscribe(data => {
              this.user = data;
              this.dtTrigger.next();
            });
          });
        } else { this.toaster.error("Erreur") }
      }, error => this.toaster.error("Erreur lors de la communication avec serveur"));
  }

}
