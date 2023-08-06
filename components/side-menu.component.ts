import { Page } from '@playwright/test';

export class SideMenuComponent {
  constructor(private page: Page) {}
  sidePaymentButton = this.page.getByRole('link', { name: 'płatności' });
}
