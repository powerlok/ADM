import { Routes, RouterModule } from '@angular/router';
import { ApontamentoProdutivoFormComponent } from './apontamentoprodutivo-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ApontamentoProdutivoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApontamentoProdutivoFormRoutingModule { }
