import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-consulter-zone',
  templateUrl: './consulter-zone.component.html',
  styleUrls: ['./consulter-zone.component.scss']
})
export class ConsulterZoneComponent implements OnInit {

  constructor(private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>

  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    this.router.navigateByUrl('pages/consulter-zones/details')
  }
  ngOnInit() {
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {alert('error chargement des zones')})
  }

}
