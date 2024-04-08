import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PdfService } from './pdf.service';
import { PLATFORM_ID } from '@angular/core';

describe('PdfService', () => {
  let service: PdfService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PdfService, { provide: PLATFORM_ID, useValue: 'browser' }] // Mock PLATFORM_ID if needed
    });
    service = TestBed.inject(PdfService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should generate PDF and return a Blob', () => {
    const dummyFormData = { key: 'value' }; // Mock form data to send
    const dummyBlob = new Blob(['dummy content'], { type: 'application/pdf' }); // Mock Blob response
  
    service.generatePdf(dummyFormData).subscribe(response => {
      expect(response.size).toBe(dummyBlob.size);
      expect(response.type).toBe(dummyBlob.type);
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/api/pdf`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyFormData);
    req.flush(dummyBlob); // Simulate response with the dummy Blob
  });
  
});
