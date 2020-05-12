import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-consulter-zone-client',
  templateUrl: './consulter-zone-client.component.html',
  styleUrls: ['./consulter-zone-client.component.scss']
})
export class ConsulterZoneClientComponent implements OnInit {
  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>
  status: NbComponentStatus ;


  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    localStorage.setItem('ID_sro',e.ID_sro)
    this.router.navigateByUrl('pages/immeubles/consulter-immeuble-client')
  }
  ngOnInit() {
    localStorage.clear()
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {this.status="warning"
    this.toastrService.show(``,`Aucun Sro`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
  }

}
