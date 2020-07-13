import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Pri } from '../../../_models/pri';
import { Monosite } from '../../../_models/monosite';
import { Client } from '../../../_models/client';

@Component({
  selector: 'ngx-details-eligibilite',
  templateUrl: './details-eligibilite.component.html',
  styleUrls: ['./details-eligibilite.component.scss']
})
export class DetailsEligibiliteComponent implements OnInit {


  status: NbComponentStatus ;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  monos: Array<any>=new Array ;
  concat: Array<any>=new Array ;
  mix : Array<any> = new Array
  pris : Array<any>=new Array ;
  zone : string
  nbprise = {nb_prise_mono : 1 }
  aa : number
  clientest  :Array<any>=new Array ;



  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(private ftthservice: FtthService,private toastrService: NbToastrService,private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      dom: 'Bfrtip',
      buttons: [
        'excel',
      ]
    };
    this.zone= localStorage.getItem('choixzone')

      this.ftthservice.getPriByZone(localStorage.getItem('ID_sro')).subscribe(data => {
        this.pris = data;
        this.ftthservice.getMonositeByZone(localStorage.getItem('ID_sro')).subscribe(data => {
          this.monos = data;
            for (let i = 0; i < this.monos.length; i+=2) {this.concat.push(Object.assign(this.monos[i+1][0],this.monos[i]))}
            for (let i = 0; i < this.concat.length; i++) {Object.assign(this.concat[i],this.nbprise)}

             //concat client
             this.ftthservice.getClientsMonotest(localStorage.getItem('choixzone')).subscribe( (data)=>{
              this.clientest=data

              for (let i = 0; i < this.clientest.length; i++) {
                for (let j = 0; j < this.concat.length; j++) {
                  if(this.clientest[i][0].ID_immeuble==this.concat[j].ID_immeuble){
                  Object.assign(this.concat[j],this.clientest[i][0])
                }
                }
              }
              });

            this.mix=this.concat.concat(this.pris)
            console.log(this.mix);

            this.dtTrigger.next();
          },error => {this.status="warning"
          this.toastrService.show(``,`Aucun Monosite`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
        },error => {

          this.ftthservice.getMonositeByZone(localStorage.getItem('ID_sro')).subscribe(data => {
            this.monos = data;
              for (let i = 0; i < this.monos.length; i+=2) {this.concat.push(Object.assign(this.monos[i+1][0],this.monos[i]))}
              for (let i = 0; i < this.concat.length; i++) {Object.assign(this.concat[i],this.nbprise)}


              //concat client
              this.ftthservice.getClientsMonotest(localStorage.getItem('choixzone')).subscribe( (data)=>{
                this.clientest=data
                for (let i = 0; i < this.clientest.length; i++) {
                  for (let j = 0; j < this.concat.length; j++) {
                    if(this.clientest[i][0].ID_immeuble==this.concat[j].ID_immeuble){
                    this.mix.push(Object.assign(this.concat[j],this.clientest[i][0]))
                  }
                  }
                }
                });


              this.mix=this.concat.concat(this.pris)
              this.dtTrigger.next();
            },error => {this.status="warning"
            this.toastrService.show(``,`Aucun Monosite`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
        this.status="warning"
        this.toastrService.show(``,`Aucune Residence`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})






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
    localStorage.setItem('ID_pri',e.ID_pri)
    this.router.navigateByUrl('pages/consulter-immeubles/details-eligibilite-appartement')
  }
  copy(e){
    const val="Nom Immeuble:"+e.Nom_monosite+"\nAdresse:"+e.Adresse+"\nEtat raccordement:"+e.Etat_raccordement+"\nEtat convention:"+e.Etat_convention
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
