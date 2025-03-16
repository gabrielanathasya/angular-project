import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailPageComponent } from './user-detail-page.component';
import { UserFacade } from '../../facades/user.facade';
import {
  ActivatedRoute,
  convertToParamMap,
  ParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  createMockRouter,
  createMockUserFacade,
  mockSingleUser,
} from '../../../../mocks';
import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserDetailPageComponent', () => {
  let component: UserDetailPageComponent;
  let fixture: ComponentFixture<UserDetailPageComponent>;
  let mockUserFacade: jasmine.SpyObj<UserFacade>;
  let mockRouter: jasmine.SpyObj<Router>;

  let paramMapSubject: Subject<ParamMap>;

  beforeEach(async () => {
    mockUserFacade = createMockUserFacade();
    mockRouter = createMockRouter();
    paramMapSubject = new Subject<ParamMap>();

    await TestBed.configureTestingModule({
      imports: [
        UserDetailPageComponent,
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        LoadingComponent,
        EmptyStateComponent,
        ErrorStateComponent,
        ButtonComponent,
      ],
      providers: [
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
            params: of({ id: '1' }),
          },
        },
      ],
    }).compileComponents();

    mockUserFacade.loadUserById.calls.reset();

    fixture = TestBed.createComponent(UserDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user details on init', () => {
    expect(mockUserFacade.loadUserById).toHaveBeenCalledWith(1);
  });

  it('should display user name and username in header', () => {
    const nameElement = fixture.debugElement.query(
      By.css('#name')
    ).nativeElement;
    const usernameElement = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;

    expect(nameElement.textContent).toContain(mockSingleUser.name);
    expect(usernameElement.textContent).toContain(mockSingleUser.username);
  });

  it('should display user contact information', () => {
    const emailElement = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const phoneElement = fixture.debugElement.query(
      By.css('#phone')
    ).nativeElement;
    const websiteElement = fixture.debugElement.query(
      By.css('#website')
    ).nativeElement;

    expect(emailElement.textContent).toContain(mockSingleUser.email);
    expect(phoneElement.textContent).toContain(mockSingleUser.phone);
    expect(websiteElement.textContent).toContain(mockSingleUser.website);
  });

  it('should display company information', () => {
    const companyNameElement = fixture.debugElement.query(
      By.css('#company-name')
    ).nativeElement;
    const companyCatchPhraseElement = fixture.debugElement.query(
      By.css('#company-catchphrase')
    ).nativeElement;
    const companyBsElement = fixture.debugElement.query(
      By.css('#company-bs')
    ).nativeElement;

    expect(companyNameElement.textContent.trim()).toContain(
      mockSingleUser.company.name
    );
    expect(companyCatchPhraseElement.textContent).toContain(
      mockSingleUser.company.catchPhrase
    );
    expect(companyBsElement.textContent.trim()).toContain(
      mockSingleUser.company.bs
    );
  });

  it('should display address information', () => {
    const streetElement = fixture.debugElement.query(
      By.css('#street')
    ).nativeElement;
    const suiteElement = fixture.debugElement.query(
      By.css('#suite')
    ).nativeElement;
    const cityElement = fixture.debugElement.query(
      By.css('#city')
    ).nativeElement;
    const zipcodeElement = fixture.debugElement.query(
      By.css('#zipcode')
    ).nativeElement;
    const geoElement = fixture.debugElement.query(
      By.css('#geolocation')
    ).nativeElement;

    expect(streetElement.textContent.trim()).toContain(
      mockSingleUser.address.street
    );
    expect(suiteElement.textContent.trim()).toContain(
      mockSingleUser.address.suite
    );
    expect(cityElement.textContent.trim()).toContain(
      mockSingleUser.address.city
    );
    expect(zipcodeElement.textContent.trim()).toContain(
      mockSingleUser.address.zipcode
    );

    expect(geoElement.textContent).toContain(mockSingleUser.address.geo.lat);
    expect(geoElement.textContent).toContain(mockSingleUser.address.geo.lng);
  });

  it('should show loading state when loading', () => {
    (mockUserFacade.loading as any).set(true);
    (mockUserFacade.selectedUser as any).set(null);
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('app-loading'));
    const detailHeaderElement = fixture.debugElement.query(
      By.css('#detail-header')
    );

    expect(loadingElement).toBeTruthy();
    expect(detailHeaderElement).toBeFalsy();
  });

  it('should show error state when error occurs', () => {
    (mockUserFacade.error as any).set('Failed to load user');
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('app-error-state'));
    const detailHeaderElement = fixture.debugElement.query(
      By.css('#detail-header')
    );

    expect(errorElement).toBeTruthy();
    expect(detailHeaderElement).toBeFalsy();
  });

  it('should show empty state when user not found', () => {
    (mockUserFacade.selectedUser as any).set(null);
    (mockUserFacade.loading as any).set(false);
    fixture.detectChanges();

    const emptyStateElement = fixture.debugElement.query(
      By.css('app-empty-state')
    );
    const detailHeaderElement = fixture.debugElement.query(
      By.css('#detail-header')
    );

    expect(emptyStateElement).toBeTruthy();
    expect(detailHeaderElement).toBeFalsy();
  });

  //
  it('should open website in new tab when website link is clicked', () => {
    spyOn(window, 'open');

    const websiteLink = fixture.debugElement.query(By.css('#website'));
    websiteLink.triggerEventHandler('click', null);

    expect(window.open).toHaveBeenCalledWith(
      `https://${mockSingleUser.website}`,
      '_blank'
    );
  });

  it('should click the back button and navigate to users list', () => {
    const backButton = fixture.debugElement.query(By.css('#back-button'));
    backButton.triggerEventHandler('click', null);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should click the Google Maps button and open maps', () => {
    spyOn(window, 'open');

    const mapsButton = fixture.debugElement.query(By.css('#view-map-button'));
    mapsButton.triggerEventHandler('click', null);

    const expectedUrl = `https://maps.google.com/?q=${mockSingleUser.address.geo.lat},${mockSingleUser.address.geo.lng}`;
    expect(window.open).toHaveBeenCalledWith(expectedUrl, '_blank');
  });
});
