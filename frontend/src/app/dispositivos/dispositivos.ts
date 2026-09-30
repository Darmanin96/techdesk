import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DispositivoDialog } from '../dispositivo-dialog/dispositivo-dialog';
import { DISPOSITIVOS_DATA, DatosDispositivo, Dispositivo } from '../mock/dispositivos.mock';

@Component({
  selector: 'app-dispositivos',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './dispositivos.html',
  styleUrl: './dispositivos.scss',
})
export class Dispositivos {
  private dialog = inject(MatDialog);

  readonly columnas = ['tipo', 'marca', 'modelo', 'numeroSerie', 'cliente', 'acciones'];

  // Datos de prueba en memoria: se sustituirán por llamadas a la API
  private dispositivos = signal<Dispositivo[]>(DISPOSITIVOS_DATA);
  busqueda = signal('');

  filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    if (!q) return this.dispositivos();
    return this.dispositivos().filter((d) =>
      [d.tipo, d.marca, d.modelo, d.numeroSerie, d.cliente].some((v) => v.toLowerCase().includes(q)),
    );
  });

  nuevo(): void {
    this.dialog
      .open<DispositivoDialog, null, DatosDispositivo>(DispositivoDialog, { data: null })
      .afterClosed()
      .subscribe((resultado) => {
        if (!resultado) return;
        const id = Math.max(0, ...this.dispositivos().map((d) => d.id)) + 1;
        this.dispositivos.update((lista) => [{ id, ...resultado }, ...lista]);
      });
  }

  editar(dispositivo: Dispositivo): void {
    this.dialog
      .open<DispositivoDialog, DatosDispositivo, DatosDispositivo>(DispositivoDialog, { data: dispositivo })
      .afterClosed()
      .subscribe((resultado) => {
        if (!resultado) return;
        this.dispositivos.update((lista) =>
          lista.map((d) => (d.id === dispositivo.id ? { ...d, ...resultado } : d)),
        );
      });
  }

  eliminar(dispositivo: Dispositivo): void {
    this.dispositivos.update((lista) => lista.filter((d) => d.id !== dispositivo.id));
  }
}