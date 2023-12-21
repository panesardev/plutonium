import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="loading">
      <div class="lds-dual-ring"></div>
    </div>
  `,
  styles: `
    .loading {
      display: grid;
      place-content: center;
      width: 100%;
    }

    .lds-dual-ring {
      display: inline-block;
      width: 80px;
      height: 80px;
    }

    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid hsl(186, 70%, 27%);
      border-color: hsl(186, 70%, 27%) transparent hsl(186, 70%, 27%) transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {}

