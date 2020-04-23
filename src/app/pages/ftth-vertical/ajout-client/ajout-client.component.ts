import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Client } from '../../../_models/client';
import { Immeuble } from '../../../_models/immeuble';

@Component({
  selector: 'ngx-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.scss']
})
export class AjoutClientComponent implements OnInit {


 Type_clients = ['B2B', 'B2C']
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthservice: FtthService,
    private toastrService: NbToastrService) { }

  status: NbComponentStatus ;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

    Num_stegs : Array<Number>
    immeubles : Array<Immeuble>

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Num_serie_ont: ['', Validators.required],
      Solution_raccordement: [''],
      Budget_optique: [''],
      Type_client: ['', Validators.required],
      Num_telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      Num_steg: ['', Validators.required],

  });
   // affichage de tt les num steg des immeuble dans select box
  this.ftthservice.getImmeublesByZone(localStorage.getItem('choixzone')).subscribe(data => {
    this.immeubles=data
    for (let i = 0; i < this.immeubles.length; i++) {
      this.Num_stegs[i]=this.immeubles[i].Num_steg
    }
  })

  }

  client: Client;
  get fval() { return this.registerForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.client.Num_serie_ont = this.registerForm.controls["Num_serie_ont"].value;
    this.client.Solution_raccordement = this.registerForm.controls["Solution_raccordement"].value;
    this.client.Budget_optique = this.registerForm.controls["Budget_optique"].value;
    this.client.Type_client = this.registerForm.controls["Type_client"].value;
    this.client.Num_telephone = this.registerForm.controls["Num_telephone"].value;
    //this.registerForm.controls["Num_steg"].value;

    this.ftthservice.AjoutClient(this.client).subscribe(
      (data)=>{
        this.client=<Client>data;

        this.status="success"
        this.toastrService.show(``,`Client ajouté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.router.navigate(['pages/immeubles/gerer-client']);
     },
      (error)=>{
        this.status="danger"
        this.toastrService.show(``,`'Erreur Ajout!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.loading = false;
      }
    )

  }
    get type_c() {
      return this.registerForm.get('Type_client');
    }
   changeType_client(e) {
    this.type_c.setValue(e.target.value, {onlySelf: true})
  }

    get num_s() {
      return this.registerForm.get('Num_steg');
    }
   changeNum_steg(e) {
    this.num_s.setValue(e.target.value, {onlySelf: true})

  }



}
