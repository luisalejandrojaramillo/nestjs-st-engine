import { Injectable } from "@nestjs/common";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";
import {AbstractConditionHandler} from "../../handler/abstract-condition-handler";

@Injectable()
export class DoPostProcessUseCaseEvent extends AbstractConditionHandler {
    constructor() {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        console.log('UseCase Event: do post-process called');
        return super.handle(event);
    }
}