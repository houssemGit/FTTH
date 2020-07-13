import { Component, OnInit, ViewChild } from '@angular/core';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Appartement } from '../../../_models/appartement';
import { Client } from '../../../_models/client';

@Component({
  selector: 'ngx-details-eligibilite-appartement',
  templateUrl: './details-eligibilite-appartement.component.html',
  styleUrls: ['./details-eligibilite-appartement.component.scss']
})
export class DetailsEligibiliteAppartementComponent implements OnInit {

  constructor(private ftthservice: FtthService,private toastrService: NbToastrService,private http: HttpClient, private router: Router) { }

  status: NbComponentStatus ;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Appartement> = new Subject();

  apparts: Array<any>=new Array ;
  concat: Array<any>=new Array ;
  mix : Array<any> = new Array
  res : String
  clientest  :Array<any>=new Array ;



  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      "ordering": false,
      dom: 'Bfrtip',
      buttons: [
        'excel',
      ]
    };

    this.res = localStorage.getItem('choixresidence')

    this.ftthservice.getAppartByResidence(localStorage.getItem('ID_pri')).subscribe(data => {
      this.apparts = data;
        for (let i = 0; i < this.apparts.length; i+=2) {this.concat.push(Object.assign(this.apparts[i+1][0],this.apparts[i]))}

           //concat client
           this.ftthservice.getClientsResidencetest(localStorage.getItem('ID_pri')).subscribe( (data)=>{
            this.clientest=data

            for (let i = 0; i < this.clientest.length; i++) {
              for (let j = 0; j < this.concat.length; j++) {
                if(this.clientest[i][0].ID_immeuble==this.concat[j].ID_immeuble){
                Object.assign(this.concat[j],this.clientest[i][0])
              }
              }
            }
            });
        this.dtTrigger.next();
      },error => {this.status="warning"
      this.toastrService.show(``,`Aucun appartement`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
  }



  nsONT:string
  Ntel:number
  SR:string
  Bo:string
  type:string
  client:Client
  introuvable: boolean
  detailsClient(e){
    this.ftthservice.getClientsByImmeuble(e.ID_immeuble).subscribe(data => {this.client= data
      this.introuvable=false
      this.nsONT=this.client[0].Num_serie_ONT
      this.Ntel=this.client[0].Num_telephone
      this.SR=this.client[0].Solution_raccordement
      this.Bo=this.client[0].Budget_optique
      this.type=this.client[0].Type_client
    }, error => {
      this.introuvable=true

    })
  }
  detailsResidence(e){

  }
  copy(e){
    const val="N°APPARTEMENT:"+e.Num_appartement+"\nN°ETAGE:"+e.Num_etage+"\nNom du Bloc:"+e.Nom_bloc+"\nN°Compteur STEG:"+e.Num_steg
    const selBox = document.createElement('textarea');
    selBox.style.height = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
