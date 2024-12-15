import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Feedback } from "../components/feedback/feedback.model";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  private apiUrl = "/api/feedback";

  constructor(private http: HttpClient) {}

  submit(body: Feedback): Observable<any> {
    console.log("FeedbackService", body);
    return this.http.post(this.apiUrl, body);
  }
}
