import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { FtthService } from '../../../_service/ftth.service';
import { Router } from '@angular/router';
import { Cassette } from '../../../_models/cassette';
import { Splitter } from '../../../_models/splitter';
import { Port } from '../../../_models/port';
import { Pri } from '../../../_models/pri';
import { Monosite } from '../../../_models/monosite';
import { Olt } from '../../../_models/olt';
import { Sro } from '../../../_models/sro';
import { Client } from '../../../_models/client';

@Component({
  selector: 'ngx-details-immeuble',
  templateUrl: './details-immeuble.component.html',
  styleUrls: ['./details-immeuble.component.scss']
})
export class DetailsImmeubleComponent implements OnInit {

  constructor(private router: Router, private ftthService: FtthService,private toastrService: NbToastrService) { }
  status: NbComponentStatus ;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;
  portss: Array<Port>;
  itat: string;
  porti: Array<Port>
  pris: Array<Pri>;
  monos : Array<Monosite>;

  ngOnInit() {
  }

  openRes(){
    this.ftthService.getPriByZone(localStorage.getItem('ID_sro')).subscribe(data => {this.pris = data;},error=>{this.status="warning"
    this.toastrService.show(``,`Pas de Residences dans cette zone `,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

  openC(pri){
    localStorage.setItem('ID_pri',pri.ID_pri)
    this.cassettes=[]
    this.ftthService.getByPri(pri.ID_pri).subscribe(data => {this.cassettes = data;},error=>{this.status="warning"
    this.toastrService.show(``,`Cette PRI ne contient pas de cassettes`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

  openS(e){
    this.splitters=[]
    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;},error=>{this.status="warning"
    this.toastrService.show(``,`Cette Cassette ne contient pas de splitters`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

  openP(e){
    this.portss=[]
    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.portss = data;},error=>{alert('error')});
    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => { this.porti = data; this.itat=this.porti[0].Etat},error=>{alert('error')});
  }


  portIN : Array<Port>
  portOUT : Port
  splt : Splitter
  cast : Cassette
  olt : Olt
  sro : Sro
  posPs : Number
  posSs : Number
  posCs : Number
  nomOLT : string
  nomSRO : string
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


  showCrspPri(e){this.ftthService.getPriById(localStorage.getItem("ID_pri")).subscribe((data)=>{this.pri= data
    this.ftthService.getSroById(this.pri.ID_sro.toString()).subscribe((data)=>{this.sro= data
      this.nomSRO=this.sro.Nom_sro
      this.ftthService.getOltById(this.sro.ID_olt).subscribe((data)=>{this.olt= data
        this.nomOLT=this.olt.Nom_olt
        }, (error)=>{})
      }, (error)=>{})
   }, (error)=>{})



   this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.portIN = data;
     this.ftthService.getPortCorrespondantIn(this.portIN[0].Position_tiroir).subscribe(data => {this.portOUT = data;
       this.posTD=this.portOUT[0].Position_tiroir
       this.posPs=this.portOUT[0].Position

      // position spliter cassette SRO
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

               // position spliter cassette OLT

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

  }

  concat: Array<any>
  openMono(){
    this.concat=[]
    this.ftthService.getMonositeByZone(localStorage.getItem('ID_sro')).subscribe(data => {
      this.monos = data;
      for (let i = 0; i < this.monos.length; i+=2) {
        this.concat.push(Object.assign(this.monos[i+1][0],this.monos[i]))
        }
    }, error => {
    this.status="warning"
    this.toastrService.show(``,`Aucun Monosite`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

  crspMono(e){
    //nom équipements
      this.ftthService.getSroById(e.ID_sro).subscribe((data)=>{this.sro= data
        this.nomSRO=this.sro.Nom_sro
        this.ftthService.getOltById(this.sro.ID_olt).subscribe((data)=>{this.olt= data
          this.nomOLT=this.olt.Nom_olt
          }, (error)=>{})
        }, (error)=>{})

       this.ftthService.getPortCorrespondantIn(e.Pos_tiroir_distribution).subscribe(data => {this.portOUT = data;
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

  }

  nsONT:string
  nsn:string
  Ntel:number
  SR:string
  Bo:string
  type:string
  client:Client
  introuvable: boolean
  showClient(mono){
    this.ftthService.getClientsByImmeuble(mono.ID_immeuble).subscribe(data => {this.client= data
      this.introuvable=false
      this.nsONT=this.client[0].Num_serie_ONT
      this.nsn=this.client[0].Num_SN
      this.Ntel=this.client[0].Num_telephone
      this.SR=this.client[0].Solution_raccordement
      this.Bo=this.client[0].Budget_optique
      this.type=this.client[0].Type_client
    }, error => {
      this.introuvable=true

    })
  }
  Appartdetails(e){
    this.router.navigateByUrl("pages/consulter-immeubles/details-residence")
    localStorage.setItem("ID_pri",e.ID_pri)
  }

  pto: Array<string>
  clickacco(mono){
    this.pto=[]
    this.pto.push(mono.Pos_tiroir_distribution)
  }
  openres(pri){
    console.log(pri.ID_pri);

    localStorage.setItem('ID_pri',pri.ID_pri)
  }

}
