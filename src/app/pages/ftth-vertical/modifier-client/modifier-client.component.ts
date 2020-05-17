import { Component, OnInit } from '@angular/core';
import { Client } from '../../../_models/client';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Immeuble } from '../../../_models/immeuble';
import { FtthService } from '../../../_service/ftth.service';
import { Router } from '@angular/router';
import { Appartement } from '../../../_models/appartement';
import { Monosite } from '../../../_models/monosite';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ngx-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.scss']
})
export class ModifierClientComponent implements OnInit {



  Type_clients = ['B2B', 'B2C']
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthservice: FtthService,
    private toastrService: NbToastrService) {


    }

  status: NbComponentStatus  ;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

    Num_stegs : Array<string>=new Array
    immeubles : Array<Immeuble>




    clients: Array<Client>;
    monos : Array<Monosite>
    apparts : Array<Appartement>
    monoc : Monosite
    appart : Appartement
    concat: Array<any>=new Array ;
    ID_imm : Array<number>=new Array
    ch : string



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Num_serie_ONT: ['', Validators.required],
      Solution_raccordement: [''],
      Budget_optique: [''],
      Type_client: ['', Validators.required],
      Num_telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      Code_site: ['', Validators.required],
      MSISDN: ['', Validators.required],
      Num_steg: ['', Validators.required],

  });

  this.registerForm.controls['Num_serie_ONT'].setValue(localStorage.getItem('Num_serie_ONT'))
  this.registerForm.controls['Code_site'].setValue(localStorage.getItem('Code_site'))
  this.registerForm.controls['MSISDN'].setValue(localStorage.getItem('MSISDN'))
  this.registerForm.controls['Solution_raccordement'].setValue(localStorage.getItem('Solution_raccordement'))
  this.registerForm.controls['Budget_optique'].setValue(localStorage.getItem('Budget_optique'))
  this.registerForm.controls['Type_client'].setValue(localStorage.getItem('Type_client'))
  this.registerForm.controls['Num_telephone'].setValue(localStorage.getItem('Num_telephone'))
  this.registerForm.controls['Num_steg'].setValue(localStorage.getItem('Num_steg'))
  this.ch=localStorage.getItem('Num_steg')


  if (localStorage.getItem('choixresidence') != null){

    // affichage des num steg des appartement dans residence
    this.ftthservice.getAppartByResidence(localStorage.getItem('ID_pri')).subscribe(data => {
     this.apparts=data
     for (let i = 0; i < this.apparts.length; i+=2) {
       this.concat.push(Object.assign(this.apparts[i+1][0],this.apparts[i]))
       this.Num_stegs.push(this.apparts[i+1][0].Num_steg)
       this.ID_imm.push(this.apparts[i+1][0].ID_immeuble)
     }
   })

   for (let i = 0; i < this.concat.length; i++) {
     this.ftthservice.getClientImmeuble(this.concat[i].ID_immeuble).subscribe(data =>{
       this.Num_stegs.splice(this.Num_stegs.indexOf(this.concat[i].Num_steg),1)
     });
 }

}
else{

 // affichage des num steg des monosites dans zone
 this.ftthservice.getMonositeByZone(localStorage.getItem('ID_sro')).subscribe(data => {
 this.monos = data;
   for (let i = 0; i < this.monos.length; i+=2) {
     this.concat.push(Object.assign(this.monos[i+1][0],this.monos[i]))
     this.Num_stegs.push(this.monos[i+1][0].Num_steg)
     this.ID_imm.push(this.monos[i+1][0].ID_immeuble)
   }

   for (let i = 0; i < this.concat.length; i++) {
       this.ftthservice.getClientImmeuble(this.concat[i].ID_immeuble).subscribe(data =>{
         this.Num_stegs.splice(this.Num_stegs.indexOf(this.concat[i].Num_steg),1)
       });
   }

 })

}

  }

  client= new Client;
  immeuble: Immeuble;
  get fval() { return this.registerForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    var i=0 ; var stop=true;
    while( i < this.Num_stegs.length && stop){
      if (this.Num_stegs[i]==this.registerForm.controls["Num_steg"].value)
      {this.client.ID_immeuble=this.ID_imm[i];
      stop=false}
      else i++
    }
    if (i == this.Num_stegs.length) {
    this.status="danger"
    this.toastrService.show(``,`Numero steg introuvable!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
    return console.log(" invalid");}

    this.client.Num_serie_ONT = this.registerForm.controls["Num_serie_ONT"].value;
    this.client.MSISDN = this.registerForm.controls["MSISDN"].value;
    this.client.Code_site = this.registerForm.controls["Code_site"].value;
    this.client.Solution_raccordement = this.registerForm.controls["Solution_raccordement"].value;
    this.client.Budget_optique = this.registerForm.controls["Budget_optique"].value;
    this.client.Type_client = this.registerForm.controls["Type_client"].value;
    this.client.Num_telephone = this.registerForm.controls["Num_telephone"].value;
    this.client.ID_immeuble = Number(localStorage.getItem('ID_immeuble'))


    this.ftthservice.updateClient(localStorage.getItem('ID_client'),this.client).subscribe(
      (data)=>{
        this.status="warning"
        this.toastrService.show(``,`Client modifié!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});        this.loading = false;
        this.router.navigate(['pages/immeubles/gerer-client']);
     },
      (error)=>{
        this.status="danger"
        this.toastrService.show(``,`Erreur modification!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});        this.loading = false;
      }
    )

  }
    get type_c() {
      return this.registerForm.get('Type_client');
    }
   changeType_client(e) {
    this.type_c.setValue(e.target.value, {onlySelf: true})
  }


  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.Num_stegs.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )



}
