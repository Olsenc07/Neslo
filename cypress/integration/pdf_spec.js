describe('PDF Generation API Route', () => {
    const apiUrl = '/api/pdf'; // Ensure this matches your actual API endpoint
  
    it('successfully generates a PDF', () => {
      cy.request('POST', apiUrl, {
        content: 'Test content for PDF'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/pdf');
        // Check that the response is not empty and appears to be a PDF file
        expect(response.body).to.not.be.empty;
        // Optionally, you can check for a minimum file size (e.g., more than 100 bytes)
        expect(response.body.length).to.be.greaterThan(100);
      });
    });
  });
  