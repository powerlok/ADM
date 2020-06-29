import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NotificationService } from '../../../../shared/services/notification.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    protected injector: Injector,
    private spinner: SpinnerVisibilityService
  ) {
   // this.spinner.hide(); 
  }

  handleError(error: Error | HttpErrorResponse) {    
    this.spinner.hide();
    const notificationService = this.injector.get(NotificationService);
    const router = this.injector.get(Router);
    
    if (error instanceof HttpErrorResponse) {
    
    // Server error happened      
      if (!navigator.onLine) {
        // No Internet connection
        return notificationService.notify('NET');
      }
      
      if(error.status == 0){
        return notificationService.notify('Falha de comunicação com a API. Motivo: Sem conexão com a internet e/ou erro de resposta do serviço principal. Tente novamente mais tarde ou entre em contato com o administrador do sistema.');
      } else if(error.status == 400){
        return notificationService.notify('O pedido não pôde ser entregue devido à sintaxe incorreta. Tente novamente mais tarde ou entre em contato com o administrador do sistema.');
      } else if(error.status == 404){
        return notificationService.notify('O recurso requisitado não foi encontrado, mas pode ser disponibilizado novamente no futuro. Tente novamente mais tarde ou entre em contato com o administrador do sistema.');
      } else if(error.status == 500){
        return notificationService.notify('Erro do servidor ao processar a solicitação. Tente novamente mais tarde ou entre em contato com o administrador do sistema.');
      }else if(error.status == 502){
          return notificationService.notify('Um servidor de rede está agindo como um gateway ou proxy para cumprir o pedido de um cliente para acesso à URL solicitada. Tente limpar o chache do browser e tente novamente ou se caso ainda esteja com o problema, entre em contato com o administrador de rede.');
      } else {
        return notificationService.notify(`${error.status} - ${error.message}`);
      }

    } else { 
         //console.error(error);

         return notificationService.notify(error.message);
       // return notificationService.notify("Ocorreu um erro ao tentar carregar as informações da tela. Entre em contato com o administrador do sistema.");
        //router.navigate(['/admin/error'], { queryParams: { error: error.message  } });
    }
    // Log the error anyway  
    //console.error('It happens: ', error);  
  }
 
}

