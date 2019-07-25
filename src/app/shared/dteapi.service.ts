import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Colleges } from './Colleges';
import {Observable, Subscriber,Subject} from 'rxjs/Rx';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class DteApiService {
  private baseUrl = config.serverUrl;
  private APIbaseUrl = 'http://sppu.admissiondesk.org:3000'
  constructor(private httpClient : HttpClient,
    public authService : NbAuthService,
    public themeService : NbThemeService) { }

  getCoursedata(){
    try{
      return this.httpClient.get(`${this.baseUrl}/dte_api/getCourse`);
    }catch(error) {
        this.handleError("getCoursedata : "+JSON.stringify(error));
    }
  }

  async getCourseDetails(courseid,specialization){
    try{
      return await this.httpClient.get(`${this.baseUrl}/dte_api/getCourseDetails?courseid=`+courseid+`&specialization=`+specialization).toPromise();
    }catch(error) {
      this.handleError("getCourseDetails : "+error);
    }
  }

  checkTabs(degree,course_id){
    try{
        return this.httpClient.get(`${this.baseUrl}/dte_api/checkTabs?degree=`+degree+`&course_Id=`+course_id);
    }catch(error) {
        this.handleError("Checktabs : "+JSON.stringify(error));
    }
  }

  previewLetter(userId){
    try{
      return this.httpClient.post(`${this.baseUrl}/dte_api/Dte_preview`,{"id":userId});
      
    }catch(error) {
      this.handleError("previewLetter : "+error);
    }
    
  }

  getcheckTabs(){
    try{
      return  this.httpClient.get(`${this.baseUrl}/dte_api/checkTabs`);
    }catch(error) {
      this.handleError("getcheckTabs : "+JSON.stringify(error));
    }
  }


  getProfileValue(type){
    try{
      if(type == "Personal"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/profile?type=Personal`);
      }else if (type == "Guardian"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/profile?type=Guardian`);
      }else if (type == "Education_HSC"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/education?type=hsc`);
      }else if (type == "Education_SSC"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/education?type=ssc`);
      }else if (type == "Education_diploma"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/education?type=diploma`);
      }else if (type == "Education_degree"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/education?type=degree`);
      }else if (type == "All_Education_Details"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/profile?type=All_Education_Details`);
      }else if (type == "Employment"){
        return  this.httpClient.get(`${this.baseUrl}/dte_api/profile?type=Employment`);
      }
      
    }catch(error) {
      this.handleError("getProfileValue: "+JSON.stringify(error));
    }
  }

  setProfileValues(name,type){
    try{
      if(type == "Personal"){
          return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
            data : name,
            type:"Personal"
          });
      }else if(type == "Guardian"){
        return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
          data : name,
          type:"Guardian"
        });
      }else if(type == "Education_Degree"){
        return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
          data : name,
          type:"Education_Degree"
        });
      }
      else if(type == "Education_Diploma"){
        return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
          data : name,
          type:"Education_Diploma"
        });
      } else if(type == "Education_HSC"){
        return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
          data : name,
          type:"Education_HSC"
        });
      } else if(type == "Education_SSC"){
        return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
          data : name,
          type:"Education_CBSE"
        });
      }else if (type == "hobbies_sports"){
        return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
          data : name,
          type:"hobbies_sports"
        });
      }else if (type == "Employment"){
        return  this.httpClient.post(`${this.baseUrl}/dte_api/set_profile`,{
          data : name,
          type:"employment"
        });
      }  
    }catch(error){
        this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  addCart(courseid){
    try{
      return this.httpClient.post(`${this.baseUrl}/dte_api/addCart`,{"courseid" : courseid});
    }catch(error) {
      this.handleError("addCart : "+error);
    }
  }

  Cart(courseid){
    try{
      return this.httpClient.post(`${this.baseUrl}/dte_api/Cart`,{"courseid" : courseid});
    }catch(error) {
      this.handleError("Cart : "+error);
    }
  }

    
  delete_education(type){
    try{      
        return this.httpClient.delete(`${this.baseUrl}/dte_api/delete_education?type=`+type);
            
    }catch(error) {
      this.handleError("delete education: "+JSON.stringify(error));
    }
  }

  delete_employment(id){
    try{      
        return this.httpClient.delete(`${this.baseUrl}/dte_api/delete_employment?id=`+id);
            
    }catch(error) {
      this.handleError("delete employment: "+JSON.stringify(error));
    }
  }

  checkDteapplications(){
    try{
      return this.httpClient.get(`${this.baseUrl}/dte_api/checkapplications`);
    }catch(error) {
      this.handleError("checkDteapplications : "+error);
    }
  }

  getProfileImage(){
    try{
          return this.httpClient.get(`${this.baseUrl}/dte_api/transcriptData`);
    }catch(error) {
        this.handleError("getProfileImage : "+JSON.stringify(error));
    }
  }

  deleteTranscripts(name,userId,transcriptId){
    try{
      return this.httpClient.post(`${this.baseUrl}/dte_api/deleteTranscript`,{"name":name,"userId":userId,"transcriptId":transcriptId})
      .map(res => {
        return res;
      })
      
    }catch(error) {
      this.handleError("deleteTranscripts : "+error);
    }
    
  }

  private handleError(error){
    console.error(error);
  }

}
