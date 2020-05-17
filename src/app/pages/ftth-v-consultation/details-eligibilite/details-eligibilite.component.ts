import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Pri } from '../../../_models/pri';
import { Monosite } from '../../../_models/monosite';

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

    this.zone= localStorage.getItem('choixzone')

      this.ftthservice.getPriByZone(localStorage.getItem('ID_sro')).subscribe(data => {
        this.pris = data;
        this.ftthservice.getMonositeByZone(localStorage.getItem('ID_sro')).subscribe(data => {
          this.monos = data;
            for (let i = 0; i < this.monos.length; i+=2) {this.concat.push(Object.assign(this.monos[i+1][0],this.monos[i]))}
            for (let i = 0; i < this.concat.length; i++) {Object.assign(this.concat[i],this.nbprise)}
            this.mix=this.concat.concat(this.pris)
            this.dtTrigger.next();
          },error => {this.status="warning"
          this.toastrService.show(``,`Aucun Monosite`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
        },error => {

          this.ftthservice.getMonositeByZone(localStorage.getItem('ID_sro')).subscribe(data => {
            this.monos = data;
              for (let i = 0; i < this.monos.length; i+=2) {this.concat.push(Object.assign(this.monos[i+1][0],this.monos[i]))}
              for (let i = 0; i < this.concat.length; i++) {Object.assign(this.concat[i],this.nbprise)}
              this.mix=this.concat.concat(this.pris)
              this.dtTrigger.next();
            },error => {this.status="warning"
            this.toastrService.show(``,`Aucun Monosite`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
        this.status="warning"
        this.toastrService.show(``,`Aucune Residence`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})






  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
