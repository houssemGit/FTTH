import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';
import { Pri } from '../../../_models/pri';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-consulter-residence-apart',
  templateUrl: './consulter-residence-apart.component.html',
  styleUrls: ['./consulter-residence-apart.component.scss']
})
export class ConsulterResidenceApartComponent implements OnInit {

  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  pris: Array<Pri>
  status: NbComponentStatus ;
  zoni: string


  viewResidence(e){
    localStorage.setItem('choixresidence',e.Nom_residence)
    localStorage.setItem('ID_pri',e.ID_pri)
    this.router.navigateByUrl('pages/immeubles/gerer-appartement')
  }
  ngOnInit() {
    this.zoni= localStorage.getItem("choixzone")
    this.ftthService.getPriByZone(localStorage.getItem("ID_sro")).subscribe(data=>{
      this.pris=data
    },error => {this.status="warning"
    this.toastrService.show(``,`Aucun PRI`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});}
    )

  }

}
