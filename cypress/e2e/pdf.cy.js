describe('PDF Generation API Route', () => {
    const apiUrl = '/api/pdf/generator'; 
  
  it('successfully generates a PDF', () => {
    cy.request('POST', apiUrl, {
      quoteForm: {
        dealerName: '',
        dealerBranch: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        jobName: '',
        jobSiteAddress: '',
        jobCity: '',
        date: '',
        doorModel: '',
        exteriorFinish: '',
        exteriorColor: '',
        interiorFinish: '',
        interiorColor: '',
        glass: '',
        handleColor: '',
        additionalNotes: ''
      },
      gridFormArray: [{
        roomLabel: '',
        width: '',
        height: '',
        configuration0: '',
        configuration1: '',
        left: '',
        right: '',
        activePanel: ''
    }]
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/pdf');
      expect(response.body).to.not.be.empty;
      expect(response.body.length).to.be.greaterThan(100);
    });
  });
});
