export class Measure
{
	private _beat = 75;

	get beat(): number
	{
		return this._beat;
	}

	set beat(beat)
	{
		this._beat = beat;
	}

	private _times = 16;

	get times(): number
	{
		return this._times;
	}

	set times(times)
	{
		this._times = times;
	}

	private _color = '#ff0000';

	get color(): string
	{
		return this._color;
	}

	set color(color: string)
	{
		this._color = color;
	}
}
