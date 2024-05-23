describe('Images Service API', () => {
    const apiUrl = '/api/images';
    const dummyImagesResidential = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ];
  
    const dummyImagesShowcase = [
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg'
    ];
  
    it('should fetch images from Residential folder', () => {
      cy.intercept('GET', `${apiUrl}/cloudinary?folder=Residential`, {
        statusCode: 200,
        body: dummyImagesResidential
      }).as('fetchResidentialImages');
  
      cy.request('GET', `${apiUrl}/cloudinary?folder=Residential`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.eq(2);
        expect(response.body).to.deep.equal(dummyImagesResidential);
      });
  
      cy.wait('@fetchResidentialImages').its('response.statusCode').should('eq', 200);
    });
  
    it('should fetch images from Showcase folder', () => {
      cy.intercept('GET', `${apiUrl}/cloudinary?folder=Showcase`, {
        statusCode: 200,
        body: dummyImagesShowcase
      }).as('fetchShowcaseImages');
  
      cy.request('GET', `${apiUrl}/cloudinary?folder=Showcase`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.eq(2);
        expect(response.body).to.deep.equal(dummyImagesShowcase);
      });
  
      cy.wait('@fetchShowcaseImages').its('response.statusCode').should('eq', 200);
    });
  });
  