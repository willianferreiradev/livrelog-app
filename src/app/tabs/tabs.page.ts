import { Component } from '@angular/core';
import { Permission } from '../shared/models/Permission';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  permissions: Permission[] = [];

  constructor() {
    this.permissions = [
      { route: 'home', icon: 'home', label: 'Home' },
      { route: 'changes', icon: 'arrow-redo', label: 'Mudanças' },
      { route: 'notifications', icon: 'notifications', label: 'Notificações' },
      { route: 'profile', icon: 'person-circle', label: 'Meu Perfil' },
    ];
  }

}
