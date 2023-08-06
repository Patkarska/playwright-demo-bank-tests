import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenuComponent = new SideMenuComponent(this.page);

  receiverIdInput = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  quickPaymentButton = this.page.getByRole('button', { name: 'wykonaj' });
  successfulPayment = this.page.locator('#show_messages');
  closeButton = this.page.getByTestId('close-button');

  receiverNumberInput = this.page.locator('#widget_1_topup_receiver');
  topUpAmountInput = this.page.locator('#widget_1_topup_amount');
  topUpCheckbox = this.page.getByText(
    'zapoznałem się z regulaminem i akceptuję warunki',
  );
  topUpPaymentButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
}
