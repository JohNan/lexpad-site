import { Component } from '@angular/core';
import { FeatureCard } from '../../components/feature-card/feature-card';

@Component({
  selector: 'app-features',
  imports: [FeatureCard],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {}
