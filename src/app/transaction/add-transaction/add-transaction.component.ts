import { Component, OnInit} from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/profile/profile.service';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Project } from 'src/app/profile/profile.model';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit{
  private projectId: string;
  public event: Event;

  constructor(public projectsService: ProjectService, public route:ActivatedRoute, private transactionService: TransactionService, private router:Router){
    this.event = {
      _id : null,
      transNo: '',
      date: '',
      amount: 0
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('projectId')) {
        this.projectId  = paramMap.get('projectId');
        this.projectId = encodeURIComponent(this.projectId);
        
      }    
      else {
        this.projectId = null;
      }
    });
      
  }

  
  onAddTransaction(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.projectId);
    this.transactionService.addEvent(
      this.projectId,
      form.value.transNo,
      form.value.date,
      Number(form.value.amount));
    this.transactionService.updateBudget(this.projectId, Number(form.value.amount));
    form.resetForm();
  }

}
