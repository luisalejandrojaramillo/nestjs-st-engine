# Engine V1 – Transactional Engine POC

## Overview
Engine V1 is a Proof of Concept (POC) for a lightweight transactional engine built with NestJS. It applies the Chain of Responsibility pattern to orchestrate sequential business events over a transaction lifecycle in a clean, extensible manner.

## Purpose
Demonstrate a pluggable event pipeline where each step (validation, creation, pricing calculation, confirmation, post-processing) is isolated as a handler. New steps can be added without modifying existing ones, embracing the Open/Closed Principle.

## Chain of Responsibility Flow
Current processing chain (in order):
1. ValidateTransactionUseCaseEvent
2. CreateTransactionUseCaseEvent
3. CalculatePricingUseCaseEvent
4. ConfirmTransactionUseCaseEvent
5. DoPostProcessUseCaseEvent

Each handler extends `AbstractConditionHandler`, gaining `setNext()` and `handle()` to forward execution to the next element.

```ts
validateHandler
  .setNext(createHandler)
  .setNext(pricingHandler)
  .setNext(confirmHandler)
  .setNext(postProcessHandler);

const eventInput = { transaction: transfer }; // transfer extends Transaction
const success = validateHandler.handle(eventInput);
if (!success) throw new Error('Chain aborted');
```

If any handler returns `false` (e.g. validation failure), the chain stops immediately.

## Architecture Layout
```
src/engine/application/
  core/
    use-cases/
      events/              # Chain handlers (use case events)
    handler/               # Chain infrastructure (interface + abstract base)
  domain/
    entity/                # Transaction, Transfer
    model/                 # ITransactionEventInput<T extends Transaction>
```

## Core Domain Elements
- Transaction: Base entity (description, country, commission tracking)
- Transfer: Extends Transaction adding amount (value object) + extra metadata
- ITransactionEventInput<T>: Generic envelope passed through the chain
- AbstractConditionHandler: Base class supporting chaining

## How Execution Works
The `DoTransferUseCase.execute()` method:
1. Builds a `Transfer` instance from starter input
2. Wires the chain (validate → create → pricing → confirm → post-process)
3. Passes the `Transfer` wrapped in `ITransactionEventInput<Transfer>`
4. Throws if chain halts prematurely
5. Returns the enriched `Transfer` instance

## Technology Stack
- NestJS (framework)
- TypeScript
- RxJS (reactive utilities)
- Jest (testing)
- ESLint + Prettier (code quality & formatting)

## Installation & Quick Start
```bash
npm install
npm run start:dev
```
Default sample endpoint: `GET /` in `AppController`.

## NPM Scripts
```bash
npm run build       # Compile to dist/
npm run start       # Production start
npm run start:dev   # Watch mode
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run lint        # Lint + autofix
```

## Extending the Chain
To add a new step:
1. Create a new handler class extending `AbstractConditionHandler`
2. Implement `handle(event: ITransactionEventInput<MyType>): boolean`
3. Insert it in wiring order using `setNext()` inside the orchestrating use case
4. Return `false` to abort; return `super.handle(event)` to continue

## Future Improvements
- Dynamic chain assembly from configuration
- Auditing & event persistence
- Metrics / tracing per handler
- Error classification & recovery strategies
- Rule engine integration (e.g. JSON-based policies)

## Author
!Luis Alejandro Jaramillo[luisalejandrojaramillo@hotmail.com](https://luisalejandrojaramillo.com)

## License
