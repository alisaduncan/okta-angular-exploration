import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { filter, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { OktaAuthStateOrigService, Groups } from './auth-state.orig.service';

@Directive({ selector: '[oktaHasAnyGroup]'})
export class OktaHasAnyGroupDirective implements OnInit, OnChanges, OnDestroy {

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authStateService: OktaAuthStateOrigService
  ) { }

  private groupsSub$: Subject<Groups> = new ReplaySubject<Groups>();
  private destroySub$ = new Subject<void>();
  
  @Input() oktaHasAnyGroup!: Groups;

  ngOnInit(): void {
    this.groupsSub$.pipe(
      filter(groups => !!groups),
      switchMap(groups => this.authStateService.hasAnyGroups(groups)),
      takeUntil(this.destroySub$)
    ).subscribe(isAuthorized => {
      this.viewContainer.clear();
      if (isAuthorized) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['oktaHasAnyGroup'].currentValue !== changes['oktaHasAnyGroup'].previousValue) {
      this.groupsSub$.next(changes['oktaHasAnyGroup'].currentValue as Groups);
    }
  }

  ngOnDestroy(): void {
    this.destroySub$.next();
    this.destroySub$.complete();
  }
}
