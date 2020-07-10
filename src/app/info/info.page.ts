import { Component, OnInit } from '@angular/core';
import anime from '../../js/anime.min';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    anime.timeline({loop: true})
    .add({
      targets: '.ml2 .letter',
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 950,
      delay: (el, i) => 70 * i
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 1000
    });
  }

  logOut() {
    this.auth.logOut();
  }
}
