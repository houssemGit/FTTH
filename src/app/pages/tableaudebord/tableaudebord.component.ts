import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FtthService } from '../../_service/ftth.service';
import { NbToastrService, NbThemeService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { Sro } from '../../_models/sro';
import { Pri } from '../../_models/pri';
import { Immeuble } from '../../_models/immeuble';
import { Monosite } from '../../_models/monosite';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-tableaudebord',
  templateUrl: './tableaudebord.component.html',
  styleUrls: ['./tableaudebord.component.scss']
})
export class TableaudebordComponent implements OnInit {

  colorScheme: any;
  themeSubscription: any;
  options: any = {};
  Fvalue: string
  zone="Générales"
  nbclient:number ;b2b: number ;b2c: number ;p2p: number ; pro: number ; oiab: number
  status: NbComponentStatus ;

  dynam : Array<any>=new Array


  results = [
    { name: 'Total prises', value: 8940   },
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

  //     this.ftthservice.AllSro().subscribe(data => {
  //       this.sros=data
  //       for (let i = 0; i < this.sros.length; i++) {
  //         this.ftthservice.prisezone(this.sros[i].Nom_zone).subscribe(data=>{
  //           localStorage.setItem("aa",data.toString())
  //           localStorage.setItem("bb",this.sros[i].Nom_zone)
  //           this.dynam.push({value: Number(localStorage.getItem("aa")),name:localStorage.getItem("bb")})

  //         })
  //       }


  //  })
  //  localStorage.removeItem("aa")
  //   localStorage.removeItem("bb")



this.dynam.push({ value: 8940, name: "CUN"  },{ value: 5000, name: "CHARGUIA" })
console.log(this.dynam);

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primary,colors.warning, colors.info, colors.danger, colors.success ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          //data: this.dynamss,
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Prises',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            //** dunamic
            data: this.dynam,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });

    }
    sros : Array<Sro> = new Array
    pris : Array<Pri> = new Array
    imms : Array<Monosite> = new Array
    ch: Array<String> = new Array
    sro:Sro
    pri: Pri
    Imm : Immeuble
  ngOnInit() {

    //localStorage.clear()
    // total client général
    this.ftthservice.total_client().subscribe(data=>{
      this.b2b=data[0];this.b2c=data[1];this.p2p=data[2];this.pro=data[3];this.oiab=data[4];this.nbclient=data[0]+data[1]+data[2]+data[3]+data[4]
    })
    // total prise général
    this.ftthservice.total_prise().subscribe(data=>{
      localStorage.setItem("aa",data[0]);localStorage.setItem("bb",data[4]);localStorage.setItem("cc",data[3])
    })
    this.results[0].value=Number(localStorage.getItem("aa"))
    this.results[1].value=Number(localStorage.getItem("bb"))
    this.results[2].value=Number(localStorage.getItem("cc"))
    localStorage.removeItem("aa");localStorage.removeItem("bb");localStorage.removeItem("cc");


    // liste ch de recherche
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
                    this.router.navigateByUrl('pages/dashboard-zone-residence')

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
          this.router.navigateByUrl('pages/dashboard-zone-residence')

        }, error => {this.status="danger"
        this.toastrService.show(``,`Erreur serveur affichage statistique`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT})})

      }, error => {this.status="danger"
      this.toastrService.show(``,`Erreur serveur affichage statistique`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT})})
    }
}
