import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.scss'],
})
export class EditRowComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRowComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.fillForm();
  }
  fillForm() {
    this.editForm = this.fb.group({
      id: [this.data.id, Validators.required],
      name: [this.data.name, Validators.required],
      email: [this.data.email, [Validators.required]],
      phone: [this.data.phone, [Validators.required]],
    });
  }
  onSubmit() {
    console.log(this.editForm.value);
    this.dialogRef.close({
      event: 'close',
      data: this.editForm.value,
      id: this.data.id,
    });
  }
}
