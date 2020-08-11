import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  OnDestroy,
  Injectable,
} from "@angular/core";
import { AppontamentoProdutivo } from "../models/ApontamentoProdutivoList.models";
import { Parametro, DbConsultModel } from "../../../../shared/models/Service";
import { ConsultAPIService } from "../../../../shared/services/consultapi.service";
import { AppInfoService } from "../../../../shared";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { ApontamentoProdutivoService } from "./../apontamentoprodutivo.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { UserService } from "../../../../shared/services/user.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ExcelService } from "../../../../shared/util/excel-service";
import { Subscription, Observable } from "rxjs";

//import swal from 'sweetalert2';
import { map } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CD } from "../../../../shared/models/CD";
import { Empresa } from "app/shared/models/Empresa";
import { format } from "date-fns";
import { Utils } from "app/shared/util/utils";
import { DateFormat } from "app/shared/util/date-format";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-comercial-apontamentoprodutivo-lista",
  templateUrl: "apontamentoprodutivo-lista.component.html",
  styleUrls: ["apontamentoprodutivo-lista.component.scss"],
  providers: [],
})
export class ApontamentoProdutivoListaComponent implements OnInit, OnDestroy {
  _apontamentos: AppontamentoProdutivo[] = [];
  selectedAll: any;
  totalSize: number;
  cds: CD[] = [];
  empresas: Empresa[];
  form: FormGroup;
  private _subscriptions: Array<Subscription> = [];
  nroempresaFiltro: number = 0;
  nrocdFiltro: number = 0;
  dataFiltro: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private appInfo: AppInfoService,
    private user: UserService,
    private router: Router,
    private serviceApontamentoProdutivo: ApontamentoProdutivoService,
    private spinner: SpinnerVisibilityService,
    private excelService: ExcelService,
    private activatedRoute: ActivatedRoute,
    private dateFormat: DateFormat
  ) {
    this._apontamentos = new Array<AppontamentoProdutivo>();

    this.cds = this.user.getCD();

    this.form = this.fb.group({
      nrocd: new FormControl("", [Validators.required]),
     /* nroempresa: new FormControl("", [
        Validators.required , Validators.minLength(3),
      ]),*/
      data: new FormControl({ disabled: true, value: new Date() }, [
        Validators.required,
      ]),
      codigo: new FormControl("", [Validators.nullValidator]),
    });
  }

  displayedColumns = [
    "CODIGO",
    "EMPRESA",
   // "NROCARGA",
    "DTACADASTRO",
    "STATUS",
    "QTDPRODUTIVOS",
    "EDITAR",
    "DELETAR",
  ];

  dataSource = new MatTableDataSource<AppontamentoProdutivo>(
    this._apontamentos
  );

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.dataFiltro = params["data"];
      //this.nroempresaFiltro = params["nroempresa"];
      this.nrocdFiltro = params["nrocd"];

      if (
        this.dataFiltro !== undefined &&
      //  this.nroempresaFiltro > 0 &&
        this.nrocdFiltro > 0
      ) {
        // console.log(this.dateFormat.parse(this.dataFiltro), this.dataFiltro);
        this.form.get("nrocd").setValue(Number(this.nrocdFiltro));

        this.form.get("data").setValue(this.dateFormat.parse(this.dataFiltro));

       /* setTimeout(() => {
          this.onChangeEmpresas(Number(this.nrocdFiltro));
          //this.form.get("nroempresa").setValue(Number(this.nroempresaFiltro));


        }, 500);*/

        setTimeout(() => {
          this.carregaApontamentoProdutivo();
        }, 600);
      }
    });
  }

  verDetalhe(id, nroempresa, data) {
    const dtaSemHora = format(this.dateFormat.parse(data), "dd/MM/yyyy");
    let link = [
      "/admin/comercial/apontamento produtivo/editar",
      id,
      nroempresa,
      this.form.get("nrocd").value,
      dtaSemHora,
    ];
    this.router.navigate(link);
    //this._buscaChange.emit('');
  }

  deletar(id) {
    this.spinner.show();

    this._subscriptions.push(
      this.serviceApontamentoProdutivo.deletar(id).subscribe((res: string) => {
        /*this._apontamentos = this._apontamentos.filter(
          (x) => x.SEQAPONTAMENTO !== id
        );*/

        /*this.totalSize = this._apontamentos.length;
        this.dataSource = new MatTableDataSource<AppontamentoProdutivo>(
          this._apontamentos
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;*/
        this.carregaApontamentoProdutivo();
        this.spinner.hide();
      })
    );
  }

  novo() {
    let link = [
      "/admin/comercial/apontamento produtivo/novo/",
      //this.form.get("nroempresa").value,
      this.form.get("nrocd").value,
      format(this.form.get("data").value, "dd/MM/yyyy"),
    ];
    this.router.navigate(link);
    //this._buscaChange.emit('');
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

 /* onChangeEmpresas(seqempresa: number): void {
    this.empresas = this.user.getEmpresaPermCD(seqempresa);
  }*/

  limparApontamentoProdutivo() {
    this.form.get("nrocd").setValue("");
   // this.form.get("nroempresa").setValue("");
  }

  setFiltrar(data) {
    /*	if (this.form.get("demitido").value == 'N') {
		data = data.filter(x => x.SITUACAO !== 'Demitido');
	} else if (this.form.get("demitido").value === 'S') {
		data = data.filter(x => x.SITUACAO === 'Demitido');
	}

	if (this.form.get("auditoria").value == 'N') {
		data = data.filter(x => x.AUDITORIA !== 'S');
	} else if (this.form.get("auditoria").value === 'S') {
		data = data.filter(x => x.AUDITORIA === 'S');
	}

	return data;*/
  }

  carregaApontamentoProdutivo() {
    this._apontamentos = [];
    this.spinner.show();

    this._subscriptions.push(
      this.serviceApontamentoProdutivo
        .buscaApontamentoProdutivo(
          this.form.get("nrocd").value,
        //  this.form.get("nroempresa").value,
          this.form.get("data").value
        )
        .subscribe((data: AppontamentoProdutivo[]) => {
          if (data != null) {
            //console.log(data);
            this._apontamentos = data;

            this.totalSize = this._apontamentos.length;
            this.dataSource = new MatTableDataSource<AppontamentoProdutivo>(
              this._apontamentos
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.spinner.hide();
        })
    );
  }

  /*selectAll() {
	for (var i = 0; i < this.form..length; i++) {
	  this.names[i].selected = this.selectedAll;
	}
  }
checkIfAllSelected() {
	this.selectedAll = this.names.every(function(item:any) {
	return item.selected == true;
	})
}*/

  exportParaExcel(event) {
    if (this._apontamentos.length > 0) {
      this.excelService.exportAsExcelFile(
        this._apontamentos,
        "ListaApontamentoProdutivoOba"
      );
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this._subscriptions.forEach((x) => {
      x.unsubscribe();
    });
  }
}
