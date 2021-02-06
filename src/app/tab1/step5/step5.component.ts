import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
})
export class Step5Component implements OnInit {
  @Output() nextStep = new EventEmitter<string>();
  @Output() prevStep = new EventEmitter(null);
  images: string[] = [];
  showImages: string[] = [];

  constructor() { }

  ngOnInit() {}
  onSubmit() {
    this.nextStep.emit('');
  }

  prev() {
    this.prevStep.emit();
  }

  upload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(event.target.files[0]);
        this.showImages.push(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
