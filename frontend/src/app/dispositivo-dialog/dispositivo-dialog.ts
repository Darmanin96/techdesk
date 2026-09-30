import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CLIENTES } from '../mock/catalogos.mock';
import { DatosDispositivo, TIPOS_DISPOSITIVO } from '../mock/dispositivos.mock';

@Component({
  selector: 'app-dispositivo-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './dispositivo-dialog.html',
  styleUrl: './dispositivo-dialog.scss',
})
export class DispositivoDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DispositivoDialog>);
  data = inject<DatosDispositivo | null>(MAT_DIALOG_DATA);

  readonly clientes = CLIENTES;
  readonly tipos = TIPOS_DISPOSITIVO;

  form = this.fb.nonNullable.group({
    cliente: [this.data?.cliente ?? '', Validators.required],
    tipo: [this.data?.tipo ?? '', Validators.required],
    marca: [this.data?.marca ?? '', Validators.required],
    modelo: [this.data?.modelo ?? '', Validators.required],
    numeroSerie: [this.data?.numeroSerie ?? '', Validators.required],
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