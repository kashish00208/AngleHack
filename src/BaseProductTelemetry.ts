interface BaseTelemetryEvent {
  name: string;
}

export abstract class BaseProductTelemetry{
    abstract capture(event:BaseTelemetryEvent):void;
}

export class NoopTelemetry extends BaseProductTelemetry {
  capture(event: BaseTelemetryEvent): void {
  }
}



export default BaseProductTelemetry;