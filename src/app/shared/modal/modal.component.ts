import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeModal.emit(false);
  }

}
