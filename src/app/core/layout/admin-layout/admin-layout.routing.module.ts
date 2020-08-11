import { AdminLayoutComponent } from './admin-layout.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [
    {
        path: '', component: AdminLayoutComponent, children: [
            { path: '', loadChildren: 'app/areas/home/home.module#HomeModule',  pathMatch: 'full' },
            { path: "home", loadChildren: 'app/areas/home/home.module#HomeModule' },
            {
                path: "cadastro",
                children:  [
                    { path: "associa gerente", loadChildren: 'app/areas/cadastro/assocgerente/assocgerente.module#AssocGerenteModule'  }
                ]
            },
            {
                path: "comercial",
                children:  [
                    { path: "altera preço", loadChildren: 'app/areas/comercial/alterapreco/alterapreco.module#AlteraPrecoModule'  },
                    { path: "pesquisa concorrente", loadChildren: 'app/areas/comercial/pesqconcorrente/pesqconcorrente.module#PesqConcorrenteModule'  },
                    { path: "mov estoque por lote", loadChildren: 'app/areas/comercial/estoqueporlote/estoqueporlote.module#EstoquePorLoteModule'  },
                    { path: "apontamento produtivo", loadChildren: 'app/areas/comercial/apontamentoprodutivo/apontamentoprodutivo.module#ApontamentoProdutivoModule'  },
                ]
            },
            {
                path: "ti",
                children:  [
                    { path: "pesquisa chapa", loadChildren: 'app/areas/ti/pesquisa/pesquisa.module#PesquisaModule' },
                    { path: "telefonia", loadChildren: 'app/areas/ti/telefonia/telefonia.module#TelefoniaModule' },
                    { path: "importação vivo", loadChildren: 'app/areas/ti/faturavivo/faturavivo.module#FaturaVivoModule' },
                    { path: "microsoft", loadChildren: 'app/areas/ti/microsoft/microsoft.module#MicrosoftModule' }
                ]
            },
            {
                path: "frota",
                children:  [
                    { path: "cadastro", loadChildren: 'app/areas/frota/cadastro/cadastro.module#CadastroFrotaModule'  },
                    { path: "reserva", loadChildren: 'app/areas/frota/reserva/reserva.module#ReservaFrotaModule'  },
                    { path: "lista check-in", loadChildren: 'app/areas/frota/listacheckin/lista-checkin.module#ListaCheckinFrotaModule'  },
                    { path: "gerenciar reserva", loadChildren: 'app/areas/frota/gerenciarreserva/gerenciarreserva.module#GerenciarReservaFrotaModule'  }
                ]
            },
            {
                path: "contabil",
                children:  [
                    { path: "contabilização folha", loadChildren: 'app/areas/contabil/folha/contabilizafolha.module#ContabilizaFolhaModule' },
                    { path: "integração conv.func", loadChildren: 'app/areas/contabil/convenio-func/convenio-func.module#ConvenioFuncModule'  },
                    { path: "geração folha", loadChildren: 'app/areas/contabil/geracao/gerafolha.module#GeraFolhaModule'  },
                    { path: "valida venda pdv", loadChildren: 'app/areas/ti/vendapdv/vendapdv.module#VendaPdvModule' },
                    { path: "importa nfse", loadChildren: 'app/areas/contabil/importa-nfse/importa-nfse.module#ImportaNfseModule' }
                ]
            },
            {
                path: "caixaria",
                children:  [
                    { path: "cadastro", loadChildren: 'app/areas/caixaria/cadastro/cadastro.module#CadastroCaixariaModule'  },
                    { path: "entradasaída", loadChildren: 'app/areas/caixaria/entrada_saida/entradasaida.module#EntradaSaidaCaixaModule'  },
                    { path: "relatório", loadChildren: 'app/areas/caixaria/relatorio/relatorio.module#RelatorioCaixaModule'  },
                    { path: "registrodevolucaopdf", loadChildren: 'app/areas/caixaria/entrada_saida/pdf/registrodevolucao-pdf.module#RegistroDevolucaoPDFModule'  }
                ]
            },
            //{ path: "error", loadChildren: 'app/core/layout/error/error.module#ErrorModule' },
            { path: '',  loadChildren: 'app/core/layout/not-found/not-found.module#NotFoundModule' },
            //{ path: '**', redirectTo: '/admin'}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
