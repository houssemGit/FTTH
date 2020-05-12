import { Component, OnInit } from '@angular/core';
import { FtthService } from '../../../_service/ftth.service';
import { Router } from '@angular/router';
import { Sro } from '../../../_models/sro';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-consulter-zone-apart',
  templateUrl: './consulter-zone-apart.component.html',
  styleUrls: ['./consulter-zone-apart.component.scss']
})
export class ConsulterZoneApartComponent implements OnInit {
  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  status: NbComponentStatus ;


  sros: Array<Sro>

  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    localStorage.setItem('ID_sro',e.ID_sro)
    this.router.navigateByUrl('pages/immeubles/consulter-residence-apart')
  }
  ngOnInit() {
    localStorage.clear()
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {this.status="warning"
    this.toastrService.show(``,`Aucun Sro`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
  }

}
