import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenuComponent = new SideMenuComponent(this.page);

  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferAccountInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  paymentButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });

  closeButton = this.page.getByTestId('close-button');
  successfulPayment = this.page.locator('#show_messages');

  async simplePayment(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.transferAccountInput.fill(transferAccount);
    await this.transferAmountInput.fill(transferAmount);
    await this.paymentButton.click();
    await this.closeButton.click();
  }
}
