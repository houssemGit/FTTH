import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'ngx-consulter-zone-residence',
  templateUrl: './consulter-zone-residence.component.html',
  styleUrls: ['./consulter-zone-residence.component.scss']
})
export class ConsulterZoneResidenceComponent implements OnInit {


  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>
  status: NbComponentStatus ;

  viewZone(e){
    localStorage.setItem('ID_sro',e.ID_sro)
    localStorage.setItem('choixzone',e.Nom_zone)
    this.router.navigateByUrl('pages/consulter-immeubles/consulter-residence')
  }
  ngOnInit() {
    localStorage.clear()
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {this.status="warning"
    this.toastrService.show(``,`Aucun Sro`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
  }
}
