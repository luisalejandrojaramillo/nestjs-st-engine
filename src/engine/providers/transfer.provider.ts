import {Injectable} from '@nestjs/common';
import {ITransferProvider} from '../core/provider/transfer-provider.interface.js';
import {Transfer} from '../core/entity/transfer.entity.js';

@Injectable()
export class TransferProvider implements ITransferProvider {
    create(transfer: Transfer): Transfer {
        console.log('TransferProvider: doTransfer', {
            id: transfer.id,
            amount: transfer.amount,
            currency: transfer.currency,
            description: transfer.description
        });
        return transfer;
    }
}

