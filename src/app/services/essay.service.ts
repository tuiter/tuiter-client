import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from "@angular/core";

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Essay } from "../../models/essay";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class EssayService {

    private essayCollection: Essay[] = [];
    essayCreated = new EventEmitter<any>();
    essayEdited = new EventEmitter<Essay>();
    essayDeleted = new EventEmitter<any>();

    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    // essayCollection related Methods

    updateEssayElement(original: Essay, newEssay: Essay) {
        let index = this.essayCollection.indexOf(original);
        this.essayCollection[index] = newEssay;
    }

    addEssayElement(essay: Essay):void {
        this.essayCollection.push(essay);
    }

    setEssayCollection(essayCollection: Essay[]): void {
        this.essayCollection = essayCollection;
    }

    getEssayCollection(): Essay[] {
        return this.essayCollection;
    }

    //Event Emission related methods

    notifyEssayCreation(): void {
        this.essayCreated.emit();
    }

    notifyEssayEdition(essay: Essay): void {
        this.essayEdited.emit(essay);
    }

    notifyEssayDeletion(deletedEssay: Essay) {
        this.essayCollection = this.essayCollection
                .filter(essay => essay.id !== deletedEssay.id);
        this.essayDeleted.emit();
    }

    //HTTP related methods
    createEssay(essayData): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('essays'), essayData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    deleteEssay(id): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.delete(this.API.concat('essays/'+id), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
        });
    }

    getUserEssays(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
        return this.http.get<Essay[]>(this.API.concat('users/'+userId+'/essays'), httpOptions)
        .map((essays: Essay[]) => essays)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    editEssay(essayData): Observable<any> {
        const essayId = essayData.id;
        delete essayData.id;
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('essays/'+essayId), essayData, httpOptions)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    receiveToReview() {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
        return this.http.get<Essay>(this.API.concat('users/'+userId+'/evaluate'), httpOptions)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

}
