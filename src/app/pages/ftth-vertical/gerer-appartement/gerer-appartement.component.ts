import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { FtthService } from '../../../_service/ftth.service';
import { Router } from '@angular/router';
import { Appartement } from '../../../_models/appartement';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Port } from '../../../_models/port';
import { Splitter } from '../../../_models/splitter';
import { Cassette } from '../../../_models/cassette';
import { Pri } from '../../../_models/pri';
import { Sro } from '../../../_models/sro';
import { Olt } from '../../../_models/olt';

@Component({
  selector: 'ngx-gerer-appartement',
  templateUrl: './gerer-appartement.component.html',
  styleUrls: ['./gerer-appartement.component.scss']
})
export class GererAppartementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private ftthService: FtthService, private toastrService: NbToastrService,) {
    this.FormRacIn = this.formBuilder.group({
      n_c_c : ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      P_t_c : ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
    });
   }

  status: NbComponentStatus ;
  aparts: Array<Appartement>;
  FormRacIn: FormGroup;
  loading = false;
  submitted = false;
  concat: Array<any>
  zoen:string
  res:string

  ngOnInit() {
    this.zoen=localStorage.getItem("choixzone")
    this.res=localStorage.getItem("choixresidence")
    this.concat=[]
    this.ftthService.getAppartByResidence(localStorage.getItem('ID_pri')).subscribe(data => {
      this.aparts = data;
      for (let i = 0; i < this.aparts.length; i+=2) {
        this.concat.push(Object.assign(this.aparts[i+1][0],this.aparts[i]))
        }
    }, error => {
    this.status="warning"
    this.toastrService.show(``,`Aucun Appartement`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
    //clean the localstorage
    localStorage.removeItem("ID_immeuble");localStorage.removeItem("Num_steg");localStorage.removeItem("Num_appartement");localStorage.removeItem("Num_etage");localStorage.removeItem("Nom_bloc");localStorage.removeItem("Num_BE");localStorage.removeItem("Pos_tiroir_col_montante");localStorage.removeItem("Type_immeuble");
  }


  editApart(e) {
    localStorage.setItem("ID_immeuble", e.ID_immeuble.toString());
    localStorage.setItem("Num_steg", e.Num_steg.toString());
    localStorage.setItem("Num_appartement", e.Num_appartement.toString());
    localStorage.setItem("Num_etage", e.Num_etage.toString());
    localStorage.setItem("Nom_bloc", e.Nom_bloc.toString());
    localStorage.setItem("Num_BE", e.Num_BE.toString());
    localStorage.setItem("Pos_tiroir_col_montante", e.Pos_tiroir_col_montante.toString());
    localStorage.setItem("Type_immeuble", e.Type_immeuble.toString());

    this.router.navigateByUrl("pages/immeubles/modifier-appartement");
  }

  deleteAppart(e) {
    localStorage.setItem("ID_immeuble",e.ID_immeuble)
  }

  ConfirmeSupR(){
    this.ftthService.deleteAppart(localStorage.getItem("ID_immeuble")).subscribe(
      Response => {
        this.status="danger"
        this.toastrService.show(``,`Appartement supprimée avec sucess!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur")
    );
  }

  annulerSup(){
    localStorage.setItem("ID_immeuble",'')
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
  coulfibre : string
  coultube : string
  coulfibre0 : string
  coultube0 : string
  coulfibre1 : string
  coultube1 : string




  showCrsp(res){

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
      this.coulfibre0=this.portOUT0[0].Couleur_fibre
      this.coultube0=this.portOUT0[0].Couleur_tube
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
              this.coulfibre=this.portOUT[0].Couleur_fibre
              this.coultube=this.portOUT[0].Couleur_tube
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
                      this.coulfibre1=this.portOUT1[0].Couleur_fibre
                      this.coultube1=this.portOUT1[0].Couleur_tube
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

  get fval1() {
    return this.FormRacIn.controls;
  }

  @ViewChild('closeModal',{static: false}) private closeModal: ElementRef;

  appart : Appartement= new Appartement

  chekyracIN(appart, i){
    this.pto=[]
    this.pto.push("d5")
    localStorage.setItem("ID_appartement", appart.ID_immeuble)
    localStorage.setItem("num_appart", i)
    localStorage.setItem("Pos_tiroir_col_montante", appart.Pos_tiroir_col_montante)
  }

  bool: boolean
  SubRaccordeIN(){
    this.bool=true
    this.submitted = true;
    if (this.FormRacIn.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.appart.Pos_tiroir_col_montante= "TCM N°: "+this.FormRacIn.controls["n_c_c"].value+" Position: "+this.FormRacIn.controls["P_t_c"].value;
    this.ftthService.UniquePosAppart(localStorage.getItem("ID_pri"), this.appart.Pos_tiroir_col_montante).subscribe(data=>{
      if(data==true) {
       this.bool=false
       this.status="danger";
       this.toastrService.show(``,`Position tiroire déjà raccordée!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
       this.closeModal.nativeElement.click()
       this.annulerRIN()
       return console.log("Non unique");}

       if(this.bool){
        this.ftthService.raccorderPtoA(localStorage.getItem("ID_appartement") ,this.appart).subscribe((data)=>{
          this.status="success"
          this.toastrService.show(``,`Appartement raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
          localStorage.removeItem("Pos_tiroir_col_montante")
          localStorage.removeItem("ID_appartement")
          localStorage.removeItem("num_appart")
          this.ngOnInit()},
          (error)=>{alert('error modification!!');})
          this.closeModal.nativeElement.click()
        }
     })

  }

  DeraccordeIN(){
    this.appart.Pos_tiroir_col_montante='Non Raccordé'
    //this.appart.IsRaccorde= false
    this.ftthService.raccorderPtoA(localStorage.getItem("ID_appartement") ,this.appart).subscribe((data)=>{
    this.status="success"
    this.toastrService.show(``,`Appartement déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
    localStorage.removeItem("Pos_tiroir_col_montante")
    localStorage.removeItem("ID_appartement")
    localStorage.removeItem("num_appart")
    this.ngOnInit()}
    ,(error)=>{alert('error modification!!');})
   }

   annulerRIN(){
    this.pto=[]
    this.pto.push(localStorage.getItem("Pos_tiroir_col_montante"))
    localStorage.removeItem("Pos_tiroir_col_montante")
    localStorage.removeItem("ID_appartement")
    localStorage.removeItem("num_appart")
  }

  pto: Array<string>
  clickacco(appart){
    this.pto=[]
    this.pto.push(appart.Pos_tiroir_col_montante)
  }

}
