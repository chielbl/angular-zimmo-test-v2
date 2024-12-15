import { FormControl } from "@angular/forms";

export type Feedback = {
  rating: number;
  message: string;
}

export type FeedbackForm = {
  [field in keyof Feedback]: FormControl<Feedback[field] | null>;
};