export class DbConsultModel {
    public identificador: string = "ObaApi.Service.DbConsultService";
    public model: DbConsult;

    DbConsultModel(){
        this.model = new DbConsult();
    }
}

export class DbConsult {
    public package: string;
    public objeto: string;
    public retorno: string;
    public tiporetorno: string;
    public error: Error;
    public obj: Obj;
    public dbLink: string;
    public parameters: Array<Parametro>;

    DbConsult(){
        this.obj = new Obj();
        this.error = new Error();
    }
}


export class Parametro {
    public dbType: number;
    public nome: string;
    public valor: string | number;

}

export class Error {
    public errorMasseger: string;
    public fullName: string;

}

export class Obj {
    public json: object;
}

export class ErrorMessage {
  message: string;
  statuscode: number;
  error: string;
}
