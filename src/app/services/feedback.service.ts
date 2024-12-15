import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Feedback, NewFeedback } from "../components/feedback/feedback.model";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  private apiUrl = "/api/feedback";

  constructor(private http: HttpClient) {}

  submit(body: NewFeedback): Observable<Feedback> {
    // Make a dummy feedback response
    const dummyResponse: Feedback = {
      ...body,
      id: new Date().toISOString(),
      createdAt: new Date()
    };

    console.log("FeedbackService", body);
    return of(dummyResponse).pipe(delay(1000));
    // return this.http.post(this.apiUrl, body);
  }
}
