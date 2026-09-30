import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatosTecnico } from '../mock/tecnicos.mock';

@Component({
  selector: 'app-tecnico-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './tecnico-dialog.html',
  styleUrl: './tecnico-dialog.scss',
})
export class TecnicoDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TecnicoDialog>);
  data = inject<DatosTecnico | null>(MAT_DIALOG_DATA);

  form = this.fb.nonNullable.group({
    nombre: [this.data?.nombre ?? '', Validators.required],
    apellidos: [this.data?.apellidos ?? '', Validators.required],
    email: [this.data?.email ?? '', [Validators.required, Validators.email]],
    especialidad: [this.data?.especialidad ?? '', Validators.required],
    telefono: [this.data?.telefono ?? ''],
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}