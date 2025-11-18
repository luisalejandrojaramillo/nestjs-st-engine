import { Injectable } from "@nestjs/common";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";
import {AbstractConditionHandler} from "../../handler/abstract-condition-handler";
import {Transfer} from "../../../domain/entity/transfer.entity";
import { InvalidTransactionException } from "../../exceptions/invalid-transaction.exception";

@Injectable()
export class ConfirmTransactionUseCaseEvent extends AbstractConditionHandler {
    constructor() {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        console.log('UseCase Event: confirm transaction called');
        if (event.transaction instanceof Transfer) {
            const amount = event.transaction.requestAmount;
            console.log('UseCase Event: confirm transaction amount => value=%s currency=%s', amount.value, amount.currency);
            event.transaction.completeTransaction();
        } else {
            console.log('UseCase Event: confirm transaction - transaction is not a Transfer');
            throw new InvalidTransactionException('Expected Transfer instance during confirmation step');
        }
        return super.handle(event);
    }
}