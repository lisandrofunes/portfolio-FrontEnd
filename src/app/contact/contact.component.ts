import { Component, OnInit } from '@angular/core';
import { Email } from '../models/email';
import { EmailSenderService } from '../Service/email-sender.service';
import Swal from 'sweetalert2';
import {NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  nombre!:string;
  email!:string;
  subject!:string;
  text!:string;

  constructor(
    private emailSender: EmailSenderService,
    private ngxService: NgxUiLoaderService
  ) { }

  
  ngOnInit(): void {
  }

  sendEmail(){
    const newEmail = new Email(this.nombre, this.email, this.subject, this.text);
    this.ngxService.start();
    this.emailSender.sendEmail(newEmail).subscribe(
      data => {
        this.ngxService.stop(),
        Swal.fire({
          title: 'Mensaje enviado correctamente',
          icon: 'success',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
      },
      err =>{
        this.ngxService.stop(),
        Swal.fire({
          title: 'Error al enviar el mensaje',
          icon: 'error',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
      }
    );
  }

}
