import { FormControl } from "@angular/forms";

export type Feedback = {
  id: string;
  rating: number;
  message: string;
  createdAt: Date;
};

export type NewFeedback = Omit<Feedback, "id" | "createdAt">;

export type FeedbackForm = {
  [field in Partial<keyof NewFeedback>]: FormControl<Feedback[field] | null>;
};
