import { Component, OnInit } from '@angular/core';
import { Sro } from '../../../_models/sro';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';

@Component({
  selector: 'ngx-consulter-zone-immeuble-mono-apart',
  templateUrl: './consulter-zone-immeuble-mono-apart.component.html',
  styleUrls: ['./consulter-zone-immeuble-mono-apart.component.scss']
})
export class ConsulterZoneImmeubleMonoApartComponent implements OnInit {

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
