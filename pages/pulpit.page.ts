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

  async quickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.receiverIdInput.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);
    await this.quickPaymentButton.click();
    await this.closeButton.click();
  }

  async phoneTopUpPayment(
    receiverNumber: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.receiverNumberInput.selectOption(receiverNumber);
    await this.topUpAmountInput.fill(topUpAmount);
    await this.topUpCheckbox.click();
    await this.topUpPaymentButton.click();
    await this.closeButton.click();
  }
}
