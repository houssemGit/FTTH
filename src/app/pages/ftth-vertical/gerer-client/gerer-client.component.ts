import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Client } from '../../../_models/client';
import { FtthService } from '../../../_service/ftth.service';
import { Monosite } from '../../../_models/monosite';
import { Appartement } from '../../../_models/appartement';


@Component({
  selector: 'ngx-gerer-client',
  templateUrl: './gerer-client.component.html',
  styleUrls: ['./gerer-client.component.scss']
})
export class GererClientComponent implements OnInit {

  status: NbComponentStatus ;
  client:  Client
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Client> = new Subject();
  monos: Array<Monosite>=new Array ;
  concat: Array<any>=new Array ;
  apparts : Array<Appartement>
  mix : Array<any> = new Array
  clientest : Array<Client>=new Array ;
  clientestjl : any

  res : string
  zoen : string
  bool : string



  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(private ftthservice: FtthService,private toastrService: NbToastrService,private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',
      buttons: [
        'excel',
      ]
    };
    this.res=localStorage.getItem('choixresidence')
    this.zoen=localStorage.getItem('choixzone')
    this.bool="monosite"


    if (localStorage.getItem('choixresidence') != null){
      this.bool="residence"

      this.ftthservice.getAppartByResidence(localStorage.getItem('ID_pri')).subscribe(data => {
        this.apparts = data;
          for (let i = 0; i < this.apparts.length; i+=2) {this.concat.push(Object.assign(this.apparts[i+1][0],this.apparts[i]))}
              this.ftthservice.getClientsResidencetest(localStorage.getItem('ID_pri')).subscribe( (data)=>{
                this.clientest=data
                for (let i = 0; i < this.clientest.length; i++) {
                  for (let j = 0; j < this.concat.length; j++) {
                    if(this.clientest[i][0].ID_immeuble==this.concat[j].ID_immeuble){
                    this.mix.push(Object.assign(this.concat[j],this.clientest[i][0]))

                  }
                  }
                }

                this.dtTrigger.next();},
                error => {
                  this.status="warning"
      this.toastrService.show(``,`Aucun client!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
                });
        })
    }
    else{
      this.ftthservice.getMonositeByZone(localStorage.getItem('ID_sro')).subscribe(data => {
        this.monos = data;
          for (let i = 0; i < this.monos.length; i+=2) {this.concat.push(Object.assign(this.monos[i+1][0],this.monos[i]))}
              this.ftthservice.getClientsMonotest(localStorage.getItem('choixzone')).subscribe( (data)=>{
                this.clientest=data
                for (let i = 0; i < this.clientest.length; i++) {
                  for (let j = 0; j < this.concat.length; j++) {
                    if(this.clientest[i][0].ID_immeuble==this.concat[j].ID_immeuble){
                    this.mix.push(Object.assign(this.concat[j],this.clientest[i][0]))
                  }
                  }
                }
                this.dtTrigger.next();},
                error => {
                  this.status="warning"
                  this.toastrService.show(``,`Aucun client!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
                });



        })
    }
    localStorage.removeItem('ID_client');localStorage.removeItem('Num_serie_ONT');localStorage.removeItem('Code_site');
    localStorage.removeItem('MSISDN');localStorage.removeItem('Solution_raccordement');
    localStorage.removeItem('Budget_optique');localStorage.removeItem('Type_client');
    localStorage.removeItem('Num_telephone');localStorage.removeItem('ID_immeuble');localStorage.removeItem('KCRM');
    localStorage.removeItem('Debit');localStorage.removeItem('Nom_soustraitant');localStorage.removeItem('Etat_client');

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editClient(e) {

    localStorage.setItem('ID_client', e.ID_client.toString());
    localStorage.setItem('Num_serie_ONT',e.Num_serie_ONT);
    localStorage.setItem('Code_site',e.Code_site);
    localStorage.setItem('MSISDN',e.MSISDN);
    localStorage.setItem('Solution_raccordement', e.Solution_raccordement);
    localStorage.setItem('Budget_optique', e.Budget_optique);
    localStorage.setItem('Type_client', e.Type_client);
    localStorage.setItem('Num_telephone', e.Num_telephone);
    localStorage.setItem('ID_immeuble', e.ID_immeuble.toString());
    localStorage.setItem('KCRM', e.KCRM.toString());
    localStorage.setItem('Debit', e.Debit.toString());
    localStorage.setItem('Nom_soustraitant', e.Nom_soustraitant.toString());
    localStorage.setItem('Etat_client', e.Etat_client.toString());
    this.router.navigateByUrl('pages/immeubles/modifier-client');
  }

  deleteClient(e) {
    this.ftthservice.deleteClient(e.ID_client.toString()).subscribe(
      Response => {
          this.status="danger"
          this.toastrService.show(``,`Client supprimé!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.ngOnInit()
          });

      }, error => {this.status="danger"
      this.toastrService.show(``,`Erreur Suppression!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }



}
