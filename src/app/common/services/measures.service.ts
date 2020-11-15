import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Measure }         from '../models/measure';

@Injectable({ providedIn: 'root' })
export class MeasuresService
{

	private measuresSource = new BehaviorSubject<Measure[]>([]);
	measures               = this.measuresSource.asObservable();

	updateMeasures(measures: Measure[])
	{
		this.measuresSource.next([...measures]);
	}

	addMeasure(measure: Measure)
	{
		this.measuresSource.next([
									 ...this.measuresSource.value,
									 measure
								 ]);
	}

	removeMeasure(measure: Measure)
	{
		const measures = this.measuresSource.value;
		measures.splice(measures.findIndex(finded => finded === measure),
						1);
		this.measuresSource.next(measures);
	}
}
