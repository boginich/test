import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AppComponent} from './app.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

interface Data {
  name: string;
}

const testUrl = '/data';

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'httpclient-rxjs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('httpclient-rxjs');
  });

  it('test HttpClient.get', () => {
    const testData: Data = {name: 'Test Data'};
    httpClient.get<Data>(testUrl)
      .subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('test HttpClient.get with data', () => {
    const testData: Data = {name: 'Test Data'};

    httpClient.get<Data>(testUrl).subscribe(data =>expect(data).toEqual(testData));
    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('can test HttpClient.get with matching header', () => {
    const testData: Data = {name: 'Test Data'};

    // Make an HTTP GET request with specific header
    httpClient.get<Data>(testUrl, {
      headers: new HttpHeaders({Authorization: 'my-auth-token'})
    })
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    // Find request with a predicate function.
    // Expect one request with an authorization header
    const req = httpTestingController.expectOne(
      request => request.headers.has('Authorization')
    );
    req.flush(testData);
  });

  it('test multiple requests', () => {
    const testData: Data[] = [
      { name: 'bob' }, { name: 'carol' },
      { name: 'ted' }, { name: 'alice' }
    ];

    httpClient.get<Data[]>(testUrl)
      .subscribe(d => expect(d.length).toEqual(0, 'should have no data'));

    httpClient.get<Data[]>(testUrl)
      .subscribe(d => expect(d).toEqual([testData[0]], 'should be one element array'));

    httpClient.get<Data[]>(testUrl)
      .subscribe(d => expect(d).toEqual(testData, 'should be expected data'));

    const requests = httpTestingController.match(testUrl);
    expect(requests.length).toEqual(3);

    requests[0].flush([]);
    requests[1].flush([testData[0]]);
    requests[2].flush(testData);
  });

  it('test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    httpClient.get<Data[]>(testUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('can test for network error', () => {
    const emsg = 'simulated network error';

    httpClient.get<Data[]>(testUrl).subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
      filename: 'HeroService.ts',
      lineno: 42,
      colno: 21
    });

    req.error(mockError);
  });
});
