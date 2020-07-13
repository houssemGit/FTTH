import { Immeuble } from './immeuble';

export class Appartement extends Immeuble {
  Num_appartement: string
  Num_etage: string;
  Num_BE: number;
  Nom_bloc: number;
  Pos_tiroir_col_montante: string;
  ID_pri: number;
  IsRaccorde : boolean
  Nom_Capacite_Cable_Colonne_Montante : string
  Couleur_tube : string
  Couleur_fibre : string

  constructor(){
      super()
  }

}
