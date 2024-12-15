import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FeedbackService } from "../../services/feedback.service";
import { RatingComponent } from "../rating/rating.component";
import { Rating } from "../rating/rating.model";
import { Feedback, FeedbackForm } from "./feedback.model";

const ratingData:Rating[] = [
  {
    value: 1,
    emoji: "frown",
  },
  {
    value: 2,
    emoji: "neutral",
  },
  {
    value: 3,
    emoji: "smile",
  },
  {
    value: 4,
    emoji: "laughing",
  },
  {
    value: 5,
    emoji: "heart-eyes",
  },
];

@Component({
  selector: "app-feedback",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RatingComponent],
  templateUrl: "./feedback.component.html",
  styleUrl: "./feedback.component.scss",
})
export class FeedbackComponent {
  ratings: Rating[] = ratingData
  feedback: FormGroup<FeedbackForm> = new FormGroup<FeedbackForm>({
    rating: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    message: new FormControl("", Validators.required),
  });
  activeRating?: { value: number; emoji: string };
  invalidSubmit: boolean = false;
  validSubmit: boolean = false;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.feedback.valueChanges.subscribe(console.log);
  }

  onRatingClick(rating: Rating) {
    console.log("onRatingChange", rating);
    if (this.validSubmit) return;
    this.feedback.get("rating")?.setValue(rating.value);
    this.activeRating = rating;
  }

  onMessageChange() {
    console.log("onMessageChange", this.message);
    this.invalidSubmit = false;
  }

  onSubmit(feedback: FormGroup<FeedbackForm>) {
    console.log("onSubmit", feedback);
    this.invalidSubmit = feedback.invalid;
    this.validSubmit = feedback.valid;
    if (feedback.invalid) return;
    this.feedbackService.submit(feedback.value as Feedback).subscribe({
      next: (response) => {
        console.log("Response:", response);
        // Success
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });
  }

  // Status
  get rating() {
    console.log("rating", this.feedback.get("rating"));
    return this.feedback.get("rating");
  }

  // Messages
  get message() {
    console.log("message", this.feedback.get("message"));
    return this.feedback.get("message");
  }
  get invalidMessage() {
    return this.message?.invalid && this.message?.touched;
  }
}
