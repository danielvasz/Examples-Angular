import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { InfoCharacter } from '../interfaces/rickandmorty-interface';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  private url: string = '';
  private infoCharacterSubject = new BehaviorSubject<InfoCharacter>({
    next: "https://rickandmortyapi.com/api/character"
  });
  
  public infoCharacter$ = this.infoCharacterSubject.asObservable();

  public updateInfoCharacter(infoCharacter: InfoCharacter) {
    this.infoCharacterSubject.next(infoCharacter);
  }

  constructor(
    private http: HttpClient
  ) {}

  private getPageCharacters() {

  }

  public async getCharacters(): Promise<any> {
    try {
      this.infoCharacter$.subscribe((result) => {
        if (result.next != null) {
          this.url = result.next;
        } else {
          throw new Error('Maximo de paginas');
        }
      })
      const response = await this.http.get(
        this.url
      ).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error en la consulta HTTP:', error);
      throw error;
    }
  }

  public async getEpisode(url: string): Promise<any> {
    try {
      const response = await this.http.get(
        url
      ).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

}