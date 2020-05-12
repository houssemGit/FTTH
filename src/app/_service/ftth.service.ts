import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cassette  } from "../_models/cassette";
import { Olt  } from "../_models/olt";
import { Splitter  } from "../_models/splitter";
import { Port  } from "../_models/port";
import 'rxjs/add/operator/map'
import { Sro } from '../_models/sro';
import { Client } from '../_models/client';
import { Monosite } from '../_models/monosite';
import { Appartement } from '../_models/appartement';
import { Immeuble } from '../_models/immeuble';
import { Pri } from '../_models/pri';




@Injectable({
  providedIn: 'root'
})
export class FtthService {


  constructor(private http: HttpClient) { }
  //delete
  deleteOlt(id: number){
    return this.http.delete("http://localhost:8000/api/olts/"+id.toString())
  }
  deleteCassette(id: number){
    return this.http.delete("http://localhost:8000/api/cassettes/"+id.toString())
  }
  deleteSplitter(id: number){
    return this.http.delete("http://localhost:8000/api/splitters/"+id.toString())
  }
  deleteSro(id: number){
    return this.http.delete("http://localhost:8000/api/sros/"+id.toString())
  }
  deleteClient(id: number){
    return this.http.delete("http://localhost:8000/api/clients/"+id.toString())
  }
  deletePri(id: number){
    return this.http.delete("http://localhost:8000/api/pris/"+id.toString())
  }
  deleteAppart(id: string){
    return this.http.delete("http://localhost:8000/api/appartements/"+id)
  }
  deleteMono(id: string){
    return this.http.delete("http://localhost:8000/api/monosites/"+id)
  }



  //update
  updatePort(id: string , port : Port){
    return this.http.put<Port>("http://localhost:8000/api/ports/"+id,port)
  }
  raccorder(id: string , port:Port){
    return this.http.put<Port>("http://localhost:8000/api/ports/raccorder/"+id,port)
  }
  //hantess
  raccorderPtoM(id: string , mono:Monosite){
    return this.http.put<Monosite>("http://localhost:8000/api/monosites/raccorder/"+id,mono)
  }
  raccorderPtoA(id: string , app:Appartement){
    return this.http.put<Appartement>("http://localhost:8000/api/appartements/raccorder/"+id,app)
  }
  updateOlt(id: string , olt : Olt){
    return this.http.put("http://localhost:8000/api/olts/"+id,olt)
  }
  updateSro(id: string , sro : Sro){
    return this.http.put("http://localhost:8000/api/sros/"+id,sro)
  }
  updateClient(id: string , client : Client){
    return this.http.put("http://localhost:8000/api/clients/"+id,client)
  }
  updateImmeuble(id: string , immeuble : Immeuble){
    return this.http.put("http://localhost:8000/api/immeubles/"+id,immeuble)
  }
  updatePri(id: string , pri : Pri){
    return this.http.put("http://localhost:8000/api/pris/"+id,pri)
  }
  updateAppart(id: string , appart : Appartement){
    return this.http.put<Appartement>("http://localhost:8000/api/appartements/"+id,appart)
  }
  updateMono(id: string , mono : Monosite){
    return this.http.put<Monosite>("http://localhost:8000/api/monosites/"+id,mono)
  }



  //get
  AllOlt(){
    return this.http.get<Array<Olt>>("http://localhost:8000/api/olts");
  }
  AllSro(){
    return this.http.get<Array<Sro>>("http://localhost:8000/api/sros");
  }
  AllPri(){
    return this.http.get<Array<Pri>>("http://localhost:8000/api/pris");
  }
  AllImmeuble(){
    return this.http.get<Array<Immeuble>>("http://localhost:8000/api/immeubles");
  }



  getByOlt(id: number){
    return this.http.get<Array<Cassette>>("http://localhost:8000/api/cassettes/olt/"+id.toString());
  }
  getBySro(id: number){
    return this.http.get<Array<Cassette>>("http://localhost:8000/api/cassettes/sro/"+id.toString());
  }
  getByPri(id: number){
    return this.http.get<Array<Cassette>>("http://localhost:8000/api/cassettes/residence/"+id.toString());
  }

  getByCassette(id: number){
    return this.http.get<Array<Splitter>>("http://localhost:8000/api/splitters/cassette/"+id.toString());
  }

  //-----
  getBySplitterIn(id: number){
    return this.http.get<Array<Port>>("http://localhost:8000/api/ports/splitter/In/"+id.toString());
  }
  getBySplitterOut(id: number){
    return this.http.get<Array<Port>>("http://localhost:8000/api/ports/splitter/Out/"+id.toString());
  }
  //-----


  getOltById(id: number){
    return this.http.get<Olt>("http://localhost:8000/api/olts/"+id.toString())
    //----------
  }
  getSroById(id: string){
    return this.http.get<Sro>("http://localhost:8000/api/sros/"+id)
  }
  getPriById(id: string){
    return this.http.get<Pri>("http://localhost:8000/api/pris/"+id)
  }

