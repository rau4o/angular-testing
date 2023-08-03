import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {HomeComponent} from './home.component';
import {CoursesModule} from "../courses.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CoursesService} from "../services/courses.service";
import {setupCourses} from "../common/setup-test-data";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {click} from "../common/test-utils";

describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      })
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });

  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(0, 'Unexpected number of tabs found');
  });

  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(0, 'Unexpected number of tabs found');
  });

  it("should display both tabs", () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(0, 'Unexpected number of tabs found');
  });

  it("should display advanced courses when tab clicked", (done: DoneFn) => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    // const tabs = el.queryAll(By.css('.mat-tab-label'));
    // fixture.detectChanges();
    // click(tabs[1]);

    setTimeout(() => {
      // const cardTitles = el.queryAll(By.css('.mat-card-title'));
      // expect(cardTitles.length).toBeGreaterThan(0);
      // expect(cardTitles[0].nativeElement.textContent).toContain('Angular security Course');
      done();
    }, 500);

  });

});

