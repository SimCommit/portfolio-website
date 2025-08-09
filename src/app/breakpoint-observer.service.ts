import { BreakpointState, BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BreakpointObserverService {
  readonly isMobile$: Observable<boolean>;
  readonly isDesktop$: Observable<boolean>;
  private readonly MOBILE_BREAKPOINT = "(max-width: 800px)";
  private readonly DESKTOP_BREAKPOINT = "(min-width: 801px)";

  /**
   * Size of the replay buffer for breakpoint observables.
   */
  private readonly REPLAY_BUFFER_SIZE = 1;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.createBreakpointObservable(this.MOBILE_BREAKPOINT);
    this.isDesktop$ = this.createBreakpointObservable(this.DESKTOP_BREAKPOINT);
  }

  private createBreakpointObservable(breakpointQuery: string): Observable<boolean> {
    return this.breakpointObserver.observe([breakpointQuery]).pipe(
      map((state: BreakpointState) => this.extractBreakpointState(state)),
      shareReplay(this.REPLAY_BUFFER_SIZE)
    );
  }

  /**
   * Extracts the boolean state from breakpoint state object
   * @param {BreakpointState} state - Breakpoint state from observer
   * @returns {boolean} True if breakpoint matches
   */
  private extractBreakpointState(state: BreakpointState): boolean {
    return state.matches;
  }
}