  getAppartByResidence(id: string){
    return this.http.get<Array<Appartement>>("http://localhost:8000/api/appartements/pri/"+id)
  }
  getAppartByID(id: number){
    return this.http.get<Appartement>("http://localhost:8000/api/appartements/"+id.toString())
  }

  getPriByResidence(id: string){
    return this.http.get<Pri>("http://localhost:8000/api/pri/residence"+id)
  }

  getMonositeByZone(id: string){
    return this.http.get<Array<Monosite>>("http://localhost:8000/api/monosites/sro/"+id)
  }
  getMonoByID(id:number){
    return this.http.get<Monosite>("http://localhost:8000/api/monosites/"+id.toString())
  }

  getResidenceByNom(id: string){
    return this.http.get<Pri>("http://localhost:8000/api/pri/nom"+id)
  }
  getImmeubleByNom(id: string){
    return this.http.get<Immeuble>("http://localhost:8000/api/immeuble/nom"+id)
  }

  // getImmeubleById(id: string){
  //   return this.http.get<Immeuble>("http://localhost:8000/api/immeubles/"+id)
  // }

  getCassetteById(id: number){
    return this.http.get<Cassette>("http://localhost:8000/api/cassette/"+id.toString())
  }
  getSplitterById(id: number){
    return this.http.get<Splitter>("http://localhost:8000/api/splitter/"+id.toString())
  }
  getPortById(id: number){
    return this.http.get<Port>("http://localhost:8000/api/port/"+id.toString())
  }

  getPortCorrespondantOut(ch: string){
    return this.http.get<Port>("http://localhost:8000/api/ports/CorOut/"+ch.toString())

  }
  getPortCorrespondantIn(ch: string){
    return this.http.get<Port>("http://localhost:8000/api/ports/CorIn/"+ch.toString())

  }
  //--------------

  getOltByZone(id:string){
    return this.http.get<Olt>("http://localhost:8000/api/olt/zone/"+id.toString())
  }
  getSroByZone(id:string){
    return this.http.get<Sro>("http://localhost:8000/api/sros/zone/"+id.toString())

  }
  getClientsMono(id:string){
    return this.http.get<Client>("http://localhost:8000/api/monosites/client/"+id.toString())

  }
  getClientsMonotest(id:string){
    return this.http.get<Array<Client>>("http://localhost:8000/api/monosites/client/"+id.toString())

  }
  getClientsResidencetest(id:string){
    return this.http.get<Array<Client>>("http://localhost:8000/api/appartements/client/"+id.toString())

  }

  getClientsByRes(id:string){
    return this.http.get<Client>("http://localhost:8000/api/appartements/client/"+id.toString())

  }


  getClientsByZone(id:string){
    return this.http.get<Array<Client>>("http://localhost:8000/api/clients/zone/"+id.toString())

  }
  //gerer client mono
  getClientImmeuble(id:number){
    return this.http.get<Client>("http://localhost:8000/api/immeubles/client/"+id.toString())

  }
  //gerer client apartement
  getClientsResByID(id:string){
    return this.http.get<Array<Client>>("http://localhost:8000/api/clients/residence/"+id.toString())

  }
  getClientsByImmeuble(id:string){
    return this.http.get<Client>("http://localhost:8000/api/immeubles/client/"+id.toString())

  }
  getImmeublesByZone(id:string){
    return this.http.get<Array<Immeuble>>("http://localhost:8000/api/immebles/zone/"+id.toString())

  }
  getPriByZone(id:string){
    return this.http.get<Array<Pri>>("http://localhost:8000/api/pris/sro/"+id.toString())

  }


  getSroByPri(id:string){
    //return this.http.get<Array<Pri>>("http://localhost:8000/api/pris/zone/"+id.toString())

  }

  //add
  AjoutOlt(olt: any){
    return this.http.post<Olt>("http://localhost:8000/api/olts", olt);
  }
  AjoutSro(sro: any){
    return this.http.post<Sro>("http://localhost:8000/api/sros", sro);
  }
  AjoutCassette(cassette: any){
    return this.http.post<Cassette>("http://localhost:8000/api/cassettes", cassette);
  }
  AjoutSplitter(splitter: any){
    return this.http.post<Splitter>("http://localhost:8000/api/splitters", splitter);
  }
  AjoutPort(port: any){
    return this.http.post<Port>("http://localhost:8000/api/ports", port);
  }
  AjoutClient(client: any){
    return this.http.post<Client>("http://localhost:8000/api/clients", client);
  }
  AjoutPri(pri: any){
    return this.http.post<Pri>("http://localhost:8000/api/pris", pri);
  }
  AjoutAppart(appart: any){
    return this.http.post<Appartement>("http://localhost:8000/api/appartements", appart);
  }
  AjoutMono(appart: any){
    return this.http.post<Monosite>("http://localhost:8000/api/monosites", appart);
  }

}
