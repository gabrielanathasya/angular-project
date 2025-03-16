import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { UserListPageComponent } from './user-list-page.component';
import {
  createMockRouter,
  createMockUserFacade,
  mockUsers,
} from '../../../../mocks';
import { BehaviorSubject, of } from 'rxjs';
import {
  ActivatedRoute,
  convertToParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { UserFacade } from '../../facades/user.facade';
import { By } from '@angular/platform-browser';

describe('UserListPageComponent', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;
  let mockUserFacade: jasmine.SpyObj<UserFacade>;
  let mockRouter: jasmine.SpyObj<Router>;

  const queryParamMap = new BehaviorSubject(convertToParamMap({}));

  beforeEach(async () => {
    mockUserFacade = createMockUserFacade();
    mockRouter = createMockRouter();

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        LoadingComponent,
        EmptyStateComponent,
        ErrorStateComponent,
        ButtonComponent,
        UserListPageComponent,
      ],
      providers: [
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ search: '' }),
            snapshot: {
              queryParams: {},
            },
            queryParamMap: queryParamMap.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(mockUserFacade.loadUsers).toHaveBeenCalled();
  });

  it('should setup search filter on init', () => {
    expect(mockUserFacade.setupSearchFilter).toHaveBeenCalled();
  });

  it('should display users in the table', () => {
    const tableRows = fixture.nativeElement.querySelectorAll(
      'table tr.mat-mdc-row'
    );
    expect(tableRows.length).toBe(mockUsers.length);

    const firstRowCells = tableRows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain(mockUsers[0].name);
    expect(firstRowCells[1].textContent).toContain(mockUsers[0].email);
  });

  it('should show loading state when loading', () => {
    (mockUserFacade.loading as any).set(true);
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('app-loading');
    const tableElement = fixture.nativeElement.querySelector('table');

    expect(loadingElement).toBeTruthy();
    expect(tableElement).toBeFalsy();
  });

  it('should show error state when error occurs', () => {
    (mockUserFacade.error as any).set('Failed to load users');
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('app-error-state');
    const tableElement = fixture.nativeElement.querySelector('table');

    expect(errorElement).toBeTruthy();
    expect(tableElement).toBeFalsy();
  });

  it('should show empty state when no users found', () => {
    (mockUserFacade.filteredUsers as any).set([]);
    fixture.detectChanges();

    const emptyStateElement =
      fixture.nativeElement.querySelector('app-empty-state');
    const tableElement = fixture.nativeElement.querySelector('table');

    expect(emptyStateElement).toBeTruthy();
    expect(tableElement).toBeFalsy();
  });

  it('should navigate to user details when eye icon is clicked on desktop', () => {
    const eyeIconButton = fixture.debugElement
      .query(By.css('button mat-icon'))
      .nativeElement.closest('button');
    eyeIconButton.click();
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/users',
      mockUsers[0].id,
    ]);
  });

  it('should navigate to user details when View button is clicked on mobile', () => {
    const viewButton = fixture.debugElement.query(
      By.css('app-button')
    ).nativeElement;
    viewButton.click();
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/users',
      mockUsers[0].id,
    ]);
  });

  it('should update search term and navigate when search input changes', fakeAsync(() => {
    const searchTerm = 'test';
    component.searchControl.setValue(searchTerm);
    tick(500);

    expect(mockUserFacade.setSearchTerm).toHaveBeenCalledWith(searchTerm);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      relativeTo: jasmine.any(Object),
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }));

  it('should open website in new tab when website link is clicked', () => {
    spyOn(window, 'open');
    const event = new MouseEvent('click');

    component.openWebsite(mockUsers[0].website, event);

    expect(window.open).toHaveBeenCalledWith(
      `https://${mockUsers[0].website}`,
      '_blank'
    );
  });

  it('should initialize search control with URL parameter', () => {
    component.route.snapshot.queryParams = { search: 'johndoe' };

    component.ngOnInit();

    expect(component.searchControl.value).toBe('johndoe');
    expect(mockUserFacade.setSearchTerm).toHaveBeenCalledWith('johndoe');
  });
});
