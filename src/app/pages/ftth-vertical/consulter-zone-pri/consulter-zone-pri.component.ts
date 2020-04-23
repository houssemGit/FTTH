import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-consulter-zone-pri',
  templateUrl: './consulter-zone-pri.component.html',
  styleUrls: ['./consulter-zone-pri.component.scss']
})
export class ConsulterZonePriComponent implements OnInit {

  constructor(private router: Router, private ftthService: FtthService) { }

  sros: Array<Sro>

  viewZone(e){
    localStorage.setItem('choixzone',e.Nom_zone)
    this.router.navigateByUrl('pages/immeubles/gerer-pri')
  }
  ngOnInit() {
    this.ftthService.AllSro().subscribe(data=>{
      this.sros=data
    },error => {alert('error chargement des zones')})
  }

}
