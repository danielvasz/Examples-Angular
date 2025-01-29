import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCharacterComponent } from '../modal-character/modal-character.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCharacter } from '../../store/rickandmorty.actions';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { Character, EpisodeCharacter } from '../../interfaces/rickandmorty-interface';
import { selectCharacter } from '../../store/reckandmorty.selectors';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarCharacterComponent } from '../snackbar-character/snackbar-character.component';

@Component({
  selector: 'app-character',
  standalone: false,
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  loadCharacter$: Observable<any> = new Observable();
  getCharacter$: Observable<Character[]> = new Observable();
  public characterList: Character[] = [];

  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    private store: Store<{ loadCharacter: Object }>,
    private rickandmortyService: RickandmortyService,
    private matSnackBar: MatSnackBar
  ) {
    matIconRegistry
    .addSvgIcon('female', domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/gender/female.svg'
    ))
    .addSvgIcon('male', domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/gender/male.svg'
    ))
    .addSvgIcon('male_female', domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/gender/male-female.svg'
    ))
    .addSvgIcon('live', domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/status/live.svg'
    ))
    .addSvgIcon('dead', domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/status/dead.svg'
    ))
    .addSvgIcon('live_dead', domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/status/live-dead.svg'
    ))

    this.getCharacter$ = store.select(selectCharacter);
    this.getCharacter$.subscribe((character) => {
      this.characterList = character;
    });
  }

  async ngOnInit() {
    this.setCharacter();
  }

  private async setCharacter() {
    try {
      const { info, results } = await this.rickandmortyService.getCharacters();
      this.rickandmortyService.updateInfoCharacter(info);
      const index = this.characterList.length - 1;
      if (this.characterList[index]?.id != info['count']) {
        for(let item in results) {
          this.store.dispatch(
            loadCharacter(
              { character: {
                'id': results[item]['id'],
                'name': results[item]['name'],
                'status': results[item]['status'],
                'species': results[item]['species'],
                'type': results[item]['type'],
                'gender': results[item]['gender'],
                'origin': results[item]['origin'],
                'location': results[item]['location'],
                'image': results[item]['image'],
                'episode': results[item]['episode'],
                'url': results[item]['url'],
                'created': results[item]['created']
                }
              }
            )
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public getCharacter(): void {
    this.getCharacter$.subscribe((character) => {
      this.characterList = character
    })
  }

  public chipCharacter(characterValue: string, characterKey: string) {
    const items = new Map();
    items.set('status', {
      alive: 'live',
      dead: 'dead',
      unknown: 'live_dead'
    });
    items.set('gender', {
      male: 'male',
      female: 'female',
      unknown: 'male_female'
    })

    for (const [key, value] of items.entries()) {
      if (key == characterKey) {
        for (let key of Object.keys(value)) {
          if (key === characterValue.toLowerCase()) {
            return value[key];
          }
        }
      }
    }
  }


  public async openModal(id: number): Promise<void> {
    let character = this.characterList.find(item => item['id'] == id);
    let listEspisode = await this.getEpisode(character?.episode);
    const data = {
      character: character, 
      listEspisode: listEspisode
    };
    let dialogRef = this.dialog.open(ModalCharacterComponent, {
      data: data,
      height: '450px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);
    });
  }

  private async getEpisode(items: any): Promise<any> {
    let listEpisode:  EpisodeCharacter[] = [];
    try {
      for(let item of items) {
        console.log(item);
        const {
          name,
          air_date,
          episode
        } = await this.rickandmortyService.getEpisode(item);
        listEpisode.push({
          episode: episode,
          name: name,
          air_date: air_date
        });
      }
      return listEpisode;
    } catch (error) {
      console.log('error', error);
    }
  }

  @HostListener('document:scroll')
  public scrollElement(): void {
    let totalScreen = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let maxScreen = document.documentElement.scrollHeight - 50;
    if (totalScreen >= maxScreen) {
      this.setCharacter(); 
    }
  }

  openSnackBar(event: string) {
    this.matSnackBar.openFromComponent(SnackbarCharacterComponent, {
      data: event,
      duration: 5 * 1000,
    });
  }


}
