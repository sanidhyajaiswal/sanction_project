import { Project } from "./profile.model";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { response } from "express";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: "root"})
export class ProjectService {
    private projects: Project[] = [];
    private projectsUpdated = new Subject <Project[]>();

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

    getProjects(){
        this.http
      .get<{projects: Project[] }>(
        "http://localhost:3000/api/projects"
      )
      .pipe(map((projectData) => {
        return projectData.projects.map(project => {
          return {
            _id: project._id,
            agencyName: project.agencyName, 
            contractNumber: project.contractNumber,
            quantity: project.quantity,
            modeofPayment: project.modeofPayment,
            contractValue: project.contractValue,
            billingCycle: project.billingCycle,
            bankGuarantee: project.bankGuarantee
          };
        });
      }))
      .subscribe(transformedData => {
        this.projects = transformedData;
        this.projectsUpdated.next([...this.projects]);
      });
    }

    getPostUpdateListener() {
        return this.projectsUpdated.asObservable();
      }

    getProject(_id: string){
      return this.http.get<{
        _id: string,
        agencyName: string, 
        contractNumber: string, 
        quantity: string,
        modeofPayment: string,
        contractValue: number, 
        billingCycle:   string, 
        bankGuarantee:  boolean}>(`http://localhost:3000/api/projects/${_id}`);
    }

    getProjectTrans(id: string){
      return this.http.get<{
        _id: string,
        agencyName: string, 
        contractNumber: string, 
        quantity: string,
        modeofPayment: string,
        contractValue: number, 
        billingCycle:   string, 
        bankGuarantee:  boolean}>(`http://localhost:3000/noroute/${id}`);
    }
    
      addProject(
        agencyname: string,
        contractnumber: string,
        qnty: string,
        modeofpayment: string,
        contractvalue: number, 
        billingcycle:   string, 
        bankguarantee:  boolean ) {
        const project: Project = {
            _id: null,
            agencyName: agencyname, 
            contractNumber: contractnumber,
            quantity: qnty,
            modeofPayment: modeofpayment,
            contractValue: contractvalue,
            billingCycle: billingcycle,
            bankGuarantee: true,
        };
        this.http
          .post<{ message: string }>("http://localhost:3000/api/projects", project)
          .subscribe(responseData => {
            console.log(responseData.message);
            this
            this.projects.push(project);
            this.projectsUpdated.next([...this.projects]);
            this.router.navigate(["profile-view"]);
            this.toastr.success(responseData.message)
          });
      }

    updateProject(
      _id: string,
      agencyname: string,
      contractnumber: string,
      qnty: string,
      modeofpayment: string,
      contractvalue: number, 
      billingcycle:   string, 
      bankguarantee:  boolean){
        const project: Project = {
            _id: _id,
            agencyName: agencyname, 
            contractNumber: contractnumber,
            quantity: qnty,
            modeofPayment: modeofpayment,
            contractValue: contractvalue,
            billingCycle: billingcycle,
            bankGuarantee: true
        };
        this.http.put<{message: string}>(`http://localhost:3000/api/projects/${_id}`, project)
        .subscribe(response => {
          console.log(response);
          const updatedProjects = [...this.projects];
          const oldProjectIndex = updatedProjects.findIndex(p => p._id === project._id);
          updatedProjects[oldProjectIndex] = project;
          this.projects = updatedProjects;
          this.projectsUpdated.next([...this.projects]);
          this.router.navigate(["profile-view"]);
          this.toastr.info(response.message)
          
        });
      }

    
    deleteProject(projectId: string){
      this.http.delete<{message: string}>(`http://localhost:3000/api/projects/${projectId}` )
      .subscribe((response) => {
        console.log('Deleted!');
        const updatedProjects = this.projects.filter(project => project._id !== projectId);
        this.projects = updatedProjects;
        this.projectsUpdated.next([...this.projects]);
        this.toastr.info(response.message);
      });
    }

}
