import {Controller, Get} from '@nestjs/common';
import {DoTransferUseCase} from '../application/core/use-cases/do-transfer.usecase.js';
import {DoTransferDto} from './dto/do-transfer.dto';
import {TransferStarter} from '../application/domain/model/starter/transfer-starter.model';
import {Transfer} from '../application/domain/entity/transfer.entity.js';

@Controller()
export class AppController {
    constructor(private readonly doTransferUseCase: DoTransferUseCase) {
    }

    @Get()
    doTransfer(): Transfer {
        // El DTO viene de la capa de entrada (HTTP)
        const dto = new DoTransferDto(100.50, 'COP', 'Test transfer', new Map());

        // Convertimos el DTO a un objeto del core (TransferStarter)
        const starter = new TransferStarter(
            dto.amount,
            dto.currency,
            dto.description,
            dto.additionalData
        );

        console.log('AppController: doTransfer called');

        // Ejecutamos el caso de uso y retornamos la entidad
        return this.doTransferUseCase.execute(starter);
    }
}
