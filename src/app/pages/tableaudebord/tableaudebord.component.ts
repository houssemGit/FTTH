import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FtthService } from '../../_service/ftth.service';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { Sro } from '../../_models/sro';
import { Pri } from '../../_models/pri';
import { Immeuble } from '../../_models/immeuble';
import { Monosite } from '../../_models/monosite';

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
  nbclient:number
  b2b:number
  b2c:number

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
  constructor(    private ftthservice: FtthService,
    private toastrService: NbToastrService,private theme: NbThemeService) {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        this.colorScheme = {
          domain: [colors.primary, colors.warning , colors.success, colors.info , colors.danger],
        };
      });


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
          data: ['Total prises', 'Raccordable'],
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
            data: [
              { value: 8940, name: 'Total '  },
              { value: 5000, name: 'Raccordable' },

            ],
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
    //stat géneral
    //this.ftthservice.AllSro().subscribe(data => {this.results[0].value=data. })
    //this.ftthservice.AllSro().subscribe(data => {this.results[1].value=value=data.})
    //this.ftthservice.AllSro().subscribe(data => {this.results[2].value=data.})
    //this.ftthservice.AllSro().subscribe(data => {this.nbclient==data.})
    //this.ftthservice.AllSro().subscribe(data => {this.b2b=data.})
    //this.ftthservice.AllSro().subscribe(data => {this.b2c==data.  })

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
                this.erreur=this.model+" éligible!";
                this.ftthservice.zoneracstat(this.model).subscribe(data => {
                  this.results[0].value=Number(data[1])+Number(data[0])
                  this.results[1].value=Number(data[1])
                  this.results[2].value=Number(data[0])
                }, error => {alert("error serveur affichage stat");
                })
                this.ftthservice.zoneclientstat(this.model).subscribe(data => {
                  this.results[0].value=Number(data[1])+Number(data[0])
                  this.results[1].value=Number(data[1])
                  this.results[2].value=Number(data[0])
                  this.nbclient=Number(data[1])+Number(data[0])
                  this.b2b=Number(data[0])
                  this.b2c=Number(data[1])
                }, error => {alert("error serveur affichage stat");
                })


                break;
              case '2':
                //éligible si port false raccordé si port true
                // get by adresse
                console.log("monosite");
                this.ftthservice.getMonoByAdresse(this.model).subscribe(data => {
                  if(data.IsRaccorde)
                  this.erreur=this.model+" raccordé!"
                  else this.erreur=this.model+" éligible!"
                }, error =>{})
                break;
              case '3':
                //console.log("residence");
                //this.ftthservice.eligibresidence(this.model).subscribe(data => {
                  //if (data)
                  this.erreur=this.model+" éligible!"

                //}, error =>{})

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

}
