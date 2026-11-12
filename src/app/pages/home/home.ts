import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme';
import { Button } from '../../components/button/button';
import { FeatureCard } from '../../components/feature-card/feature-card';
import { ScreenshotShowcase } from '../../components/screenshot-showcase/screenshot-showcase';
import { EditorStudioPreview } from '../../components/editor-studio-preview/editor-studio-preview';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, FeatureCard, ScreenshotShowcase, EditorStudioPreview],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public themeService = inject(ThemeService);
}
