import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NgFor } from '@angular/common';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [RouterLink, TopBarComponent, NgFor],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss',
})
export class TermsConditionsComponent implements OnInit {
  termsAndConditions = [
    {
      id: 1,
      title: 'Aceptación de los Términos',
      description:
        'Al acceder y utilizar nuestra aplicación aceptas cumplir y estar sujeto a estos Términos y Condiciones Generales . Si no estás de acuerdo con estos Términos, no utilices la Aplicación.',
    },

    {
      id: 2,
      title: 'Modificaciones a los Términos',
      description:
        'Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones serán efectivas en el momento en que se publiquen en la Aplicación. Es tu responsabilidad revisar regularmente los Términos para estar informado de cualquier cambio.',
    },
    {
      id: 3,
      title: 'Registro de Usuario',
      description:
        'Para acceder a ciertas funciones de la Aplicación, es posible que debas crear una cuenta y proporcionar información personal. Eres responsable de mantener la confidencialidad de tu información de cuenta y contraseña, y de todas las actividades realizadas bajo tu cuenta. Debes notificarnos inmediatamente de cualquier uso no autorizado de tu cuenta.',
    },
    {
      id: 4,
      title: 'Propiedad Intelectual',
      description:
        'Todos los derechos de propiedad intelectual relacionados con la Aplicación, incluyendo pero no limitándose a derechos de autor, marcas comerciales y patentes, son propiedad de Foodie o sus licenciantes. Nada en estos Términos te concede ningún derecho sobre dichos derechos de propiedad intelectual.',
    },
  ];

  constructor(private topbarConfigService: TopbarConfigurationService) {}

  ngOnInit(): void {
    this.topbarConfigService.changeTitle('Términos y condiciones');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(true);
  }
}
