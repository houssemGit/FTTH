import { Immeuble } from './immeuble';

export class Monosite extends Immeuble  {
  ID_monosite: number;
  Nom_monosite: string;
  Pos_tiroir_distribution: string
  Num_plan: number
  ID_sro: number
  Adresse: string
  IsRaccorde: boolean
  Etat_raccordement:string
  Etat_convention: string
  Longitude: string
  Latitude : string

  constructor(){
    super()
  }

}
