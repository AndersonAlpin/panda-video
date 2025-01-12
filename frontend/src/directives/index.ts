import type { App } from 'vue';
import avatarInitials from './avatarInitials';

const directives = {
  'avatar-initials': avatarInitials
};

export default {
  install(app: App) {
    for (const [name, directive] of Object.entries(directives)) {
      app.directive(name, directive);
    }
  }
};