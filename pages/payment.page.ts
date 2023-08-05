import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}
  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferAccountInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  paymentButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });

  closeButton = this.page.getByTestId('close-button');
  successfulPayment = this.page.locator('#show_messages');
}
