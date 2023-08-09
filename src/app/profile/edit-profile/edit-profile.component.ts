import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from '../profile.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Project } from '../profile.model';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit{
  public createForm: Array<any> = [];
  public customFields: Array<any> = [];
  public billingC: Array<string> = [];
  private mode = 'create';
  private projectId: string;
  public project: Project;

  constructor(public projectsService: ProjectService, public route:ActivatedRoute){
    this.billingC = ["Weekly", 'Monthly', "Quarterly", "Bi-Annually", "Annually"]
  }

  @ViewChild( 'dropdown', {static:false}) dropdown?: ElementRef;
  selectedVal?: string;

  selectedOption(){
    this.selectedVal = this.dropdown.nativeElement.value;
    return this.selectedVal;
  }

  ngOnInit(): void {
    this.addClass()

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('projectId')) {
        this.mode = 'edit';
        this.projectId  = paramMap.get('projectId');
        this.projectsService.getProject(this.projectId).subscribe(projectData => {
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

  addFieldForm(value) {
    this.customFields.push({
      labelName: value.newField,
      inputName: value.newField.replace(/ /g, ""),
      type: 'text',
      value: ''
    })
    value.newField = ""
    
  }

  deleteFieldForm(i){
    this.customFields.splice(i,1);
  }

  addClass() {
    var element = document.getElementById("create");
    element.classList.add("active");
  }

  formSubmit() {

  }
}
