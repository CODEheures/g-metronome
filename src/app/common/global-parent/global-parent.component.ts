import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs';

@Component({ template: '' })
export class GlobalParentComponent
	implements OnInit, OnDestroy
{

	protected subscriptions: Subscription[] = [];

	constructor()
	{
	}

	ngOnInit(): void
	{
	}

	public ngOnDestroy(): void
	{
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

}
