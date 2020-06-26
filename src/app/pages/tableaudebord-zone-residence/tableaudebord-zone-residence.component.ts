import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService, NbThemeService, NbComponentStatus } from '@nebular/theme';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Sro } from '../../_models/sro';
import { Pri } from '../../_models/pri';
import { Monosite } from '../../_models/monosite';
import { Immeuble } from '../../_models/immeuble';
import { Router } from '@angular/router';
import { FtthService } from '../../_service/ftth.service';

@Component({
  selector: 'ngx-tableaudebord-zone-residence',
  templateUrl: './tableaudebord-zone-residence.component.html',
  styleUrls: ['./tableaudebord-zone-residence.component.scss']
})
export class TableaudebordZoneResidenceComponent implements OnInit {

  colorScheme: any;
  themeSubscription: any;
  options: any = {};
  Fvalue: string
  zone: string
  nbclient:number ;b2b: number ;b2c: number ;p2p: number ; pro: number ; oiab: number

  status: NbComponentStatus ;



  results = [
    { name: 'Total prises', value: 8000   },
    { name: 'Raccordable', value: 5000  },
    { name: 'Raccordé', value: 1000  },
  ];
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Prises';

  constructor(    private ftthservice: FtthService,private router: Router,
    private toastrService: NbToastrService,private theme: NbThemeService) {

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        this.colorScheme = {
          domain: [colors.primary, colors.warning , colors.success, colors.info , colors.danger, ],
        };
      });

  //          this.ftthservice.AllSro().subscribe(data => {
  //       this.sros=data
  //       for (let i = 0; i < this.sros.length; i++) {
  //         this.ftthservice.prisezone(this.sros[i].Nom_zone).subscribe(data=>{
  //           this.resulto.push({name:this.sros[i].Nom_zone,value:Number(data)})

  //         })
  //       }
  //       console.log(this.resulto);


  //  })

    }
    sros : Array<Sro> = new Array
    pris : Array<Pri> = new Array
    imms : Array<Monosite> = new Array
    ch: Array<String> = new Array
    sro:Sro
    pri: Pri
    Imm : Immeuble
  ngOnInit() {

    this.erreur= localStorage.getItem('zone-res') + " éligible"
      this.zone= localStorage.getItem('zone-res')
      this.results[0].value=Number(localStorage.getItem('totprise'))
      this.results[1].value=Number(localStorage.getItem('raccordable'))
      this.results[2].value=Number(localStorage.getItem('raccorde'))
      this.b2b=Number(localStorage.getItem('b2b'))
      this.b2c=Number(localStorage.getItem('b2c'))
      this.p2p=Number(localStorage.getItem('p2p'))
      this.pro=Number(localStorage.getItem('pro'))
      this.oiab=Number(localStorage.getItem('oiab'))
      this.nbclient=Number(localStorage.getItem('totclient'))

      this.ftthservice.AllSro().subscribe(data => {
        this.sros=data
        for (let i = 0; i < this.sros.length; i++) {

          this.ch.push(this.sros[i].Nom_zone)
        }
   })
      this.ftthservice.AllPri().subscribe(data => {
        this.pris=data
        for (let i = 0; i < this.pris.length; i++) {
          this.ch.push(this.pris[i].Nom_residence)
        }
   })
      this.ftthservice.AllMonosite().subscribe(data => {
        this.imms=data
        for (let i = 0; i < this.imms.length; i++) {
          this.ch.push(this.imms[i].Adresse)
        }
   })


  }


  public model: any;
  erreur: string
  sum : number

  formatter = (result: string) => result.toUpperCase();


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.ch.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    verif(){
      this.erreur=""
      if(this.Fvalue){
          if(this.model==null){this.erreur=" Merci de saisir un mot de recherche."}
          else if (this.ch.indexOf(this.model)==-1) {this.erreur="'"+ this.model+"' n'existe pas!! merci de vérifier si la localité fournie est ajoutée."}
          else {
            switch (this.Fvalue) {
              case '1':
                this.zone = this.model
                this.erreur=this.model+" éligible!";
                this.ftthservice.zoneracstat(this.model).subscribe(data => {
                  this.results[0].value=Number(data[1])+Number(data[0])
                  this.results[1].value=Number(data[1])
                  this.results[2].value=Number(data[0])
                  this.sum=Number(data[1])+Number(data[0])
                  localStorage.setItem('zone-res',this.model)
                  localStorage.setItem('totprise',this.sum.toString())
                  localStorage.setItem('raccordable',Number(data[1]).toString())
                  localStorage.setItem('raccorde',Number(data[0]).toString())

                  this.ftthservice.zoneclientstat(this.model).subscribe(data => {
                    this.b2b=Number(data[0])
                    this.b2c=Number(data[1])
                    this.p2p=Number(data[2])
                    this.pro=Number(data[3])
                    this.oiab=Number(data[4])
                    this.nbclient=this.b2b+this.b2c+this.p2p+this.pro+this.oiab

                    localStorage.setItem('b2b',this.b2b.toString())
                    localStorage.setItem('b2c',this.b2c.toString())
                    localStorage.setItem('p2p',this.p2p.toString())
                    localStorage.setItem('pro',this.pro.toString())
                    localStorage.setItem('oiab',this.oiab.toString())
                    localStorage.setItem('totclient',this.nbclient.toString())
                    //this.router.navigateByUrl('pages/dashboard-zone-residence')
                    //this.ngOnInit()
                    location.reload();


                  }, error => {alert("error serveur affichage stat");
                  })
                }, error => {alert("error serveur affichage stat");
                })
                break;

              case '2':
                this.ftthservice.statByAdresse(this.model).subscribe(data => {

                  if(data==true) {this.erreur=this.model+" éligible!"
                  this.showstatresidence()
                  }
                  else if(data==false) this.erreur=this.model+" non raccordé!"
                  else {if(data[0].IsRaccorde==1) this.erreur=this.model+" éligble!"
                        else this.erreur=this.model+" non raccordé!"}
                }, error =>{})
                break;

              case '3':
                console.log("residence");
                this.erreur=this.model+" éligible!"
                this.showstatresidence()
                break;

              default:
                break;
            }
          }
          }
      else{this.erreur="Merci de saisir un filtre de recherche."}
    }

    ngOnDestroy(): void {
      this.themeSubscription.unsubscribe();
    }
    showstatresidence(){
      this.ftthservice.resracstat(this.model).subscribe(data => {
        this.results[0].value=Number(data[1])+Number(data[0])
        this.results[1].value=Number(data[1])
        this.results[2].value=Number(data[0])
        this.sum=Number(data[1])+Number(data[0])
        localStorage.setItem('zone-res',this.model)
        localStorage.setItem('totprise',this.sum.toString())
        localStorage.setItem('raccordable',Number(data[1]).toString())
        localStorage.setItem('raccorde',Number(data[0]).toString())

        //clients
        this.ftthservice.resclientstat(this.model).subscribe(data => {
          this.b2b=Number(data[0])
          this.b2c=Number(data[1])
          this.p2p=Number(data[2])
          this.pro=Number(data[3])
          this.oiab=Number(data[4])
          this.nbclient=this.b2b+this.b2c+this.p2p+this.pro+this.oiab

          localStorage.setItem('b2b',this.b2b.toString())
          localStorage.setItem('b2c',this.b2c.toString())
          localStorage.setItem('p2p',this.p2p.toString())
          localStorage.setItem('pro',this.pro.toString())
          localStorage.setItem('oiab',this.oiab.toString())
          localStorage.setItem('totclient',this.nbclient.toString())
          //this.router.navigateByUrl('pages/dashboard-zone-residence')
          //this.ngOnInit()
          location.reload();

        }, error => {this.status="danger"
        this.toastrService.show(``,`Erreur serveur affichage statistique`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT})})

      }, error => {this.status="danger"
      this.toastrService.show(``,`Erreur serveur affichage statistique`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT})})
    }
}
