import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Client } from '../../../_models/client';
import { FtthService } from '../../../_service/ftth.service';

@Component({
  selector: 'ngx-gerer-client',
  templateUrl: './gerer-client.component.html',
  styleUrls: ['./gerer-client.component.scss']
})
export class GererClientComponent implements OnInit {

  status: NbComponentStatus ;
  client: Array<Client>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Client> = new Subject();

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(private ftthservice: FtthService,private toastrService: NbToastrService,private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.ftthservice.getClientsByZone(localStorage.getItem("choixzone")).subscribe(data => {
      this.client = data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editClient(e) {

    // localStorage.setItem('ID_client', e.ID_client.toString());
    // localStorage.setItem('Num_serie_ont',e.Num_serie_ont);
    // localStorage.setItem('Solution_raccordement', e.Solution_raccordement);
    // localStorage.setItem('Budget_optique', e.Budget_optique);
    // localStorage.setItem('Type_client', e.Type_client);
    // localStorage.setItem('Num_telephone', e.Num_telephone);
    // localStorage.setItem('ID_immeuble', e.ID_immeuble.toString());
    // localStorage.setItem('Num_steg', e.Num_steg.toString());
    // this.router.navigateByUrl('pages/immeubles/modifier-client');
  }

  deleteClient(e) {
    this.ftthservice.deleteClient(e.ID_client.toString()).subscribe(
      Response => {
          this.status="danger"
          this.toastrService.show(``,`Client supprimé!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.ftthservice.getClientsByZone(localStorage.getItem("choixzone")).subscribe(data => {
              this.client = data;
              this.dtTrigger.next();
            });
          });

      }, error => {this.status="danger"
      this.toastrService.show(``,`Erreur Suppression!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }



}
