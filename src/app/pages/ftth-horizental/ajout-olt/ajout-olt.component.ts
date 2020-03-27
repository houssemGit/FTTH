import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "ngx-ajout-olt",
  templateUrl: "./ajout-olt.component.html",
  styleUrls: ["./ajout-olt.component.scss"]
})
export class AjoutOltComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      Nom: ["", Validators.required],
      Localisation: ["", Validators.required],
    });
  }

  get fval() {
    return this.registerForm.controls;
  }

  olt: Olt = new Olt()

  onFormSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.olt.Nom_olt = this.registerForm.controls["Nom"].value;
    this.olt.Localisation = this.registerForm.controls["Localisation"].value;
    this.ftthService.AjoutOlt(this.olt).subscribe(data => {
      alert("olt ajoute"); this.router.navigate(['pages/zones/gerer-olt']);

  },error => alert("error olt ajout"));

  }


}
