import { NgxSliderModule }       from '@angular-slider/ngx-slider';
import { DragDropModule }        from '@angular/cdk/drag-drop';
import { CommonModule }          from '@angular/common';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { ColorPickerModule }     from 'ngx-color-picker';
import { ConfiguratorComponent } from './configurator/configurator.component';

import { MetronomeRoutingModule } from './metronome-routing.module';
import { OscsillatorComponent }   from './oscsillator/oscsillator.component';
import { PageComponent }          from './page/page.component';

@NgModule({
			  declarations: [
				  OscsillatorComponent,
				  ConfiguratorComponent,
				  PageComponent
			  ],
			  imports:      [
				  CommonModule,
				  MetronomeRoutingModule,
				  FormsModule,
				  ColorPickerModule,
				  DragDropModule,
				  NgxSliderModule
			  ]
		  })
export class MetronomeModule
{
}
