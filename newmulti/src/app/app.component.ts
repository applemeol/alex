import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiStepFormComponent } from './components/multi-step-form/multi-step-form.component';
import { STEP_ITEMS } from './constants/multi-step-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MultiStepFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'newmulti';

  formContent: any;
  formData: any;
  activeStepIndex!: number;

  ngOnInit(): void {
    this.formContent = STEP_ITEMS;
    this.formData = {};
  }

  onFormSubmit(formData: any): void {
    this.formData = formData;

    // post form data here
    alert(JSON.stringify(this.formData));
  }
}
