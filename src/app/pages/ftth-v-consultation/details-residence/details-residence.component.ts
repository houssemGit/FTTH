import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Client } from '../../../_models/client';
import { Appartement } from '../../../_models/appartement';
import { Port } from '../../../_models/port';
import { Splitter } from '../../../_models/splitter';
import { Cassette } from '../../../_models/cassette';
import { Olt } from '../../../_models/olt';
import { Sro } from '../../../_models/sro';
import { Pri } from '../../../_models/pri';

@Component({
  selector: 'ngx-details-residence',
  templateUrl: './details-residence.component.html',
  styleUrls: ['./details-residence.component.scss']
})
export class DetailsResidenceComponent implements OnInit {

  constructor(private router: Router, private ftthService: FtthService,private toastrService: NbToastrService) { }
  status: NbComponentStatus ;
  apparts : Array<Appartement>
  Nom_residence: string
  concat: Array<any>=new Array ;


 ngOnInit() {
    this.Nom_residence= localStorage.getItem('choixresidence')
    this.ftthService.getAppartByResidence(localStorage.getItem('ID_pri')).subscribe(data => {
    this.apparts = data;
    for (let i = 0; i < this.apparts.length; i+=2) {this.concat.push(Object.assign(this.apparts[i+1][0],this.apparts[i]))}

  },error=>{this.status="warning"
    this.toastrService.show(``,`Pas d'appartements dans cette résidence `,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

  portIN : Array<Port>
  portOUT : Port
  portOUT0 : Port
  splt : Splitter
  cast : Cassette
  olt : Olt
  sro : Sro
  posPs : Number
  posSs : Number
  posCs : Number
  nomOLT : string
  nomSRO : string
  nomPRI : string
  posTT : string
  posTD : string

  posPo:number
  splt1:Splitter
  posSo:number
  cast1: Cassette
  posCo:number
  portIN1: Array<Port>
  portOUT1: Port
  pri: Pri

  PosTM:number
  posPp:number
  posSp:number
  posCp:number
  splt0:Splitter
  cast0: Cassette


  crspRes(res){

    this.ftthService.getPriById(localStorage.getItem("ID_pri")).subscribe((data)=>{this.pri= data
      this.nomPRI= this.pri.Nom_pri
      this.ftthService.getSroById(this.pri.ID_sro.toString()).subscribe((data)=>{this.sro= data
        this.nomSRO=this.sro.Nom_sro
        this.ftthService.getOltById(this.sro.ID_olt).subscribe((data)=>{this.olt= data
          this.nomOLT=this.olt.Nom_olt
          }, (error)=>{})
        }, (error)=>{})
     }, (error)=>{})



    this.ftthService.getPortCorrespondantIn(res.Pos_tiroir_col_montante).subscribe(data => {this.portOUT0 = data;
      this.PosTM=this.portOUT0[0].Position_tiroir
      this.posPp=this.portOUT0[0].Position


           this.ftthService.getSplitterById(this.portOUT0[0].ID_splitter).subscribe(data => {this.splt0 = data;
             this.posSp=this.splt0[0].Position
             this.ftthService.getCassetteById(this.splt0[0].ID_cassette).subscribe(data => {this.cast0 = data;
               this.posCp=this.cast0[0].Num_cassette

             },error=>{alert('error')});
           },error=>{alert('error')});

           this.ftthService.getBySplitterIn(this.portOUT0[0].ID_splitter).subscribe(data => {this.portIN = data;
            this.ftthService.getPortCorrespondantIn(this.portIN[0].Position_tiroir).subscribe(data => {this.portOUT = data;
              this.posTD=this.portOUT[0].Position_tiroir
              this.posPs=this.portOUT[0].Position


                   this.ftthService.getSplitterById(this.portOUT[0].ID_splitter).subscribe(data => {this.splt = data;
                     this.posSs=this.splt[0].Position
                     this.ftthService.getCassetteById(this.splt[0].ID_cassette).subscribe(data => {this.cast = data;
                       this.posCs=this.cast[0].Num_cassette


                     },error=>{alert('error')});
                   },error=>{alert('error')});

                   this.ftthService.getBySplitterIn(this.portOUT[0].ID_splitter).subscribe(data => {this.portIN1 = data;
                    this.ftthService.getPortCorrespondantIn(this.portIN1[0].Position_tiroir).subscribe(data => {this.portOUT1 = data;

                      this.posTT=this.portOUT1[0].Position_tiroir
                      this.posPo=this.portOUT1[0].Position


                      this.ftthService.getSplitterById(this.portOUT[0].ID_splitter).subscribe(data => {this.splt1 = data;
                        this.posSo=this.splt1[0].Position
                        this.ftthService.getCassetteById(this.splt1[0].ID_cassette).subscribe(data => {this.cast1 = data;
                          this.posCo=this.cast1[0].Num_cassette

                        },error=>{alert('error')})
                      },error=>{alert('error')})



                     },error=>{alert('error')});
                   },error=>{alert('error')});


               },error=>{alert('error')});
             },error=>{alert('error')});


       },error=>{alert('error')});
  }


  nsONT:string
  Ntel:number
  SR:string
  Bo:string
  type:string
  client:Client
  introuvable: boolean
  showClient(res){
    this.ftthService.getClientsByImmeuble(res.ID_immeuble).subscribe(data => {this.client= data
      this.introuvable=false
      this.nsONT=this.client[0].Num_serie_ONT
      this.Ntel=this.client[0].Num_telephone
      this.SR=this.client[0].Solution_raccordement
      this.Bo=this.client[0].Budget_optique
      this.type=this.client[0].Type_client
    }, error => {
      this.introuvable=true

    })
  }

  pto: Array<string>
  clickacco(app){
    this.pto=[]
    this.pto.push(app.Pos_tiroir_col_montante)

  }

}
