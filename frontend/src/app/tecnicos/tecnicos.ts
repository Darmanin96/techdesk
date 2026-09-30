import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TecnicoDialog } from '../tecnico-dialog/tecnico-dialog';
import { DatosTecnico, TECNICOS_DATA, Tecnico } from '../mock/tecnicos.mock';

@Component({
  selector: 'app-tecnicos',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './tecnicos.html',
  styleUrl: './tecnicos.scss',
})
export class Tecnicos {
  private dialog = inject(MatDialog);

  readonly columnas = ['nombre', 'especialidad', 'email', 'telefono', 'acciones'];

  // Datos de prueba en memoria: se sustituirán por llamadas a la API
  private tecnicos = signal<Tecnico[]>(TECNICOS_DATA);
  busqueda = signal('');

  filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    if (!q) return this.tecnicos();
    return this.tecnicos().filter((t) =>
      [t.nombre, t.apellidos, t.especialidad, t.email].some((v) => v.toLowerCase().includes(q)),
    );
  });

  nuevo(): void {
    this.dialog
      .open<TecnicoDialog, null, DatosTecnico>(TecnicoDialog, { data: null })
      .afterClosed()
      .subscribe((resultado) => {
        if (!resultado) return;
        const id = Math.max(0, ...this.tecnicos().map((t) => t.id)) + 1;
        this.tecnicos.update((lista) => [{ id, ...resultado }, ...lista]);
      });
  }

  editar(tecnico: Tecnico): void {
    this.dialog
      .open<TecnicoDialog, DatosTecnico, DatosTecnico>(TecnicoDialog, { data: tecnico })
      .afterClosed()
      .subscribe((resultado) => {
        if (!resultado) return;
        this.tecnicos.update((lista) =>
          lista.map((t) => (t.id === tecnico.id ? { ...t, ...resultado } : t)),
        );
      });
  }

  eliminar(tecnico: Tecnico): void {
    this.tecnicos.update((lista) => lista.filter((t) => t.id !== tecnico.id));
  }
}