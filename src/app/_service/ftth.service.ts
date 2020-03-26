import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cassette  } from "../_models/cassette";
import { Olt  } from "../_models/olt";
import { Splitter  } from "../_models/splitter";
import { Port  } from "../_models/port";
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map'
import { Sro } from '../_models/sro';




@Injectable({
  providedIn: 'root'
})
export class FtthService {


  constructor(private http: HttpClient) { }
  //delete
  deleteOlt(id: number){
    return this.http.delete("http://localhost:8000/api/olts/"+id.toString())
  }
  deleteCassette(id: Cassette){
    return this.http.delete("http://localhost:8000/api/cassettes/"+id.toString())
  }
  deleteSplitter(id: Splitter){
    return this.http.delete("http://localhost:8000/api/splitters/"+id.toString())
  }
  deleteSro(id: Sro){
    return this.http.delete("http://localhost:8000/api/sros/"+id.toString())
  }

  //update
  updatePort(id: string , port : Port){
    return this.http.put("http://localhost:8000/api/ports/"+id,port)
  }
  updateOlt(id: string , olt : Olt){
    return this.http.put("http://localhost:8000/api/olts/"+id,olt)
  }
  updateSro(id: string , sro : Sro){
    return this.http.put("http://localhost:8000/api/sros/"+id,sro)
  }



  //get
  AllOlt(){
    return this.http.get<Array<Olt>>("http://localhost:8000/api/olts");
  }
  AllSro(){
    return this.http.get<Array<Sro>>("http://localhost:8000/api/sros");
  }

  getByOlt(id: number){
    return this.http.get<Array<Cassette>>("http://localhost:8000/api/cassettes/olt/"+id.toString());
  }
  getBySro(id: number){
    return this.http.get<Array<Cassette>>("http://localhost:8000/api/cassettes/sro/"+id.toString());
  }
  getByCassette(id: number){
    return this.http.get<Array<Splitter>>("http://localhost:8000/api/splitters/cassette/"+id.toString());
  }
  getBySplitter(id: number){
    return this.http.get<Array<Port>>("http://localhost:8000/api/ports/splitter/"+id.toString());
  }
  getOltById(id: number){
    return this.http.get<Olt>("http://localhost:8000/api/olts/"+id.toString())
  }

  getOltByZone(id:string){
    return this.http.get<Olt>("http://localhost:8000/api/olt/zone/"+id.toString())
  }
  getSroByZone(id:string){
    return this.http.get<Sro>("http://localhost:8000/api/sros/zone/"+id.toString())

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

}
