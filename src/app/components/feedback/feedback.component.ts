import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FeedbackForm } from "./feedback.model";

@Component({
  selector: "app-feedback",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./feedback.component.html",
  styleUrl: "./feedback.component.scss",
})
export class FeedbackComponent {
  ratings: { value: number; emoji: string }[] = [
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

  feedback: FormGroup<FeedbackForm>;
  activeRating?: { value: number; emoji: string };
  invalidSubmit: boolean = false;
  validSubmit: boolean = false;

  constructor(private fb: FormBuilder) {
    this.feedback = this.fb.group<FeedbackForm>({
      rating: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
      message: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.feedback.valueChanges.subscribe(console.log);
  }

  onRatingClick(r: { value: number; emoji: string }) {
    console.log("onRatingChange", this.rating);
    if (this.validSubmit) return;
    this.feedback.get("rating")?.setValue(r.value);
    this.activeRating = r;
  }

  onMessageChange() {
    console.log("onMessageChange", this.message);
    this.invalidSubmit = false;
  }

  onSubmit(feedback: FormGroup) {
    console.log("onSubmit", feedback);
    this.invalidSubmit = feedback.invalid;
    this.validSubmit = feedback.valid;
    if (feedback.invalid) return;
  }

  // Status
  get rating() {
    console.log("rating", this.feedback.get("rating"));
    return this.feedback.get("rating");
  }

  // Messages
  get message() {
    console.log("rating", this.feedback.get("message"));
    return this.feedback.get("message");
  }
  get invalidMessage() {
    return this.message?.invalid && this.message?.touched;
  }
}
