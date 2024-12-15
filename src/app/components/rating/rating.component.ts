import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Rating } from "./rating.model";

@Component({
  selector: "app-rating",
  standalone: true,
  imports: [],
  templateUrl: "./rating.component.html",
  styleUrl: "./rating.component.scss",
})
export class RatingComponent {
  @Input() rating!: Rating;
  @Input() active?: boolean;
  @Input() disabled?: boolean;

  @Output() ratingSelected = new EventEmitter<Rating>();

  onClick() {
    console.log("RatingComponent", this.rating);
    this.ratingSelected.emit(this.rating);
  }
}
