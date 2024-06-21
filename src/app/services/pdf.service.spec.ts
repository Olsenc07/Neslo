import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PdfService } from './pdf.service';
import { Form } from '../interfaces/form';
import { Grid } from '../interfaces/grid';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const mockForm: Form = {
  quoteNumber: "12345",
  dealerName: "Neslo",
  dealerBranch: "Downtown",
  contactName: "Erik Olsen",
  contactEmail: "skalolsen@gmail.com",
  contactPhone: "403-555-1234",
  jobName: "Vista Luxury Homes",
  jobSiteAddress: "1234 Mountain View Rd",
  jobCity: "Olds",
  date: "1997-07-02",
  doorModel: "Model X",
  exteriorFinish: "Matte",
  exteriorColor: "Black",
  interiorFinish: "Polished",
  interiorColor: "White",
  glass: "Tempered",
  handleColor: "Silver",
  additionalNotes: "Ensure timely delivery."
};

const mockGrid: Grid = {
  roomLabel: "Room 1",
  width: "120m",
  height: "200m",
  configuration0: "Type A",
  configuration1: "Type B",
  left: "170cm",
  right: "100cm",
  activePanel: "Left"
};

describe('PdfService', () => {
  let service: PdfService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
    imports: [],
    providers: [PdfService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
      service = TestBed.inject(PdfService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  it('should generate PDF successfully', () => {
      const mockBlob = new Blob(['dummy content'], { type: 'application/pdf' });
      service.generatePdf(mockForm, mockGrid).subscribe(response => {
          expect(response instanceof Blob).toBeTruthy(); // Check if the response is a Blob
          expect(response.size).toBeGreaterThan(0); // Correct matcher for numeric comparison
      });

      const req = httpMock.expectOne(`${service.apiUrl}/pdf/generator`);
      expect(req.request.method).toBe('POST');
      req.flush(mockBlob); // Flush the mockBlob as the response
  });

  it('should handle errors when generating PDF fails', () => {
      service.generatePdf(mockForm, mockGrid).subscribe({
          next: () => fail('expected an error'),
          error: (error) => expect(error.message).toContain('Failed to generate PDF') // Correct matcher for string inclusion
      });

      const req = httpMock.expectOne(`${service.apiUrl}/pdf/generator`);
      req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  afterEach(() => {
      httpMock.verify();
  });
});
