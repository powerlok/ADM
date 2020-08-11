import { Routes, RouterModule } from '@angular/router';
import { ApontamentoProdutivoListaComponent } from './apontamentoprodutivo-lista.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ApontamentoProdutivoListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApontamentoProdutivoListaRoutingModule { }
