import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-consulter-zone-client',
  templateUrl: './consulter-zone-client.component.html',
  styleUrls: ['./consulter-zone-client.component.scss']
})
export class ConsulterZoneClientComponent implements OnInit {
  constructor(private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>

  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    this.router.navigateByUrl('pages/immeubles/gerer-client')
  }
  ngOnInit() {
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {alert('error chargement des zones')})
  }

}
