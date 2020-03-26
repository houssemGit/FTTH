import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";

@Component({
  selector: "ngx-gerer-olt",
  templateUrl: "./gerer-olt.component.html",
  styleUrls: ["./gerer-olt.component.scss"]
})
export class GererOltComponent implements OnInit {
  constructor(private router: Router, private ftthService: FtthService) {}

  olts: Array<Olt>;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;
  ports: Array<Port>;

  editOlt(e) {
    localStorage.setItem("ID_olt", e.ID_olt.toString());
    localStorage.setItem("Localisation", e.Localisation.toString());
    localStorage.setItem("Nom_olt", e.Nom_olt.toString());
    this.router.navigateByUrl("pages/zones/modifier-olt");
  }
  deleteOlt(e) {
    console.log(e);
    this.ftthService.deleteOlt(e.ID_olt).subscribe(
      Response => {
          alert("olt supprime avec sucess!!");
          //this.toaster.success("Suppresion avec succés");
          this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur") //this.toaster.error("Erreur lors de la communication avec serveur")
    );
  }
  deleteC(e){
    this.ftthService.deleteCassette(e.ID_cassette).subscribe(
      Response => {
          alert("cassette supprime avec sucess!!");
          //this.toaster.success("Suppresion avec succés");
          this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur") //this.toaster.error("Erreur lors de la communication avec serveur")
    );

  }
  deleteS(e){
    this.ftthService.deleteSplitter(e.ID_splitter).subscribe(
      Response => {
          alert("splitter supprime avec sucess!!");
          //this.toaster.success("Suppresion avec succés");
          this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur") //this.toaster.error("Erreur lors de la communication avec serveur")
    );
  }
  AjoutC(e){
    localStorage.setItem("ID_olt", e.ID_olt.toString());
    this.router.navigateByUrl("pages/zones/ajout-cassette");
  }
  AjoutS(e){
    localStorage.setItem("ID_cassette", e.ID_cassette.toString());
    this.router.navigateByUrl("pages/zones/ajout-splitter");
  }


   @ViewChild('item',{static: false}) accordion;
   @ViewChild('item1',{static: false}) accordion1;
   @ViewChild('item2',{static: false}) accordion2;



  openC(e) {
    this.cassettes=[]
    if(this.accordion.collapsed==false){
    this.ftthService.getByOlt(e.ID_olt).subscribe(data => {this.cassettes = data;});
    }

  }
  openS(e) {
    this.splitters=[]
    if(this.accordion1.collapsed==false){
    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;});
    }
  }
  openP(e) {
    this.ports=[]
    if(this.accordion2.collapsed==false){
    this.ftthService.getBySplitter(e.ID_splitter).subscribe(data => {this.ports = data;});
    }
  }


  saveP(e){
    for(var i=0;i<this.ports.length;i++){
      this.ftthService.updatePort(e.ID_splitter, this.ports[i]).subscribe((data)=>{alert('ports '+i +' modifie avec sucess!!');},(error)=>{alert('error modification!!');})
    }
  }
  cheky(i){
    //this.ports[i].Etat=!this.ports[i].Etat
  }

  ngOnInit() {
    this.olts=null
    this.ftthService.AllOlt().subscribe(data => {this.olts = data;});

  }
}
