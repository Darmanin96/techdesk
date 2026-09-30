import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatosCliente } from '../mock/clientes.mock';

@Component({
  selector: 'app-cliente-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './cliente-dialog.html',
  styleUrl: './cliente-dialog.scss',
})
export class ClienteDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClienteDialog>);
  data = inject<DatosCliente | null>(MAT_DIALOG_DATA);

  form = this.fb.nonNullable.group({
    nombre: [this.data?.nombre ?? '', Validators.required],
    apellidos: [this.data?.apellidos ?? '', Validators.required],
    email: [this.data?.email ?? '', [Validators.required, Validators.email]],
    empresa: [this.data?.empresa ?? '', Validators.required],
    telefono: [this.data?.telefono ?? ''],
    direccion: [this.data?.direccion ?? ''],
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