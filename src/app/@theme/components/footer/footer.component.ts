import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <a target="_blank"  href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile">HE </a>&<a target="_blank"  href="https://www.linkedin.com/in/mehdi-hantous-549b5415a/?originalSubdomain=tn"> MH</a> 2020
    </span>
    <!--
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
    -->
  `,
})
export class FooterComponent {
}
