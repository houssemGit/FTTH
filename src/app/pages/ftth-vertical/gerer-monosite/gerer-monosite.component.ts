import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Appartement } from '../../../_models/appartement';
import { Cassette } from '../../../_models/cassette';
import { Splitter } from '../../../_models/splitter';
import { Port } from '../../../_models/port';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FtthService } from '../../../_service/ftth.service';
import { Router } from '@angular/router';
import { Monosite } from '../../../_models/monosite';
import { Sro } from '../../../_models/sro';
import { Olt } from '../../../_models/olt';
import { Immeuble } from '../../../_models/immeuble';
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';

@Component({
  selector: 'ngx-gerer-monosite',
  templateUrl: './gerer-monosite.component.html',
  styleUrls: ['./gerer-monosite.component.scss']
})
export class GererMonositeComponent implements OnInit {



  constructor(private formBuilder: FormBuilder,private router: Router, private ftthService: FtthService, private toastrService: NbToastrService,) {
    this.FormRacIn = this.formBuilder.group({
      n_t_d : ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      P_t_d : ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
    });
   }

  status: NbComponentStatus ;
  monos: Array<Monosite>=new Array ;

  monosite: Array<Monosite>=new Array ;;
  imonosite: Array<Monosite>=new Array ;;

  FormRacIn: FormGroup;
  loading = false;
  submitted = false;

  concat: Array<any>



  ngOnInit() {

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

  editmono(e) {

    localStorage.setItem("ID_immeuble", e.ID_immeuble.toString());
    localStorage.setItem("Num_steg", e.Num_steg.toString());
    localStorage.setItem("Adresse", e.Adresse.toString());
    localStorage.setItem("Nom_monosite", e.Nom_monosite.toString());
    if (e.Pos_tiroir_distribution!=null)
    {localStorage.setItem("Pos_tiroir_distribution", e.Pos_tiroir_distribution.toString())}
    localStorage.setItem("Num_plan", e.Num_plan.toString());
    localStorage.setItem("Type_immeuble", e.Type_immeuble.toString());


    this.router.navigateByUrl("pages/immeubles/modifier-monosite");
  }

  deletemono(e) {
    localStorage.setItem("ID_monosite",e.ID_immeuble)
  }

  ConfirmeSupR(){
    this.ftthService.deleteMono(localStorage.getItem("ID_monosite")).subscribe(
      Response => {
        this.status="danger"
        this.toastrService.show(``,`Monosite supprimée avec sucess!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur")
    );
  }

  annulerSup(){
    localStorage.setItem("ID_monosite",'')
  }

  portpriOUT: Port
  portIN:  Array<Port>
  portOUT: Port
  portIN1:  Array<Port>
  portOUT1 : Port

  posTc:string
  posPrispliter:number
  posTD:number
  posPs: number

  splt : Splitter
  posSs : number
  cast : Cassette
  posCs : number

  posTT: number
  posPo: number
  splt1 : Splitter
  cast1: Cassette

  posSo:number
  posCo:number

  sro: Sro
  olt : Olt
  nomSRO: string
  nomOLT: string

  showCrsp(e){//nom équipements
    this.ftthService.getSroById(e.ID_sro).subscribe((data)=>{this.sro= data
      this.nomSRO=this.sro.Nom_sro
      this.ftthService.getOltById(this.sro.ID_olt).subscribe((data)=>{this.olt= data
        this.nomOLT=this.olt.Nom_olt
        }, (error)=>{})
      }, (error)=>{})

     this.ftthService.getPortCorrespondantIn(e.Pos_tiroir_distribution).subscribe(data => {this.portOUT = data;
      console.log(this.portOUT[0].Position_tiroir);

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

  get fval1() {
    return this.FormRacIn.controls;
  }

  @ViewChild('closeModal',{static: false}) private closeModal: ElementRef;

  mono = new  Monosite


  chekyracIN(mono, i){
    this.pto=[]
    this.pto.push("d5")
    localStorage.setItem("ID_immeuble", mono.ID_immeuble)
    localStorage.setItem("num_monosite", i)
    localStorage.setItem("Pos_tiroir_distribution", mono.Pos_tiroir_distribution)

  }

  SubRaccordeIN(){
    this.submitted = true;
    if (this.FormRacIn.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.mono.Pos_tiroir_distribution= "TD N°: "+this.FormRacIn.controls["n_t_d"].value+" Position: "+this.FormRacIn.controls["P_t_d"].value;
    this.ftthService.raccorderPtoM(localStorage.getItem("ID_immeuble") ,this.mono).subscribe((data)=>{
    //this.concat[Number(localStorage.getItem("num_monosite"))]= data
    this.pto=[]
    this.pto.push(data.Pos_tiroir_distribution)
    this.status="success"
    this.toastrService.show(``,`Monosite raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    this.closeModal.nativeElement.click()
  }

  DeraccordeIN(){
    this.mono.Pos_tiroir_distribution='Non raccordé'
    this.ftthService.raccorderPtoM(localStorage.getItem("ID_immeuble") ,this.mono).subscribe((data)=>{
      this.pto=[]
    this.pto.push(data.Pos_tiroir_distribution)
    this.status="success"
    this.toastrService.show(``,`Monosite déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
   }

   annulerRIN(){
// ngfor trefreshi k addi wala removi wala reordri element mel array

    this.pto=[]
    this.pto.push(localStorage.getItem("Pos_tiroir_distribution"))

    localStorage.setItem("ID_monosite", "")
    localStorage.setItem("num_monosite", "")
    localStorage.setItem("Pos_tiroir_distribution", "")
  }

  pto: Array<string>
  clickacco(mono){
    this.pto=[]
    this.pto.push(mono.Pos_tiroir_distribution)
  }

}
