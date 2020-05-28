import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-consulter-zone-eligibilite',
  templateUrl: './consulter-zone-eligibilite.component.html',
  styleUrls: ['./consulter-zone-eligibilite.component.scss']
})
export class ConsulterZoneEligibiliteComponent implements OnInit {



  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>
  status: NbComponentStatus ;


  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    localStorage.setItem('ID_sro',e.ID_sro)
    this.router.navigateByUrl('pages/consulter-immeubles/details-eligibilite')
  }
  ngOnInit() {
    //localStorage.clear()
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {this.status="warning"
    this.toastrService.show(``,`Aucun zone`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
  }

}
