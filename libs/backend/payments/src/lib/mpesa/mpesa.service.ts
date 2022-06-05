import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mpesa } from './mpesa';

@Injectable()
export class MpesaService {
  private payBill: Mpesa;
  /**
   *  @param {ConfigService}
   */

  constructor(private configService: ConfigService) {
    this.payBill = new Mpesa(
      {
        clientKey: this.configService.get<string>('MPESA_PAYBILL_CLIENT_KEY'),
        clientSecret: this.configService.get<string>(
          'MPESA_PAYBILL_CLIENT_SECRET'
        ),
        initiatorPassword: this.configService.get<string>(''),
        securityCredential: this.configService.get<string>(
          'MPESA_PAYBILL_SECURITY_CREDENTIAL'
        ),
      },
      this.configService.get<'sandbox' | 'production'>(
        'MPESA_PAYBILL_ENVIRONMENT'
      )
    );
  }

  lipaNaMpesa(phone: string, amount: number) {
    phone = this.formatPhoneNumber(phone);

    return this.payBill.lipaNaMpesaOnline({
      BusinessShortCode: this.configService.get<number>(
        'MPESA_PAYBILL_SHORTCODE'
      ),
      Amount: amount,
      PartyA: phone,
      PartyB: this.configService.get<string>('MPESA_PAYBILL_SHORTCODE'),
      PhoneNumber: phone,
      CallBackURL: this.configService.get<string>('CALLBACKURL'),
      AccountReference: 'Mteja',
      passKey: this.configService.get<string>('MPESA_PAYBILL_PASSKEY'),
      TransactionType: 'CustomerPayBillOnline',
      TransactionDesc: 'Mteja Payment',
    });
  }
  /**
   *
   * @param { string } phone
   * @returns
   */
  formatPhoneNumber(phone: string) {
    if (phone.startsWith('0')) {
      phone = phone.replace('0', '254');
    } else if (phone.startsWith('+')) {
      phone = phone.substring(1);
    }

    return phone;
  }
}
