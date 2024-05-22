import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImagesService } from './images.service';
import { environment } from '../../../environments/environment';

describe('ImagesService', () => {
  let service: ImagesService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImagesService]
    });

    service = TestBed.inject(ImagesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch images from Residential folder', () => {
    const dummyImages: String[] = [
      'https://example.com/image1.jpg',
       'https://example.com/image2.jpg' 
    ];

    service.fetchImages('Residential').subscribe(images => {
      expect(images.length).toBe(2);
      expect(images).toEqual(dummyImages);
    });

    const req = httpMock.expectOne(`${apiUrl}/cloudinary?folder=Residential`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyImages);
  });

  it('should fetch images from Showcase folder', () => {
    const dummyImages: String[] = [
      'https://example.com/image3.jpg' ,
      'https://example.com/image4.jpg' 
    ];

    service.fetchImages('Showcase').subscribe(images => {
      expect(images.length).toBe(2);
      expect(images).toEqual(dummyImages);
    });

    const req = httpMock.expectOne(`${apiUrl}/cloudinary?folder=Showcase`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyImages);
  });

  it('should fetch images from NesloTeam folder', () => {
    const dummyImages: string[] = [
       'https://example.com/image5.jpg',
       'https://example.com/image6.jpg' 
    ];

    service.fetchImages('NesloTeam').subscribe(images => {
      expect(images.length).toBe(2);
      expect(images).toEqual(dummyImages);
    });

    const req = httpMock.expectOne(`${apiUrl}/cloudinary?folder=NesloTeam`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyImages);
  });
});
