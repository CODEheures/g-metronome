import { Options }                      from '@angular-slider/ngx-slider';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, NgZone, OnInit }    from '@angular/core';
import { GlobalParentComponent }        from '../../common/global-parent/global-parent.component';
import { Measure }                      from '../../common/models/measure';
import { MeasuresService }              from '../../common/services/measures.service';

@Component({
			   selector:    'app-configurator',
			   templateUrl: './configurator.component.html',
			   styleUrls:   ['./configurator.component.scss']
		   })
export class ConfiguratorComponent
	extends GlobalParentComponent
	implements OnInit
{
	measures: Measure[] = [];
	colorPicker         = false;
	beatOptions: Options;
	timesOptions: Options;

	constructor(private zone: NgZone, private measureService: MeasuresService)
	{
		super();
	}

	ngOnInit(): void
	{
		const storedMeasures = Array.from(JSON.parse(localStorage.getItem('metronome')) || []);
		this.measureService.updateMeasures(storedMeasures.map(measure => Object.assign(new Measure(),
																					   measure)));
		const subscriptions = [
			this.measureService.measures.subscribe(measures =>
												   {
													   this.measures = measures;
													   localStorage.setItem('metronome',
																			JSON.stringify(measures));
												   })
		];
		this.subscriptions.push(...subscriptions);

		this.beatOptions = {
			floor: 40,
			ceil:  180,
			step:  1
		};

		this.timesOptions = {
			floor: 1,
			ceil:  25,
			step:  1
		};
	}

	addMeasure()
	{
		const newMeasure = new Measure();
		if (this.measures.length)
		{
			newMeasure.beat  = this.measures[this.measures.length - 1].beat;
			newMeasure.times = this.measures[this.measures.length - 1].times;
		}
		newMeasure.color = this.randomColor();
		this.measureService.addMeasure(newMeasure);
	}

	removeMeasure(measure: Measure)
	{
		this.measureService.removeMeasure(measure);
	}

	drop(event: CdkDragDrop<Measure[]>)
	{
		moveItemInArray(this.measures,
						event.previousIndex,
						event.currentIndex);
		this.measureService.updateMeasures(this.measures);
	}

	private randomColor(): string
	{
		const letters = '0123456789ABCDEF';
		let color     = '#';
		for (let i = 0; i < 6; i++)
		{
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

}
