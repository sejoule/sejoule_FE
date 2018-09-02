import { Action } from '@ngrx/store';

// Alerts
export const ALERT = 'AlertAction';

export class AlertAction implements Action {
  readonly type: any = ALERT;
  constructor(public payload: {message: string}) {}
}

export type ALERT_ACTIONS =
  | AlertAction;
