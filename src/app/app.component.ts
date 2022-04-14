import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditRowComponent } from './edit-row/edit-row.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  columns: string[];
  sales: any[] = [];
  id = 1;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.columns = ['Edit', 'Name'];
  }

  ngOnInit(): void {
    this.createForm();
    this.sales = [
      {
        id: 0,
        name: 'Apple',
        email: 'apple@mail.com',
        phone: '123456789',
      },
    ];
  }

  get tableRowArray(): FormArray {
    debugger;
    return this.employeeForm.get('tableRowArray') as FormArray;
  }

  // addNewRow(): void {
  //   this.tableRowArray.push(this.createTableRow());
  // }

  onDeleteRow(rowIndex: number): void {
    this.tableRowArray.removeAt(rowIndex);
  }

  /**
   * Initializes the Form & by default adds an empty row to the PRIMENG TABLE
   */
  private createForm(): void {
    this.employeeForm = this.formBuilder.group({
      tableRowArray: this.formBuilder.array([this.createTableRow()]),
    });
  }

  /**
   * Returns the FormGroup as a Table Row
   */
  private createTableRow(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
    });
  }

  addNewRow() {
    this.sales.push({
      id: this.id,
      name: '',
      email: '',
      phone: '',
    });
    this.id = this.id + 1;
  }
  onRowEditInit(flight: any) {
    console.log(flight);
    console.log('Edit Init Event Called');
    const dialogRef = this.dialog.open(EditRowComponent, {
      width: '620px',
      data: this.sales[flight.id],
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.event === 'close') {
        ///////percentage
        console.log('result', result);
        this.sales[result.data.id] = result.data;
      }
    });
    //this.clonedProducts[product.id] = { ...product };
  }
}
