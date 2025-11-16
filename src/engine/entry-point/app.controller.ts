import {Controller, Get} from '@nestjs/common';
import {DoTransferUseCase} from '../core/use-cases/do-transfer.usecase.js';
import {DoTransferDto} from './do-transfer.dto.js';
import {TransferStarter} from '../core/model/transfer-starter.model.js';
import {Transfer} from '../core/entity/transfer.entity.js';

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
