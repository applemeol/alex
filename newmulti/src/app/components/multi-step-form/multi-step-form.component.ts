import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormatTitlePipe } from '../../pipes/format-title.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormatTitlePipe ],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css'
})
export class MultiStepFormComponent implements OnInit{
  @Input() formContent: any;

  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  activeStepIndex!: number;
  currentFormContent!: Array<any>;
  formData: any;
  formFields!: Array<Array<string>>;
  masterFormFields!: Array<string>;
  stepItems!: Array<any>;
  masterForm!: Array<FormGroup>;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.activeStepIndex = 0;
    this.masterForm = [];
    this.currentFormContent = [];
    this.formFields = [];
    this.stepItems = this.formContent;

    this.stepItems.forEach((data, i) => {
      this.currentFormContent.push(this.stepItems[i]["data"]); // holds name, validators, placeholder of all steps
      this.formFields.push(Object.keys(this.currentFormContent[i])); // holds string values for each field of all steps
      this.masterForm.push(this.buildForm(this.currentFormContent[i])); // holds all form groups
    });
  }

  // build separate FormGroups for each form
  buildForm(currentFormContent: any): FormGroup {
    const formDetails = Object.keys(currentFormContent).reduce((obj:{ [key: string]: any }, key) => {
      obj[key] = ["", this.getValidators(currentFormContent[key])];

      return obj;
    }, {});

    return this._formBuilder.group(formDetails);
  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.masterForm[this.activeStepIndex].patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this._cd.markForCheck();
      };
    }
  }


getValidators(formField: any): ValidatorFn[] {
  const fieldValidators = Object.keys(formField.validations).map((validator) => {
    const value = formField.validations[validator];
    
    switch (validator) {
      case 'required':
        return Validators.required;
      case 'minLength':
        return Validators.minLength(value);
      case 'maxLength':
        return Validators.maxLength(value);
      case 'pattern':
        return Validators.pattern(value);
      default:
        throw new Error(`Unknown validator: ${validator}`);
    }
  });

  return fieldValidators;
}


  // get validation error messages per error, per field
  getValidationMessage(formIndex: number, formFieldName: string): string {
    const formErrors = this.masterForm[formIndex].get(formFieldName)?.errors;
    const errorMessages = this.currentFormContent[formIndex][formFieldName]
      .errors;
    const validationError = 'dummy error ' ;//errorMessages[Object.keys(formErrors)[0]];

    return validationError;
  }

  goToStep(step: string): void {
    this.activeStepIndex =
      step === "prev" ? this.activeStepIndex - 1 : this.activeStepIndex + 1;

    this.setFormPreview();
  }

  setFormPreview(): void {
    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    this.masterFormFields = Object.keys(this.formData);
  }

  onFormSubmit(): void {
    this.formSubmit.emit(this.formData);
  }

  trackByFn(index: number): number {
    return index;
  }
}
