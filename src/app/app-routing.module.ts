import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path:         'metronome',
		loadChildren: () => import('./metronome/metronome.module').then(m => m.MetronomeModule)
	},
	{
		path:       '',
		redirectTo: 'metronome',
		pathMatch:  'full'
	}
];

@NgModule({
			  imports: [RouterModule.forRoot(routes)],
			  exports: [RouterModule]
		  })
export class AppRoutingModule
{
}
