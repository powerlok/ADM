import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Injectable,
  Input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormGroupDirective,
  FormArray,
} from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {
  AppontamentoProdutivo,
  Separador,
  AppontamentoProdutivoForm,
} from "../models/ApontamentoProdutivoList.models";
import { ApontamentoProdutivoService } from "./../apontamentoprodutivo.service";
import { UserService } from "../../../../shared/services/user.service";
import { DialogService } from "../../../../shared/services/dialog.service";
import { isNumber } from "util";
import { DateOracle, DateFormat } from "../../../../shared/util/date-format";
import { Observable, Subscription, forkJoin } from "rxjs";

import {
  startWith,
  map,
  switchMap,
  flatMap,
  debounceTime,
} from "rxjs/operators";
import { RequireMatch } from "../../../../shared/util/requereMatch";
import { Empresa } from "app/shared/models/Empresa";
import { CD } from "app/shared/models/CD";
import { format } from "date-fns";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-comercial-cadastro-apontamentoprodutivo-form",
  templateUrl: "apontamentoprodutivo-form.component.html",
  styleUrls: ["apontamentoprodutivo-form.component.scss"],
  providers: [],
})
export class ApontamentoProdutivoFormComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  private _router: Router;
  private _subscriptions: Array<Subscription> = [];
  cds: CD[] = [];
  empresas: Empresa[];
  options: Separador[] = [];
  filteredOptions: Observable<Separador[]>[] = [];
  title: string = "Novo";
  //nroempresaFiltro: number = 0;
  nrocdFiltro: number = 0;
  dataFiltro: string = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serviceApotamentoProdutivo: ApontamentoProdutivoService,
    private activatedRoute: ActivatedRoute,
    private user: UserService
  ) {
    this._router = router;

    this.cds = this.user.getCD();

    this.myForm = this.fb.group({
      produtivos: this.fb.array([], Validators.required),
     /* nrocarga: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
      ]),*/
      nroempresa: new FormControl("", [Validators.required]),
      nrocd: new FormControl("", [Validators.required]),
      seqapontamento: new FormControl({ value: "0", disabled: true }, [
        Validators.nullValidator,
      ]),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      //this.nroempresaFiltro = params["nroempresa"];
      this.nrocdFiltro = params["nrocd"];
      this.dataFiltro = params["data"];

      if (params["id"]) {
        this.title = "Editar";
        this.myForm.get("seqapontamento").setValue(params["id"]);
        this.getApotamentoProdutivoId(Number(params["id"]));
      }
    });
  }

  produtivos(): FormArray {
    return this.myForm.get("produtivos") as FormArray;
  }

  novoProdutivo(): FormGroup {
    return this.fb.group({
      separador: new FormControl("", [Validators.required, RequireMatch]),
      seqseparador: new FormControl({ disabled: true, value: "" }, [
        Validators.required,
        RequireMatch,
      ]),
    });
  }

  adicionarProdutivo(): void {
    this.produtivos().push(this.novoProdutivo());

    this.manageNameControl(this.produtivos().length - 1);
  }

  removeProdutivo(i: number): void {
    this.produtivos().removeAt(i);
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  manageNameControl(index: number) {
    var arrayControl = this.produtivos();
    this.filteredOptions[index] = arrayControl
      .at(index)
      .get("separador")
      .valueChanges.pipe(
        startWith<string | Separador>(""),
        map((value) => (typeof value === "string" ? value : value.SEPARADOR)),
        map((name) =>
          name ? this._filterSeparador(name) : this.options.slice()
        )
      );
  }

  private buscaProdutivo(cd: number) {
    this.serviceApotamentoProdutivo
      .getBuscaSeparador(cd)
      .subscribe((separadores: any) => (this.options = separadores));
  }

  private _filterSeparador(separador: any): Separador[] {
    const filterValue = separador.toLowerCase();
    return this.options.filter(
      (option) => option.SEPARADOR.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayObject(obj) {
    return obj ? obj.SEPARADOR : null;
  }

  onChangeEmpresas(cd): void {
    this.empresas = this.user.getEmpresaPermCD(cd);

    this.buscaProdutivo(cd);
    this.clearFormArray(this.produtivos());
  }

  private getApotamentoProdutivoId(id: number) {
    if (id > 0) {
      this._subscriptions.push(
        this.serviceApotamentoProdutivo
          .getApontamentoProdutivoId(id)
          .subscribe((apontamento: AppontamentoProdutivo) => {
            if (apontamento.SEQAPONTAMENTO > 0) {
              this.myForm.get("nrocd").setValue(Number(apontamento.NROCD));

              /*this.myForm
                .get("nrocarga")
                .setValue(Number(apontamento.NROCARGA));*/

              setTimeout(() => {
                this.onChangeEmpresas(Number(this.nrocdFiltro));
                this.myForm
                  .get("nroempresa")
                  .setValue(Number(apontamento.NROEMPRESA));
              }, 300);

              //this.myForm.get("nrocarga").disable();
              this.myForm.get("nroempresa").disable();
              this.myForm.get("nrocd").disable();

              setTimeout(() => {
                this.getApotamentoProdutivoSetId(id);
              }, 500);
            }
          })
      );
    }
  }

  separadores(index: number, campo: string, value: Separador) {
    this.produtivos().at(index).get(campo).setValue(value);
  }

  private getApotamentoProdutivoSetId(id) {
    this.serviceApotamentoProdutivo
      .getApontamentoProdutivoSeparadorId(id)
      .subscribe((separadores: Separador[]) => {
        separadores.map((x: Separador, index: number) => {
          this.adicionarProdutivo();

          this.separadores(index, "separador", x);
        });
      });
  }

  voltar() {
    this._router.navigate([
      "/admin/comercial/apontamento produtivo/lista/",
     // this.nroempresaFiltro,
      this.nrocdFiltro,
      this.dataFiltro,
    ]);
  }

  submit() {
    if (this.myForm.valid) {
      this.salvar();
    }
  }

  salvar() {
    let apontamento = new AppontamentoProdutivoForm();
    apontamento.NROEMPRESA = this.myForm.get("nroempresa").value;
    //apontamento.NROCARGA = this.myForm.get("nrocarga").value;
    apontamento.NROCD = this.myForm.get("nrocd").value;
    apontamento.SEQAPONTAMENTO = this.myForm.get("seqapontamento").value;
    apontamento.PRODUTIVOS = this.myForm.get("produtivos").value;

    this._subscriptions.push(
      this.serviceApotamentoProdutivo
        .salvar(apontamento)
        .subscribe((retorno: boolean) => {
          if (retorno) {

            this._router.navigate([
              "/admin/comercial/apontamento produtivo/lista/",
              //this.myForm.get("nroempresa").value,
              this.myForm.get("nrocd").value,
              this.dataFiltro,
            ]);
            /* if (apontamento.SEQAPONTAMENTO) {
              this._router.navigate([
                "/admin/comercial/apontamento produtivo/lista/",
                this.nroempresaFiltro,
                this.nrocdFiltro,
                this.dataFiltro,
              ]);
            } else {


              // this.myForm.get("nrocd").setValue(null);
              // this.myForm.get("nroempresa").setValue(null);
              // this.myForm.get("nrocarga").setValue(null);

              */ // this.clearFormArray(this.produtivos());
            //  }
          }
        })
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this._subscriptions.forEach((x) => {
      x.unsubscribe();
    });
  }
}
