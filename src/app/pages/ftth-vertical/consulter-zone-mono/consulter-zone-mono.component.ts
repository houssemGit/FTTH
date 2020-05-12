import { Component, OnInit } from '@angular/core';
import { Sro } from '../../../_models/sro';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-consulter-zone-mono',
  templateUrl: './consulter-zone-mono.component.html',
  styleUrls: ['./consulter-zone-mono.component.scss']
})
export class ConsulterZoneMonoComponent implements OnInit {

  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>
  status: NbComponentStatus ;


  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    localStorage.setItem('ID_sro',e.ID_sro)
    this.router.navigateByUrl('pages/immeubles/gerer-monosite')
  }
  ngOnInit() {
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {this.status="warning"
    this.toastrService.show(``,`Aucun Sro`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
  }


}
