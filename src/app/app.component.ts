import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FeedbackComponent } from "./components/feedback/feedback.component";
import { InfoComponent } from "./components/info/info.component";
import { CardComponent } from "./components/card/card.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FeedbackComponent, InfoComponent, CardComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "zimmo-feedback";
}