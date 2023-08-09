import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { response } from "express";
import { Router } from "@angular/router";
import { Transaction } from './transaction.model';
import { Event } from './event.model';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../profile/profile.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private events: Event;
  private eventsUpdated = new Subject <Event>();
  private transactions: Event[] = [];
  private transactionsUpdated = new Subject <Event[]>();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getTransaction(id: string){
    return this.http.get<{
      _id: string,
      agencyName: string, 
      contractNumber: string,
      contractValue: number,
      transaction : any[],
      remainingBudget: number}>(`http://localhost:3000/transaction/${id}`);
  }

  addEvent(
    _id:string,
    transNo: string ,
        date: string ,
        amount: number , 
    ){
      const event: Event = {
        _id: null,
        transNo: transNo ,
        date: date ,
        amount: amount 
      };
      console.log(event);
      this.http.post<{message: string, res: any}>(`http://localhost:3000/transaction/${_id}`, event)
      .subscribe(response => {
        this.toastr.success(response.message);
        console.log(response.message);
        });
    }

    addTransaction(
      agencyName: string,
      contractNumber: string,
      contractValue: number,
      transaction: any[],
      remainingBudget: number
    ){
      const transac: Transaction = {
      _id: null,
      agencyName: agencyName,
      contractNumber: contractNumber,
      contractValue: contractValue,
      transaction: null,
      remainingBudget: remainingBudget
      };
      this.http.post<{message: string}>('http://localhost:3000/transaction/', transac)
      .subscribe((response) => {
        this.toastr.success(response.message);
      })
    }

    deleteProject(_id: string, cN: string){
      this.http.delete<{message: string}>(`http://localhost:3000/transaction/${_id}/${cN}`)
      .subscribe((response) => {
        console.log(response.message);
        this.toastr.info(response.message);
      });
    }

    deleteTransac(_id: string){
      this.http.delete<{message: string}>(`http://localhost:3000/noroute/${_id}`)
      .subscribe((response) => {
        console.log(response.message)
      })
    }

    updateBudget(_id: string, tran: number){
      const num = {
        amount: tran
      };
      this.http.patch<{message: string}>(`http://localhost:3000/transaction/${_id}`, num)
      .subscribe((response) => {
        console.log(response.message);
      })
    }

    restoreBudeget(_id: string, tran: number){
      const num = {
        amount: tran
      };
      this.http.patch<{message: string}>(`http://localhost:3000/noroute/${_id}`, num)
      .subscribe((response) => {
        console.log(response.message);
      })
    }
}
