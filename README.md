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
    exceptions/            # Core domain/application exceptions
  domain/
    entity/                # Transaction, Transfer
    model/                 # ITransactionEventInput<T extends Transaction>
    value-objects/         # Amount, TransactionWorkflowStatus
```

## Core Domain Elements
- Transaction: Base entity (description, country, commission tracking, workflow status)
- Transfer: Extends Transaction adding amount (value object) + extra metadata
- ITransactionEventInput<T>: Generic envelope passed through the chain
- TransactionWorkflowStatus: Enum representing lifecycle stages
- AbstractConditionHandler: Base class supporting chaining
- InvalidTransactionException: Custom error for invalid transaction context

## Workflow Status Lifecycle
`TransactionWorkflowStatus` enum defines the progression of a transaction:

| Status | Meaning |
|--------|---------|
| CREATED | Initial state after constructing the Transaction/Transfer instance |
| VALIDATED | Set when validation passes (future handler enhancement) |
| PRICED | Set after pricing calculation assigns commission |
| CONFIRMED | Set when confirmation logic succeeds (future enhancement) |
| COMPLETED | Final successful state (set in confirmation step for now) |
| REJECTED | Failure due to domain rule violation or invalid context |
| FAILED | Reserved for unhandled errors or downstream failures |

Current implementation sets initial status to `CREATED` in the constructor and updates to `PRICED` inside pricing handler (`addPricing()`), and to `COMPLETED` in the confirmation handler. Future improvement: explicitly update `VALIDATED`, `CONFIRMED` statuses in their respective handlers for richer lifecycle tracking.

## Domain Exceptions
Custom exceptions live under `core/exceptions/`. Example: `InvalidTransactionException` signals an unexpected context in the chain (e.g. confirmation step received a non-`Transfer` instance).

```ts
export class InvalidTransactionException extends Error {
  constructor(message: string = 'Invalid transaction') {
    super(message);
    this.name = 'InvalidTransactionException';
  }
}
```

Usage inside a handler:
```ts
if (!(event.transaction instanceof Transfer)) {
  throw new InvalidTransactionException('Expected Transfer instance during confirmation step');
}
```

Guidelines:
- Prefer specific exception classes over generic `Error` for domain clarity.
- Include a stable `name` property for logging/monitoring filters.
- Throw early; avoid mutating state before validation.
- Optionally add a `code` field if integrating with error mapping layers.

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
5. Update `workflowStatus` where appropriate for lifecycle visibility

## Future Improvements
- Explicit status transitions in each handler
- Dynamic chain assembly from configuration
- Auditing & event persistence
- Metrics / tracing per handler
- Error classification & recovery strategies
- Rule engine integration (e.g. JSON-based policies)

## Author
[Luis Alejandro Jaramillo](mailto:luisalejandrojaramillo@hotmail.com)

## License
[UNLICENSED](LICENSE) – Internal POC usage only.

---
For internal extension guidelines, focus on keeping handlers stateless and idempotent. Avoid business side-effects before validation passes.
