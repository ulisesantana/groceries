import { CypressSherpa } from "./CypressSherpa";

export class CypressHelper {
  protected readonly sherpa: CypressSherpa;
  constructor(
    protected readonly cy: Cypress.cy & CyEventEmitter,
    baseUrl: string
  ) {
    this.sherpa = new CypressSherpa(cy, baseUrl);
  }
}
