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
import { Client } from '../../../_models/client';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Excel } from '../../../_models/excel';

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

   @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<Appartement> = new Subject();
  status: NbComponentStatus ;
  aparts: Array<Appartement>;
  FormRacIn: FormGroup;
  loading = false;
  submitted = false;
  concat: Array<any>=new Array ;
  zoen:string
  res:string
  apparts: Array<any>=new Array ;
  clientest  :Array<any>=new Array ;
  aa: string

  ngOnInit() {
    //uploadForm
    this.uploadForm = this.formBuilder.group({
      excel: ['']
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      "ordering": false
    };

    this.zoen=localStorage.getItem("choixzone")
    this.res=localStorage.getItem("choixresidence")

    this.ftthService.getAppartByResidence(localStorage.getItem('ID_pri')).subscribe(data => {
      this.apparts = data;
        for (let i = 0; i < this.apparts.length; i+=2) {this.concat.push(Object.assign(this.apparts[i+1][0],this.apparts[i]))}
           //concat client
           this.ftthService.getClientsResidencetest(localStorage.getItem('ID_pri')).subscribe( (data)=>{
            this.clientest=data

            for (let i = 0; i < this.clientest.length; i++) {
              for (let j = 0; j < this.concat.length; j++) {
                if(this.clientest[i][0].ID_immeuble==this.concat[j].ID_immeuble){
                Object.assign(this.concat[j],this.clientest[i][0])
              }
              }
            }
            });
        this.dtTrigger.next();
    }, error => {
    this.status="warning"
    this.toastrService.show(``,`Aucun Appartement`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
    //clean the localstorage
    localStorage.removeItem("ID_immeuble");localStorage.removeItem("Num_steg");localStorage.removeItem("Num_appartement");localStorage.removeItem("Num_etage");localStorage.removeItem("Nom_bloc");localStorage.removeItem("Num_BE");localStorage.removeItem("Pos_tiroir_col_montante");localStorage.removeItem("NCCCM");localStorage.removeItem("Coul_fib");localStorage.removeItem("Coul_tube");
  }

  uploadForm : FormGroup
  fileChange(event) {
    const file = event.target.files[0]
    this.uploadForm.get('excel').setValue(file);
  }
  omport = new Excel()
  // file : File
  // public onFileChange(files: FileList): void {
  //   if (files.length) {
  //     this.file = files[0];
  //   }
  // }

  onSubmitImport(){
    const select_file = new FormData();
    select_file.append("select_file",this.uploadForm.get('excel').value)
    this.omport.id=Number(localStorage.getItem('ID_pri'))
    this.omport.select_file=select_file


    console.log(select_file.get("select_file"));




    this.ftthService.ImportExcel(this.omport).subscribe(data => console.log(data), error => console.log(error))
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editApart(e) {
    localStorage.setItem("ID_immeuble", e.ID_immeuble.toString());
    localStorage.setItem("Num_steg", e.Num_steg.toString());
    localStorage.setItem("Num_appartement", e.Num_appartement.toString());
    localStorage.setItem("Num_etage", e.Num_etage.toString());
    localStorage.setItem("Nom_bloc", e.Nom_bloc.toString());
    localStorage.setItem("Num_BE", e.Num_BE.toString());
    localStorage.setItem("Pos_tiroir_col_montante", e.Pos_tiroir_col_montante.toString());
    localStorage.setItem("NCCCM", e.Nom_Capacite_Cable_Colonne_Montante.toString());
    localStorage.setItem("Coul_fib", e.Couleur_fibre.toString());
    localStorage.setItem("Coul_tube", e.Couleur_tube.toString());

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

  nsONT:string
  Ntel:number
  SR:string
  Bo:string
  type:string
  client:Client
  introuvable: boolean
  detailsClient(e){
    this.ftthService.getClientsByImmeuble(e.ID_immeuble).subscribe(data => {this.client= data
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

}
