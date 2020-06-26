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



  //get ALL
  AllOlt(){
    return this.http.get<Array<Olt>>("http://localhost:8000/api/olts");
  }
  AllSro(){
    return this.http.get<Array<Sro>>("http://localhost:8000/api/sros");
  }
  AllPri(){
    return this.http.get<Array<Pri>>("http://localhost:8000/api/pris");
  }

  AllMonosite(){
    return this.http.get<Array<Monosite>>("http://localhost:8000/api/monosites");
  }

  //search
  SearchZone(ch:string){
    return this.http.get<Sro>("http://localhost:8000/api/sros/zone/"+ch);
  }
  getMonoByAdresse(ch:string){
    return this.http.get<Monosite>("http://localhost:8000/api/monosites/"+ch);
  }
  eligibresidence(ch:string){
    return this.http.get<Pri>("http://localhost:8000/api/pris/"+ch);
  }

  //stat
  zoneracstat(ch:string){
    return this.http.get("http://localhost:8000/api/zone/raccordement/"+ch);
  }
  resracstat(ch:string){
    return this.http.get("http://localhost:8000/api/residence/raccordement/"+ch);
  }
  zoneclientstat(ch:string){
    return this.http.get("http://localhost:8000/api/zone/client/"+ch);
  }
  resclientstat(ch:string){
    return this.http.get("http://localhost:8000/api/residence/client/"+ch);
  }
  prisezone(ch:string){
    return this.http.get("http://localhost:8000/api/zone/prise/"+ch);
  }
  priseresidence(ch:string){
    return this.http.get("http://localhost:8000/api/residence/prise/"+ch);
  }
  statByAdresse(ch:string){
    return this.http.get("http://localhost:8000/api/adresse/"+ch);
  }
  total_client(){
    return this.http.get("http://localhost:8000/api/total/client");
  }
  total_prise(){
    return this.http.get("http://localhost:8000/api/total/prise");
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

  //check
  UniquePosOlt(id: string , pos : string){
    return this.http.get("http://localhost:8000/api/ports/check/olt/"+id+"/"+pos)
  }
  UniquePosSro(id: string , pos : string){
    return this.http.get("http://localhost:8000/api/ports/check/sro/"+id+"/"+pos)
  }
  UniquePosPri(id: string , pos : string){
    return this.http.get("http://localhost:8000/api/ports/check/pri/"+id+"/"+pos)
  }
  UniquePosSroOut(id: string , pos : string){
    return this.http.get("http://localhost:8000/api/ports/checkout/sro/"+id+"/"+pos)
  }
  UniquePosPriOut(id: string , pos : string){
    return this.http.get("http://localhost:8000/api/ports/checkout/pri/"+id+"/"+pos)
  }
  UniquePosMonosite(id: string , pos : string){
    return this.http.get("http://localhost:8000/api/monosites/check/"+id+"/"+pos)
  }
  UniquePosAppart(id: string , pos : string){
    return this.http.get("http://localhost:8000/api/appartements/check/"+id+"/"+pos)
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
  // import excel
  ImportExcel(formdata){
    return this.http.post<any>("http://localhost:8000/api/",formdata)
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
  voirCorrespondance(e: any){
    return this.http.get("http://localhost:8000/api/correspondance");

  }

}
