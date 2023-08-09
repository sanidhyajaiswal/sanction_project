import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from '../profile/profile.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Project } from '../profile/profile.model';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  private mode = 'create';
  private projectId: string;
  public project: Project;
  public transaction: any[];

  constructor(public projectsService: ProjectService, public route:ActivatedRoute, private transactionService: TransactionService){
  }

  @ViewChild( 'dropdown', {static:false}) dropdown?: ElementRef;
  selectedVal?: string;

  selectedOption(){
    this.selectedVal = this.dropdown.nativeElement.value;
    return this.selectedVal;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('projectId')) {
        this.mode = 'edit';
        this.projectId  = paramMap.get('projectId');
        const id = encodeURIComponent(this.projectId);
        this.projectsService.getProjectTrans(id).subscribe(projectData => {
        this.project = {
            _id: projectData._id,
            agencyName: projectData.agencyName, 
            contractNumber: projectData.contractNumber, 
            quantity: projectData.quantity,
            modeofPayment: projectData.modeofPayment,
            contractValue: projectData.contractValue, 
            billingCycle:   projectData.billingCycle, 
            bankGuarantee:  projectData.bankGuarantee};
        });
      }
      else {
        this.mode = 'create';
        this.projectId = null;
      }
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('projectId')) {
        this.projectId  = paramMap.get('projectId');
        const id = encodeURIComponent(this.projectId);
        this.transactionService.getTransaction(id).subscribe(transactionData => {
        this.transaction = transactionData.transaction;
        console.log(this.transaction);
        });
      }
      else {
        this.projectId = null;
      }
    });

    


  }

  



  onAddProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.projectsService.addProject(
      form.value.agencyName, 
      form.value.contractNumber, 
      form.value.quantity, 
      form.value.modeofPayment, 
      form.value.contractValue, 
      form.value.billingCycle, 
      form.value.bankGuarantee);
    form.resetForm();
  }

  onSaveProject(form:NgForm) {
    this.projectsService.updateProject(
      this.projectId,
      form.value.agencyName, 
      form.value.contractNumber, 
      form.value.quantity, 
      form.value.modeofPayment, 
      form.value.contractValue, 
      form.value.billingCycle, 
      form.value.bankGuarantee);
  }
  }

