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



  Type_clients = ['B2B', 'B2C','Pro','P2P','OIAB']
  Etat_clients = ['Raccordé','Non Raccordé','Résilié']

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



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Num_serie_ONT: ['', Validators.required],
      Solution_raccordement: [''],
      Budget_optique: [''],
      Type_client: ['', Validators.required],
      Num_telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      Code_site: ['', Validators.required],
      MSISDN: ['', Validators.required],
      KCRM: ['', Validators.required],
      Debit: ['', Validators.required],
      Nom_soustraitant: ['', Validators.required],
      Etat_client: ['', Validators.required],

  });

  this.registerForm.controls['Num_serie_ONT'].setValue(localStorage.getItem('Num_serie_ONT'))
  this.registerForm.controls['Code_site'].setValue(localStorage.getItem('Code_site'))
  this.registerForm.controls['MSISDN'].setValue(localStorage.getItem('MSISDN'))
  this.registerForm.controls['Solution_raccordement'].setValue(localStorage.getItem('Solution_raccordement'))
  this.registerForm.controls['Budget_optique'].setValue(localStorage.getItem('Budget_optique'))
  this.registerForm.controls['Type_client'].setValue(localStorage.getItem('Type_client'))
  this.registerForm.controls['Num_telephone'].setValue(localStorage.getItem('Num_telephone'))
  this.registerForm.controls['KCRM'].setValue(localStorage.getItem('KCRM'))
  this.registerForm.controls['Debit'].setValue(localStorage.getItem('Debit'))
  this.registerForm.controls['Nom_soustraitant'].setValue(localStorage.getItem('Nom_soustraitant'))
  this.registerForm.controls['Etat_client'].setValue(localStorage.getItem('Etat_client'))


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

    this.client.Num_serie_ONT = this.registerForm.controls["Num_serie_ONT"].value;
    this.client.MSISDN = this.registerForm.controls["MSISDN"].value;
    this.client.Code_site = this.registerForm.controls["Code_site"].value;
    this.client.Solution_raccordement = this.registerForm.controls["Solution_raccordement"].value;
    this.client.Budget_optique = this.registerForm.controls["Budget_optique"].value;
    this.client.Type_client = this.registerForm.controls["Type_client"].value;
    this.client.Num_telephone = this.registerForm.controls["Num_telephone"].value;
    this.client.ID_immeuble = Number(localStorage.getItem('ID_immeuble'))
    this.client.KCRM = this.registerForm.controls["KCRM"].value;
    this.client.Debit = this.registerForm.controls["Debit"].value;
    this.client.Nom_soustraitant = this.registerForm.controls["Nom_soustraitant"].value;
    this.client.Etat_client = this.registerForm.controls["Etat_client"].value;


    this.ftthservice.updateClient(localStorage.getItem('ID_client'),this.client).subscribe(
      (data)=>{
        this.status="warning"
        this.toastrService.show(``,`Client modifié!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
         this.loading = false;
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

  get etc() {
    return this.registerForm.get('Etat_client');
  }
  changeEtat_client(e) {
  this.etc.setValue(e.target.value, {onlySelf: true})

}





}
