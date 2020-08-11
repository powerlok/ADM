import { Injectable, Component, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Observable, of } from 'rxjs';

@Injectable()
export class PDFService {

    constructor() { }


    criarImg(content : any) {
        
        html2canvas(content, { allowTaint: true }).then((canvas) => {      
            this.dowloadPDF(canvas.toDataURL("image/png", 1.0));     
        });
    }
   //@ViewChild('content') content: ElementRef;
 
    dowloadPDF(img : string) {
        //let doc = new jsPDF();

       /** let specialElementHandlers = {
            '#editor': function(element, renderer){
                return true;
            }
        };*/
            //canvas.width = 800;
            //canvas.height = 600;
            /*var img = canvas.toDataURL("image/png", 1.0);
            doc.addImage(img, 'JPEG', -60, 5);
            doc.autoPrint();
            //doc.output("dataurlnewwindow");
            doc.save(fileName +'.pdf');*/

            //let html : string = canvas.toDataURL("image/png", 1.0);
           // let file = new Blob([this.debugBase64(canvas.toDataURL("image/png", 1.0))], { type: 'application/pdf' });
            //let fileURL = URL.createObjectURL(file);
            //this.debugBase64(canvas.toDataURL("image/png", 1.0));
            //console.log(canvas.toDataURL("image/png", 1.0));
            var win = window.open('', '_self', 'width: 100%; height: 100%;fullscreen=yes,scrollbars=yes', true);  
            win.document.write('<html>');
            win.document.write('<head>');
            win.document.write('<style type="text/css">');
            win.document.write('html, body { width: 100%; height: 100%; margin: 0; padding: 0;}');
            win.document.write('#iframe {');
            win.document.write('width: 100%; height: 100%; border: none; margin:  0 auto;');
            win.document.write('} p a { word-wrap: break-word; } p {  widows: 3; orphans: 3; }');
            win.document.write('</style>');
            win.document.write('</head>');
            win.document.write('<body>');            
            win.document.write('<iframe id="iframe" src="' + img  + '"></iframe>');             
            win.document.write('</body>');
            win.document.write('</html>');
            setTimeout(() => {win.print(); win.close(); }, 1000);
            
            //console.log(fileURL);
            //window.open(fileURL);
            //.fromHTML("<iframe src=" + fileURL + "frameborder='0' style='border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;' allowfullscreen></iframe>", 15, 15, {
              //  'width': '660',
                //'elementHandlers': specialElementHandlers
            //},() => {
                
                //doc.addImage(canvas.toDataURL("image/png", 1.0), 'JPEG', -60, 5);
               // doc.autoPrint();
               // doc.output("dataurl");
                
              //doc.save(fileName +'.pdf');
           // });
    
        
    }

}