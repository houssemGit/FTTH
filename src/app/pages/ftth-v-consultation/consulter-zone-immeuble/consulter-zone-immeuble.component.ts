import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-consulter-zone-immeuble',
  templateUrl: './consulter-zone-immeuble.component.html',
  styleUrls: ['./consulter-zone-immeuble.component.scss']
})
export class ConsulterZoneImmeubleComponent implements OnInit {

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
