describe('Email API Tests', () => {
    const apiUrl = 'http://localhost:4200/api/email/emit'; // Adjust based on your server configuration

    it('successfully sends an email without an attachment', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                text: 'Hello, this is a test email.',
                fromName: 'Tester',
                fromEmail: 'tester@example.com'
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include('Email sent successfully');
        });
    });
});

describe('Email API Tests with Attachments', () => {
    const apiUrl = 'http://localhost:4200/api/email/emit'; // Adjust based on your server configuration

    it('successfully sends an email with a PDF attachment', () => {
        // Prepare the file to be uploaded
        const fileName = 'sample.pdf';
        const fileType = 'application/pdf';
        cy.fixture(fileName, 'base64').then(fileContent => {
            cy.request({
                method: 'POST',
                url: apiUrl,
                body: {
                    text: 'Hello, this is a test email with a PDF attachment.',
                    fromName: 'Tester',
                    fromEmail: 'tester@example.com',
                    attachments: [{
                        content: fileContent,
                        filename: fileName,
                        type: fileType,
                        disposition: 'attachment'
                    }]
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.include('Email sent successfully');
            });
        });
    });
});
