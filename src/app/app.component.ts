import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { DarkmodeService } from './services/darkmode.service';
import { FooterComponent } from "./footer/footer.component";
import * as AOS from "aos";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'password-manager';

  constructor(public DarkmodeService: DarkmodeService) {}

  ngOnInit(): void {
    AOS.init()
  }
}
