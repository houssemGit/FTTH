import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Port } from '../../../_models/port';
import { FtthService } from '../../../_service/ftth.service';
import { Splitter } from '../../../_models/splitter';

@Component({
  selector: 'ngx-ajout-splitter',
  templateUrl: './ajout-splitter.component.html',
  styleUrls: ['./ajout-splitter.component.scss']
})
export class AjoutSplitterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  Typespts: any = [2, 4, 8, 16, 32, 64];
  Positions: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20];

  nbp: number;
  splitter: Splitter = new Splitter()
  port: Port=new Port();

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Typespt: ["", Validators.required],
      Position: ["", Validators.required],

    });
  }

  get position() {
    return this.registerForm.get("Position");
  }
  Position(e) {
    this.position.setValue(e.target.value, { onlySelf: true });
  }

  get typespt() {
    return this.registerForm.get("Typespt");
  }
  ports : any;
  Typespt(e) {
    this.typespt.setValue(e.target.value, { onlySelf: true });
    this.nbp = Number(this.registerForm.controls["Typespt"].value);
    this.ports = Array(this.nbp);
  }

  get fval() {
    return this.registerForm.controls;
  }

  bool: Boolean
  accordion: Array<{  num_port: number, port: string }> = new Array()
  accordion1: Array<{  num_port: number, port: string }> = new Array()
 // fonction qui detecte le changement d'etat des ports
 cheky(y) {
/*
  for (var i = 0; i < this.nbp; i++){
    this.accordion.push({  num_port: i, port: 'false' }
  }*/

   this.bool=false
   for (var i = 0; i < this.accordion.length; i++) {
   if (this.accordion[i].num_port === y )
   {this.accordion.splice(i,1); this.bool=true}
   }
     if (this.bool===false) this.accordion.push({  num_port: y, port: 'true' });
 }

  onFormSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

       //stockage de l'etat final de l'olt dans accordion1
       this.accordion1 = []
       for (var i = 1; i <= this.nbp; i++) {
           var k = 0; var baal=false;
             while(k < this.accordion.length && baal==false){
                 if (this.accordion[k].num_port==i )
                 {this.accordion1.push({ num_port: i, port: 'true' }); baal=true}
                 else  {k++;}

             }
             if(baal== false) this.accordion1.push({  num_port: i, port: 'false' });
       }

       this.splitter.Type_splitter=this.registerForm.controls["Typespt"].value;
       this.splitter.Position=this.registerForm.controls["Position"].value;
       this.splitter.ID_cassette=Number(localStorage.getItem('ID_cassette'))
       localStorage.setItem('ID_cassette','')


        this.ftthService.AjoutSplitter(this.splitter).subscribe(data =>
         { this.port.ID_splitter=data.ID_splitter
          for(var m=0;m<this.accordion1.length ;m++ )
          {this.port.Etat = this.accordion1[m].port
          this.ftthService.AjoutPort(this.port).subscribe(data => alert("port ajoute"),error => {alert("error port ajout");});
          }
          alert("splitter ajoute")},error => {alert("error splitter ajout");});

        }


}
