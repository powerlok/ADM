import { Component, Output, EventEmitter, Input } from "@angular/core";
import * as XLSX from 'xlsx';
import { SpinnerVisibilityService } from "ng-http-loader";
import { FaturaVivo, Demonstrativo1, Demonstrativo2, Demonstrativo3, DemonstrativoServicos, Servicos, CelularesFatura, DetalhesNF, Impostos, Resumo, Fatura } from "../../../shared/models/FaturaVivo";
import { FaturaVivoService } from "./faturavivo.service";

@Component({
	selector: "app-ti-faturavivo",
	templateUrl: "./faturavivo.component.html",
	styleUrls: ["./faturavivo.component.scss"],
	providers: []
})
export class FaturaVivoComponent {
	file: File;
	arrayBuffer: any;
	faturavivo : FaturaVivo;
	retorno : boolean = true;
	hideElement: boolean = true;
	
	constructor(private spinner: SpinnerVisibilityService, private faturaVivoService : FaturaVivoService) {
		this.faturavivo = new FaturaVivo();
	 }


	incomingfile(event) { 		
		if (event.target.files && event.target.files[0]) {		
			this.file = event.target.files[0];
			this.Upload();
			event.target.value = '';
		}
	}

	 Upload() {
		let fileReader = new FileReader();
		this.spinner.show();
		    
			fileReader.onload = (e) => {
				this.arrayBuffer = fileReader.result;			
				let data = new Uint8Array(this.arrayBuffer);
				let arr = new Array();
				for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
				let bstr = arr.join("");
				let workbook = XLSX.read(bstr, { type: "binary" });
			    let i = 0;
				workbook.SheetNames.forEach(element => {
					let worksheet : XLSX.WorkSheet = workbook.Sheets[element];
									
				    switch(i){
						case 0: 
							  
						        let json = XLSX.utils.sheet_to_json(worksheet, { raw: true, header: ["Conta", "Centro de Custo", "Celular", "Seção da Chamada", "Mês/Ano de Referência", "Descrição da Chamada", "Data da Chamada", "Hora da Chamada", "Tipo da Chamada", "Cidade de Origem", "UF de Origem", "Cidade de Destino", "UF de Destino", "Nº Chamado", "Tarifa", "Duração", "Quantidade", "Contratados", "Utilizados", "Excedentes", "Unidade", "A transportar", "Valor"], defval: null, range:3 });
					
								this.faturavivo.demonstrativo1 				= new Array<Demonstrativo1>();
								this.faturavivo.demonstrativo1              = this.faturaVivoService.getDemo1(json);

								//json = [];

								break;
								
						case 1:
							  
								let json2 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Celular", "Seção da Chamada", "Mês/Ano de Referência", "Descrição da Chamada", "Data da Chamada", "Hora da Chamada", "Tipo da Chamada", "Cidade de Origem", "UF de Origem", "Cidade de Destino", "UF de Destino", "Nº Chamado", "Tarifa", "Duração", "Quantidade", "Contratados", "Utilizados", "Excedentes", "Unidade", "A transportar", "Valor"], defval: null, range:3 });
							
								this.faturavivo.demonstrativo2 = new Array<Demonstrativo2>();
								this.faturavivo.demonstrativo2 = this.faturaVivoService.getDemo2(json2);
					
                                //json2 = [];

								break;
						
						case 2:
						
						        let json3 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Celular", "Tipo do Serviço", "Descrição do Serviço","Mês/Ano de Referência", "Subseção do Serviço",	"Data do redébito",	"Data da chamada", "Data Inicial", "Data Final", "Tipo da chamada", "Cidade de origem", "UF de origem", "Cidade de destino", "UF de destino", "Número chamado", "Tipo da tarifa", "Duração", "Valor em reais"], defval: null, range:3 });
							
								this.faturavivo.demonstrativoServico = new Array<DemonstrativoServicos>();
								this.faturavivo.demonstrativoServico = this.faturaVivoService.getDemoServ(json3);

								//json3 = [];

								break;
					    case 3:
						
								let json4 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Tipo do Serviço", "Descrição do Serviço", "Celular", "Mês/Ano de Referência" ,"Nome do compartilhamento", "Contratados", "Utilizados", "Parcela", "Valor"], defval: null, range:3 });
							
								this.faturavivo.servicos = new Array<Servicos>();
								this.faturavivo.servicos = this.faturaVivoService.getServicos(json4);

								//json4 = [];

								break;
						
						case 4:
						
								let json5 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Número do celular", "Valor do celular", "Departamento"], defval: null, range:3 });
							
								this.faturavivo.celularesFatura = new Array<CelularesFatura>();
								this.faturavivo.celularesFatura = this.faturaVivoService.getCelularesFatura(json5);

								//json5 = [];

								break;
						
						case 5:
						
								let json6 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Operadora", "Nota Fiscal", "Sequência", "Cód. Serviço", "Seção", "Descrição", "Referência", "Quantidade", "Valor", "ICMS %", "Total da Nota Fiscal"], defval: null, range:3 });
							
								this.faturavivo.detalhesNF = new Array<DetalhesNF>();
								this.faturavivo.detalhesNF = this.faturaVivoService.getDetalhesNF(json6);
 
								//json6 = [];
								break;

						case 6:
						
								let json7 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Operadora", "Endereço 1", "Endereço 2", "CEP", "CNPJ", "Nota Fiscal", "Descrição do Imposto", "Alíquota", "Base de Cálculo do Imposto", "Valor do Imposto", "Valor da Nota Fiscal", "Não Tributável"], defval: null, range:3 });
							
								this.faturavivo.impostos = new Array<Impostos>();
								this.faturavivo.impostos = this.faturaVivoService.getImpostos(json7); 
							
								//json6 = [];
								break;
						
						case 7:
						
								let json8 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Descrição do Serviço", "Valor do Serviço"], defval: null, range:3 });
							
								this.faturavivo.resumo = new Array<Resumo>();
								this.faturavivo.resumo = this.faturaVivoService.getResumo(json8); 

								//json8 = [];
								break;
						
						case 8:
						
								let json9 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["CONTA", "CENTRO DE CUSTO", "DESCRIÇÃO", "VALOR DA DESPESA"], defval: null, range:3 });
							
								this.faturavivo.fatura = new Array<Fatura>();
								this.faturavivo.fatura = this.faturaVivoService.getFatura(json9);							

								//json9 = [];

								break;

						case 9:

						        let json10 = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: ["Conta", "Centro de Custo", "Celular", "Seção da Chamada", "Mês/Ano de Referência", "Descrição da Chamada", "Data da Chamada", "Hora da Chamada", "Tipo da Chamada", "Cidade de Origem", "UF de Origem", "Cidade de Destino", "UF de Destino", "Nº Chamado", "Tarifa", "Duração", "Quantidade", "Contratados", "Utilizados", "Excedentes", "Unidade", "A transportar", "Valor"], defval: null, range:3 });
								this.faturavivo.demonstrativo3 = new Array<Demonstrativo3>();
								this.faturavivo.demonstrativo3 = this.faturaVivoService.getDemo3(json10); 			
						
								//json10 = [];
				         		break;  
					}
					i++;
				});         
			}
			
			fileReader.readAsArrayBuffer(this.file);
			
			fileReader.onloadend = (e) => {
			//	console.log(this.faturavivo);
			 this.faturaVivoService.salvar(this.faturavivo);
			 this.spinner.hide();
			}
		
	}

	

}