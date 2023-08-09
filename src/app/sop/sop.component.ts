import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from '../profile/profile.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Project } from '../profile/profile.model';
import { Transaction } from '../transaction/transaction.model';
import { TransactionService } from '../transaction/transaction.service';
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sop',
  templateUrl: './sop.component.html',
  styleUrls: ['./sop.component.css']
})
export class SopComponent implements OnInit{

  private projectId: string;
  public project: Project;
  public transaction: Transaction;
  public transac: any[];
  public currentProposal = 0;

  constructor(public projectsService: ProjectService, public route:ActivatedRoute, private transactionService: TransactionService){
  }
   ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('projectId')) {
        this.projectId  = paramMap.get('projectId');
        const id = encodeURIComponent(this.projectId);
        this.transactionService.getTransaction(id).subscribe(transactionData => {
        this.transaction = {
          _id: transactionData._id,
          agencyName: transactionData._id, 
          contractNumber: transactionData.contractNumber,
          contractValue: transactionData.contractValue,
          transaction : null,
          remainingBudget: transactionData.remainingBudget
        };
        console.log(this.transaction);
        this.transactionService.getTransaction(id).subscribe(transactionData => {
          this.transac = transactionData.transaction;
          console.log(this.transac);
          });
        });
        
      }
      else {
        this.projectId = null;
      }
    });
   }


  @ViewChild('content', {static:false}) el!:ElementRef;
  
  makePDF(){

    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        pdf.save('sop_tata.pdf');
      }
    });

  }


}
