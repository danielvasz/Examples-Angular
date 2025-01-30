import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Character, EpisodeCharacter } from '../../interfaces/rickandmorty-interface';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-modal-character',
  standalone: false,
  templateUrl: './modal-character.component.html',
  styleUrl: './modal-character.component.scss'
})
export class ModalCharacterComponent implements AfterViewInit{
  public readonly dialogRef = inject(MatDialogRef<ModalCharacterComponent>);
  private readonly data = inject<any>(MAT_DIALOG_DATA);
  public character: Character = this.data['character'];
  public displayedColumns: string[] = ['episode', 'name', 'air_date'];
  public dataSource = new MatTableDataSource<EpisodeCharacter>(this.data['listEspisode']);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

}
