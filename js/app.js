/**
 * App — screen navigator and dependency wiring (composition root).
 */
import { SettingsViewModel } from './viewmodel/SettingsViewModel.js';
import { HighScoreViewModel } from './viewmodel/HighScoreViewModel.js';
import { HomeScreen } from './view/HomeScreen.js';
import { GameScreen } from './view/GameScreen.js';
import { SettingsScreen } from './view/SettingsScreen.js';
import { ScoresScreen } from './view/ScoresScreen.js';
import { SummaryScreen } from './view/SummaryScreen.js';

class App {
  constructor() {
    this.settingsVM = new SettingsViewModel();
    this.scoresVM = new HighScoreViewModel();
    this.screens = {};
    this.current = null;
  }

  navigate(screenId, payload = null) {
    this.current?.root?.classList?.remove('active');
    const screen = this.screens[screenId];
    if (!screen) return;
    screen.show?.(payload);
    screen.root.classList.add('active');
    this.current = screen;
  }

  start() {
    const deps = { settingsVM: this.settingsVM, scoresVM: this.scoresVM, onNavigate: (id, p) => this.navigate(id, p) };
    this.screens = {
      'home-screen': new HomeScreen(deps),
      'game-screen': new GameScreen(deps),
      'settings-screen': new SettingsScreen(deps),
      'scores-screen': new ScoresScreen(deps),
      'summary-screen': new SummaryScreen(deps),
    };
    Object.values(this.screens).forEach((s) => (s.root.classList.contains('screen') ? null : s.root.classList.add('screen')));
    this.navigate('home-screen');
  }
}

new App().start();
