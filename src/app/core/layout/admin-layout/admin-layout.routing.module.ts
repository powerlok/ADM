import { AdminLayoutComponent } from './admin-layout.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [
    {
        path: '', component: AdminLayoutComponent, children: [
            { path: '', loadChildren: () => import('../../../../app/areas/home/home.module').then(m => m.HomeModule),  pathMatch: 'full' },
            { path: "home",  loadChildren: () => import('../../../../app/areas/home/home.module').then(m => m.HomeModule) },
            {
                path: "cadastro",
                children:  [
                    { path: "associa gerente", loadChildren: () => import('../../../../app/areas/cadastro/assocgerente/assocgerente.module').then(m => m.AssocGerenteModule)  }
                ]
            },
            {
                path: "comercial",
                children:  [
                    { path: "altera preço", loadChildren: () => import('../../../../app/areas/comercial/alterapreco/alterapreco.module').then(m => m.AlteraPrecoModule)  },
                    { path: "pesquisa concorrente", loadChildren: () => import('../../../../app/areas/comercial/pesqconcorrente/pesqconcorrente.module').then(m => m.PesqConcorrenteModule)  },
                    { path: "mov estoque por lote", loadChildren: () => import('../../../../app/areas/comercial/estoqueporlote/estoqueporlote.module').then(m => m.EstoquePorLoteModule)  },

                ]
            },
            {
                path: "ti",
                children:  [
                    { path: "pesquisa chapa",  loadChildren: () => import('../../../../app/areas/ti/pesquisa/pesquisa.module').then(m => m.PesquisaModule)  },
                    { path: "telefonia", loadChildren: () => import('../../../../app/areas/ti/telefonia/telefonia.module').then(m => m.TelefoniaModule)   },
                    { path: "importação vivo", loadChildren: () => import('../../../../app/areas/ti/faturavivo/faturavivo.module').then(m => m.FaturaVivoModule)  },
                    { path: "microsoft", loadChildren: () => import('../../../../app/areas/ti/microsoft/microsoft.module').then(m => m.MicrosoftModule)   }
                ]
            },
            {
                path: "frota",
                children:  [
                    { path: "cadastro", loadChildren: () => import('../../../../app/areas/frota/cadastro/cadastro.module').then(m => m.CadastroFrotaModule)    },
                    { path: "reserva", loadChildren: () => import('../../../../app/areas/frota/reserva/reserva.module').then(m => m.ReservaFrotaModule)   },
                    { path: "lista check-in", loadChildren: () => import('../../../../app/areas/frota/listacheckin/lista-checkin.module').then(m => m.ListaCheckinFrotaModule)   },
                    { path: "gerenciar reserva", loadChildren: () => import('../../../../app/areas/frota/gerenciarreserva/gerenciarreserva.module').then(m => m.GerenciarReservaFrotaModule)   }
                ]
            },
            {
                path: "contabil",
                children:  [
                    { path: "contabilização folha", loadChildren: () => import('../../../../app/areas/contabil/folha/contabilizafolha.module').then(m => m.ContabilizaFolhaModule)  },
                    { path: "integração conv.func", loadChildren: () => import('../../../../app/areas/contabil/convenio-func/convenio-func.module').then(m => m.ConvenioFuncModule)   },
                    { path: "geração folha", loadChildren: () => import('../../../../app/areas/contabil/geracao/gerafolha.module').then(m => m.GeraFolhaModule)   },
                    { path: "valida venda pdv", loadChildren: () => import('../../../../app/areas/ti/vendapdv/vendapdv.module').then(m => m.VendaPdvModule)   },
                    { path: "importa nfse", loadChildren: () => import('../../../../app/areas/contabil/importa-nfse/importa-nfse.module').then(m => m.ImportaNfseModule)  }
                ]
            },
            {
                path: "financeiro",
                children:  [
                  { path: "importa dda itau", loadChildren: () => import('../../../../app/areas/financeiro/importa-dda-itau/importa-dda-itau.module').then(m => m.ImportaDDAItauModule)  }
                ]
            },
            {
                path: "caixaria",
                children:  [
                    { path: "cadastro", loadChildren: () => import('../../../../app/areas/caixaria/cadastro/cadastro.module').then(m => m.CadastroCaixariaModule)   },
                    { path: "entradasaída", loadChildren: () => import('../../../../app/areas/caixaria/entrada_saida/entradasaida.module').then(m => m.EntradaSaidaCaixaModule)  },
                    { path: "relatório", loadChildren: () => import('../../../../app/areas/caixaria/relatorio/relatorio.module').then(m => m.RelatorioCaixaModule)   },
                    { path: "registrodevolucaopdf", loadChildren: () => import('../../../../app/areas/caixaria/entrada_saida/pdf/registrodevolucao-pdf.module').then(m => m.RegistroDevolucaoPDFModule)  }
                ]
            },
            //{ path: "error", loadChildren: 'app/core/layout/error/error.module#ErrorModule' },
            { path: '',  loadChildren: () => import('../../../../app/core/layout/not-found/not-found.module').then(m => m.NotFoundModule)  },
            //{ path: '**', redirectTo: '/admin'}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
