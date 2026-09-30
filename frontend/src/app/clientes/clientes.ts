import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClienteDialog } from '../cliente-dialog/cliente-dialog';
import { CLIENTES_DATA, Cliente, DatosCliente } from '../mock/clientes.mock';

@Component({
  selector: 'app-clientes',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes {
  private dialog = inject(MatDialog);

  readonly columnas = ['nombre', 'empresa', 'email', 'telefono', 'acciones'];

  // Datos de prueba en memoria: se sustituirán por llamadas a la API
  private clientes = signal<Cliente[]>(CLIENTES_DATA);
  busqueda = signal('');

  filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    if (!q) return this.clientes();
    return this.clientes().filter((c) =>
      [c.nombre, c.apellidos, c.empresa, c.email].some((v) => v.toLowerCase().includes(q)),
    );
  });

  nuevo(): void {
    this.dialog
      .open<ClienteDialog, null, DatosCliente>(ClienteDialog, { data: null })
      .afterClosed()
      .subscribe((resultado) => {
        if (!resultado) return;
        const id = Math.max(0, ...this.clientes().map((c) => c.id)) + 1;
        this.clientes.update((lista) => [{ id, ...resultado }, ...lista]);
      });
  }

  editar(cliente: Cliente): void {
    this.dialog
      .open<ClienteDialog, DatosCliente, DatosCliente>(ClienteDialog, { data: cliente })
      .afterClosed()
      .subscribe((resultado) => {
        if (!resultado) return;
        this.clientes.update((lista) =>
          lista.map((c) => (c.id === cliente.id ? { ...c, ...resultado } : c)),
        );
      });
  }

  eliminar(cliente: Cliente): void {
    this.clientes.update((lista) => lista.filter((c) => c.id !== cliente.id));
  }
}