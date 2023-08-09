import {HttpInterceptor,HttpRequest,HttpHandler, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ErrorComponent } from "./error/error.component";
import { ToastrService} from 'ngx-toastr';

@Injectable({providedIn:'root'})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let message = "Cannot Connect to the Server";
            if(error.error.message){
                message = error.error.message;
            }
            this.toastr.error(message);
            return throwError(error);
        })
    );
  }
}
