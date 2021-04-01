import { Component } from '@angular/core';

export type EditorType = 'name' | 'profile' | 'rFormUdemy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editor: EditorType = 'name';

  get showNameEditor() {
    return this.editor === 'name';
  }

  get showProfileEditor() {
    return this.editor === 'profile';
  }

  get showFormUdemy() {
    return this.editor === 'rFormUdemy';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
}
