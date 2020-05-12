import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FtthService } from '../../_service/ftth.service';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { Sro } from '../../_models/sro';
import { Pri } from '../../_models/pri';
import { Immeuble } from '../../_models/immeuble';

@Component({
  selector: 'ngx-tableaudebord',
  templateUrl: './tableaudebord.component.html',
  styleUrls: ['./tableaudebord.component.scss']
})
export class TableaudebordComponent implements OnInit {

  colorScheme: any;
  themeSubscription: any;
  options: any = {};

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
    imms : Array<Immeuble> = new Array
    ch: Array<String> = new Array
    sro:Sro
    pri: Pri
    Imm : Immeuble
  ngOnInit() {
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
      this.ftthservice.AllImmeuble().subscribe(data => {
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
      if (this.ch.indexOf(this.model)==-1) {this.erreur="'"+ this.model+"' n'existe pas!! merci de vérifier si la localité fournie est ajoutée."}
      else {
        this.ftthservice.getSroByZone(this.model).subscribe(data => {this.sro=data
        },error => {
          this.ftthservice.getResidenceByNom(this.model).subscribe(data => {this.pri=data
          },error => {
            this.ftthservice.getImmeubleByNom(this.model).subscribe(data => {this.Imm=data
             },error => {
             })
          })
        })
      }

    }







    ngOnDestroy(): void {
      this.themeSubscription.unsubscribe();
    }

}
