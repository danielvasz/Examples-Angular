import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Character, EpisodeCharacter } from '../../interfaces/rickandmorty-interface';
import { MatPaginator } from '@angular/material/paginator';
import { RickandmortyService } from '../../services/rickandmorty.service';

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

  constructor(
    private rickandmortyService: RickandmortyService,
  ) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log('data', this.data);
  }

}

const ELEMENT_DATA: EpisodeCharacter[] = [
  {episode: '1', name: 'Hydrogen', air_date: 'H'},
  {episode: '2', name: 'Helium', air_date: 'He'},
  {episode: '3', name: 'Lithium', air_date: 'Li'},
  {episode: '4', name: 'Beryllium', air_date: 'Be'},
  {episode: '5', name: 'Boron', air_date: 'B'}
];
