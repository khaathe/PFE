import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import * as assets from '../../../../optimapp.asset.json';

/** Liste des icônes de l'appli */
const iconsPath : Array<any> = assets.icons;

/**
 * Service de gestion des icônes
 */
@Injectable({
  providedIn: 'root'
})
export class IconService {

  /**
   * Constructeur
   * @param iconRegistry service angular material pour enregistrer des icones
   * @param sanitizer service angular pour marquer une ressource comme fiable
   */
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    console.log('IconService.constructor');
    iconsPath.forEach( icon => iconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.path)) );
  }
}
