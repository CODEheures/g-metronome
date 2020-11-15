import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalParentComponent }        from '../../common/global-parent/global-parent.component';
import { Measure }                      from '../../common/models/measure';
import { MeasuresService }              from '../../common/services/measures.service';

@Component({
			   selector:    'app-oscsillator',
			   templateUrl: './oscsillator.component.html',
			   styleUrls:   ['./oscsillator.component.scss']
		   })
export class OscsillatorComponent
	extends GlobalParentComponent
	implements OnInit
{
	measures: Measure[]                                            = [];
	currentTime: { cycle: number, measure: Measure, time: number } = null;
	oscillator: number;
	backgroundColor                                                = '#ffffff';
	private side                                                   = 0;

	@ViewChild('measureNumber') measureNumberEl;
	@ViewChild('metronome') metronomeEl;
	@ViewChild('indicator') indicatorEl;
	@ViewChild('click') clickEl;

	constructor(private measureService: MeasuresService)
	{
		super();
	}

	ngOnInit(): void
	{
		const subscriptions = [
			this.measureService.measures.subscribe(measures =>
												   {
													   this.measures = measures;
													   this.initCurrentTime();
												   })
		];
		this.subscriptions.push(...subscriptions);
	}

	startOscillator()
	{
		this.tick();
	}

	stopOscillator()
	{
		clearTimeout(this.oscillator);
		this.oscillator = null;
	}

	restartOscillator()
	{
		this.stopOscillator();
		this.initCurrentTime();
	}

	isFirstTick()
	{
		return this.currentTime && this.currentTime.cycle === 1 && this.measures.indexOf(this.currentTime.measure) === 0 && this.currentTime.time === 1;
	}

	private initCurrentTime()
	{
		this.currentTime = this.measures.length ? {
			cycle:   1,
			measure: this.measures[0],
			time:    1
		} : null;
	}

	private tick()
	{
		const duration                                           = 60000 / this.currentTime.measure.beat;
		this.measureNumberEl.nativeElement.style.backgroundColor = this.currentTime.measure.color;
		this.metronomeEl.nativeElement.classList.remove('is-playing-left');
		this.metronomeEl.nativeElement.classList.remove('is-playing-right');
		this.indicatorEl.nativeElement.style.animationDuration = duration + 'ms';

		if (this.side === 0)
		{
			this.metronomeEl.nativeElement.classList.add('is-playing-right');
			this.side = 1;
		}
		else
		{
			this.metronomeEl.nativeElement.classList.add('is-playing-left');
			this.side = 0;
		}

		this.clickEl.nativeElement.currentTime = 0;
		this.clickEl.nativeElement.play();

		this.oscillator = window.setTimeout(() =>
											{
												this.nextTime();
											},
											60000 / this.currentTime.measure.beat);
	}

	private nextTime()
	{
		if (this.currentTime.time === this.currentTime.measure.times)
		{
			this.currentTime.time = 1;
			this.nextMeasure();
		}
		else
		{
			this.currentTime.time++;
			this.tick();
		}
	}

	private nextMeasure()
	{
		if (this.measures.indexOf(this.currentTime.measure) === this.measures.length - 1)
		{
			this.currentTime.measure = this.measures[0];
			this.nextCycle();
		}
		else
		{
			this.currentTime.measure = this.measures[this.measures.indexOf(this.currentTime.measure) + 1];
			this.tick();
		}
	}

	private nextCycle()
	{
		this.currentTime.cycle++;
		this.tick();
	}
}
