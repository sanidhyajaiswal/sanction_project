import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../profile.model';
import { ProjectService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TransactionService } from 'src/app/transaction/transaction.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, OnDestroy{

  projects: Project[] = [];
  userIsAuthenticated = false;
  private projectsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public projectService: ProjectService, private authService: AuthService, private transactionService: TransactionService) {}

  ngOnInit() {
    this.projectService.getProjects();
    this.projectsSub = this.projectService.getPostUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(projectID: string){
    this.projectService.deleteProject(projectID);
  }

  onDeleteTransac(_id: string){
    this.transactionService.deleteTransac(_id);
  }
  

}
