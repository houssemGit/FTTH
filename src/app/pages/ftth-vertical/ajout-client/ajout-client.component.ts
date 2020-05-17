import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Client } from '../../../_models/client';
import { Immeuble } from '../../../_models/immeuble';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Monosite } from '../../../_models/monosite';
import { Appartement } from '../../../_models/appartement';

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

    clients: Array<Client>;
    Num_stegs : Array<String>=new Array
    ID_imm : Array<number>=new Array
    monos : Array<Monosite>=new Array
    apparts : Array<Appartement>
    monoc : Monosite
    appart : Appartement
    concat: Array<any>=new Array
    asb : string

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      Num_serie_ONT: ['', Validators.required],
      Solution_raccordement: [''],
      Budget_optique: [''],
      Type_client: ['', Validators.required],
      Num_telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      Num_steg: ['', Validators.required],
      Code_site: ['', Validators.required],
      MSISDN: ['', Validators.required],

  });

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

      this.ftthservice.getClientsResidencetest(localStorage.getItem('ID_pri')).subscribe(data =>{
        this.clients=data
      for (let i = 0; i < this.clients.length; i++) {
        let j=0 ; let stop=true
        while(j<this.concat.length&&stop){
          if(this.clients[i][0].ID_immeuble==this.concat[j].ID_immeuble){
           this.Num_stegs.splice(this.Num_stegs.indexOf(this.concat[j].Num_steg),1)
           this.ID_imm.splice(this.ID_imm.indexOf(this.concat[j].ID_immeuble),1)
            stop= false
          }else j++
        }
      }

      });

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

          this.ftthservice.getClientsMonotest(localStorage.getItem('choixzone')).subscribe(data =>{
            this.clients=data
          for (let i = 0; i < this.clients.length; i++) {
            let j=0 ; let stop=true
            while(j<this.concat.length&&stop){
              if(this.clients[i][0].ID_immeuble==this.concat[j].ID_immeuble){
               this.Num_stegs.splice(this.Num_stegs.indexOf(this.concat[j].Num_steg),1)
               this.ID_imm.splice(this.ID_imm.indexOf(this.concat[j].ID_immeuble),1)
                stop= false
              }else j++
            }
          }

          });


    })

  }
  }

  client=new Client
  get fval() { return this.registerForm.controls; }
  existe =false

  onFormSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }

    var i=0 ; var stop=true;
    while( i < this.Num_stegs.length && stop){
      if (this.Num_stegs[i]==this.registerForm.controls["Num_steg"].value)
      {this.client.ID_immeuble=this.ID_imm[i];
        console.log(this.ID_imm[i]);
        console.log(this.Num_stegs[i]);

      stop=false}
      else i++
    }
    if (i == this.Num_stegs.length) {
    this.status="danger"
    this.toastrService.show(``,`Numero steg introuvable!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
    return console.log(" invalid");}

    this.loading = true;



    this.client.Num_serie_ONT = this.registerForm.controls["Num_serie_ONT"].value;
    this.client.MSISDN = this.registerForm.controls["MSISDN"].value;
    this.client.Code_site = this.registerForm.controls["Code_site"].value;
    this.client.Solution_raccordement = this.registerForm.controls["Solution_raccordement"].value;
    this.client.Budget_optique = this.registerForm.controls["Budget_optique"].value;
    this.client.Type_client = this.registerForm.controls["Type_client"].value;
    this.client.Num_telephone = this.registerForm.controls["Num_telephone"].value;

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

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.Num_stegs.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )



}
