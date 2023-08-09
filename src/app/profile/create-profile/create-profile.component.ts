import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from '../profile.service';
import { TransactionService } from 'src/app/transaction/transaction.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})


export class CreateProfileComponent implements OnInit{
  public createForm: Array<any> = [];
  public customFields: Array<any> = [];
  public billingC: Array<string> = [];
  public customInput: Array<any> = [];
  constructor(public projectsService: ProjectService, private transactionService: TransactionService){
    this.createForm = [
      {
        labelName: 'Agency Name',
        inputName: 'agencyName',
        type: 'text',
        value: ''
      },{
        labelName: 'Contract Number',
        inputName: 'contractNumber',
        type: 'text',
        value: ''
      },
      {
        labelName: 'Quantity',
        inputName: 'quantity',
        type: 'text',
        value: ''

      },
      {
        labelName: 'Mode of Payment',
        inputName: 'modeofPayment',
        type: 'text',
        value: ''

      },
      {
        labelName: 'Contract Value',
        inputName: 'contractValue',
        type: 'text',
        value: ''

      },
    ],
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
      
  }

  onFilePicked(event: Event){

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
  }

  addFieldForm(value) {
    this.customFields.push({
      labelName: value.newField,
      inputName: value.newField.replace(/ /g, ""),
      type: 'text',
      value: ''
    })
    value.newField = ""
    console.log(this.customFields);
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

  onAddTransaction(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.transactionService.addTransaction(
      form.value.agencyName,
      form.value.contractNumber, 
      form.value.contractValue,
      [],
      form.value.contractValue
      );
    form.resetForm();
  }
  
}
