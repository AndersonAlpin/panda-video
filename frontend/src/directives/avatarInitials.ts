import type { DirectiveBinding } from 'vue';

const avatarInitials = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    console.log(binding);
    const fullName = binding.value || '';
    const nameParts = fullName.split(' ');
    const initials = nameParts.slice(0, 2)
      .map((part: string) => part.charAt(0).toUpperCase())
      .join('');

    el.textContent = initials.length > 2 ? initials.slice(0, 2) : initials;
  }
};

export default avatarInitials;
