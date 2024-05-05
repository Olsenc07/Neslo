describe('PDF Generation API Route', () => {
    const apiUrl = '/api/pdf'; 
  
    it('successfully generates a PDF', () => {
      cy.request('POST', apiUrl, {
        content: 'Test content for PDF'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/pdf');
        expect(response.body).to.not.be.empty;
        // min size check
        expect(response.body.length).to.be.greaterThan(100);
      });
    });
  });
  