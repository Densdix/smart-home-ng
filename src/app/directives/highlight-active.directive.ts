import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appHighlightActive]',
  standalone: true,
})
export class HighlightActiveDirective implements OnChanges {
  @Input() appHighlightActive = false;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnChanges() {
    if (this.appHighlightActive) {
      this.renderer.addClass(this.el.nativeElement, 'highlight-active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'highlight-active');
    }
  }
}
