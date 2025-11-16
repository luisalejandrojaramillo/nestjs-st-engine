import {Controller, Get} from '@nestjs/common';
import {DoTransferUseCase} from '../application/core/use-cases/do-transfer.usecase';
import {DoTransferDto} from './dto/do-transfer.dto';
import {TransferStarter} from '../application/domain/model/starter/transfer-starter.model';
import {Transfer} from '../application/domain/entity/transfer.entity';

@Controller()
export class AppController {
    constructor(private readonly doTransferUseCase: DoTransferUseCase) {
    }

    @Get()
    doTransfer(): Transfer {
        const dto = new DoTransferDto(100.50, 'COP', 'Test transfer', 'CO', new Map());

        const starter = new TransferStarter(
            dto.amount,
            dto.currency,
            dto.description,
            dto.country,
            dto.additionalData
        );

        console.log('AppController: doTransfer called');
        return this.doTransferUseCase.execute(starter);
    }
}
