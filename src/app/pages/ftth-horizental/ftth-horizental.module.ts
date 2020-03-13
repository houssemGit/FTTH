import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutOltComponent } from './ajout-olt/ajout-olt.component';
import { AjoutSroComponent } from './ajout-sro/ajout-sro.component';
import { ModifierSroComponent } from './modifier-sro/modifier-sro.component';
import { ModifierOltComponent } from './modifier-olt/modifier-olt.component';
import { GererOltComponent } from './gerer-olt/gerer-olt.component';
import { GererSroComponent } from './gerer-sro/gerer-sro.component';

@NgModule({
  declarations: [AjoutOltComponent, AjoutSroComponent, ModifierSroComponent, ModifierOltComponent, GererOltComponent, GererSroComponent],
  imports: [
    CommonModule
  ]
})
export class FtthHorizentalModule { }
