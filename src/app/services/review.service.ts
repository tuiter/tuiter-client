import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { EssayService } from './essay.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Review } from '../../models/review';
import { Essay } from './../../models/essay';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class ReviewService {

    /** Event emitter to notify the display of a rating */
    ratingDisplayed = new EventEmitter<any>();
    checkReview = new EventEmitter<Review>();
    private reviewsCollection: any[] = [];
    /** Production/Development API URL */
    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private essayService: EssayService,
        private errorService: ErrorService) {}

    // reviewsCollection related Methods

    updateReviewElement(original: Review, newReview: Review): void {
        const index = this.reviewsCollection.indexOf(original);
        this.reviewsCollection[index] = newReview;
    }

    addReviewElement(review: Review): void {
        this.reviewsCollection.push(review);
    }

    setReviewCollection(ReviewCollection: Review[]): void {
        this.reviewsCollection = ReviewCollection;
    }

    getReviewCollection(): Review[] {
        return this.reviewsCollection;
    }

    getReviewByIndex(index: number): Review {
        return this.getReviewCollection()[index];
    }

    getReviewByAttribute(key: any, value: any): Review {
        const size = this.getReviewCollection().length;
        let result: Review;
        if (size < 1) {
            result = null;
        } else {
            for (let i = 0; i < this.getReviewCollection().length; i++) {
                if (this.getReviewCollection()[i][key] === value) {
                    result = this.getReviewCollection()[i];
                    break;
                }
            }
        }
        return result;
    }

    getReviewsOfEssay(essayId: string): Review[] {

      return this.reviewsCollection.filter((review) => {
        if (review.essayId === essayId) {
          return true;
        } else {
          return false;
        }
      });
    }

    // HTTP related Methods

    /**
     * Requests the edition of a review.
     * @param reviewData - The new review data.
     * @param reviewId - The id of the review to be edited.
     */
    updateReview(reviewData, reviewId): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('reviews/'.concat(reviewId)), reviewData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests the reviews related to the currently validated user.
     */
    getReviewsAboutUser(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
        return this.http.get(this.API.concat('users/'.concat(userId)).concat('/essaysReviews'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

}
