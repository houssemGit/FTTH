import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Pri } from '../../../_models/pri';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Monosite } from '../../../_models/monosite';

@Component({
  selector: 'ngx-consulter-immeuble-client',
  templateUrl: './consulter-immeuble-client.component.html',
  styleUrls: ['./consulter-immeuble-client.component.scss']
})
export class ConsulterImmeubleClientComponent implements OnInit {

  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  pris: Array<Pri>
  monos: Array<Monosite>
  status: NbComponentStatus ;
  zoni: string


  viewResidence(e){
    localStorage.setItem('choixresidence',e.Nom_residence)
    localStorage.setItem('ID_pri',e.ID_pri)
    this.router.navigateByUrl('pages/immeubles/gerer-client')
  }

  ngOnInit() {
    this.zoni= localStorage.getItem("choixzone")
    this.ftthService.getPriByZone(localStorage.getItem("ID_sro")).subscribe(data=>{
      this.pris=data
    },error => {this.status="warning"
    this.toastrService.show(``,`Aucun Residence`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});}
    )


  }
  routecmono(){
    localStorage.removeItem('choixresidence')
    localStorage.removeItem('ID_pri')
    this.router.navigateByUrl('pages/immeubles/gerer-client')
  }

}
