import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-consulter-zone-pri',
  templateUrl: './consulter-zone-pri.component.html',
  styleUrls: ['./consulter-zone-pri.component.scss']
})
export class ConsulterZonePriComponent implements OnInit {

  constructor(private toastrService: NbToastrService,private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>
  status: NbComponentStatus ;


  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    localStorage.setItem('ID_sro',e.ID_sro)
    this.router.navigateByUrl('pages/immeubles/gerer-pri')
  }
  ngOnInit() {
    //localStorage.clear()
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error =>{this.status="warning"
    this.toastrService.show(``,`Aucun Sro`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});})
  }

}
