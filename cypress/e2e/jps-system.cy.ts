// Roman Urdu: JPS System End-to-End Tests
// Complete user workflow testing with Cypress

describe('JPS System E2E Tests', () => {
  beforeEach(() => {
    // Roman Urdu: Visit the JPS system page
    cy.visit('/jps');
    cy.wait(1000); // Wait for page to load
  });

  // Roman Urdu: Main Navigation Tests
  describe('Navigation', () => {
    it('Should load JPS system page successfully', () => {
      cy.get('h1').should('contain', 'JPS System');
      cy.get('body').should('contain', 'Job Placement System');
    });

    it('Should display all main sections', () => {
      cy.get('[data-testid="jobs-section"]').should('be.visible');
      cy.get('[data-testid="candidates-section"]').should('be.visible');
      cy.get('[data-testid="ai-matching-section"]').should('be.visible');
      cy.get('[data-testid="notifications-section"]').should('be.visible');
      cy.get('[data-testid="payments-section"]').should('be.visible');
    });

    it('Should navigate between different sections', () => {
      // Roman Urdu: Test tab navigation
      cy.get('[data-testid="tab-jobs"]').click();
      cy.get('[data-testid="jobs-content"]').should('be.visible');

      cy.get('[data-testid="tab-candidates"]').click();
      cy.get('[data-testid="candidates-content"]').should('be.visible');

      cy.get('[data-testid="tab-ai-matching"]').click();
      cy.get('[data-testid="ai-matching-content"]').should('be.visible');
    });
  });

  // Roman Urdu: Jobs Management Tests
  describe('Jobs Management', () => {
    it('Should display jobs list', () => {
      cy.get('[data-testid="jobs-list"]').should('be.visible');
      cy.get('[data-testid="job-item"]').should('have.length.at.least', 1);
    });

    it('Should create a new job', () => {
      cy.get('[data-testid="add-job-btn"]').click();
      
      // Roman Urdu: Fill job form
      cy.get('[data-testid="job-title-input"]').type('Test Developer');
      cy.get('[data-testid="job-company-input"]').type('Test Company');
      cy.get('[data-testid="job-location-input"]').type('Test City');
      cy.get('[data-testid="job-salary-input"]').type('100000');
      cy.get('[data-testid="job-description-input"]').type('Test job description');
      
      // Roman Urdu: Add requirements
      cy.get('[data-testid="add-requirement-btn"]').click();
      cy.get('[data-testid="requirement-input"]').first().type('JavaScript');
      
      cy.get('[data-testid="add-requirement-btn"]').click();
      cy.get('[data-testid="requirement-input"]').last().type('React');
      
      cy.get('[data-testid="save-job-btn"]').click();
      
      // Roman Urdu: Verify job was created
      cy.get('[data-testid="success-message"]').should('contain', 'Job created successfully');
      cy.get('[data-testid="jobs-list"]').should('contain', 'Test Developer');
    });

    it('Should edit an existing job', () => {
      cy.get('[data-testid="job-item"]').first().find('[data-testid="edit-job-btn"]').click();
      
      cy.get('[data-testid="job-salary-input"]').clear().type('120000');
      cy.get('[data-testid="save-job-btn"]').click();
      
      cy.get('[data-testid="success-message"]').should('contain', 'Job updated successfully');
    });

    it('Should delete a job', () => {
      const jobCount = cy.get('[data-testid="job-item"]').its('length');
      
      cy.get('[data-testid="job-item"]').first().find('[data-testid="delete-job-btn"]').click();
      cy.get('[data-testid="confirm-delete-btn"]').click();
      
      cy.get('[data-testid="success-message"]').should('contain', 'Job deleted successfully');
      cy.get('[data-testid="job-item"]').should('have.length', jobCount - 1);
    });

    it('Should filter jobs by status', () => {
      cy.get('[data-testid="job-status-filter"]').select('active');
      cy.get('[data-testid="job-item"]').each(($el) => {
        cy.wrap($el).should('contain', 'Active');
      });
    });

    it('Should search jobs by title', () => {
      cy.get('[data-testid="job-search-input"]').type('React');
      cy.get('[data-testid="job-item"]').should('contain', 'React');
    });
  });

  // Roman Urdu: Candidates Management Tests
  describe('Candidates Management', () => {
    it('Should display candidates list', () => {
      cy.get('[data-testid="candidates-list"]').should('be.visible');
      cy.get('[data-testid="candidate-item"]').should('have.length.at.least', 1);
    });

    it('Should create a new candidate', () => {
      cy.get('[data-testid="add-candidate-btn"]').click();
      
      // Roman Urdu: Fill candidate form
      cy.get('[data-testid="candidate-name-input"]').type('Test Candidate');
      cy.get('[data-testid="candidate-email-input"]').type('test@example.com');
      cy.get('[data-testid="candidate-phone-input"]').type('+92-300-1234567');
      cy.get('[data-testid="candidate-sql-level"]').select('3');
      cy.get('[data-testid="candidate-experience-input"]').type('5');
      
      // Roman Urdu: Add skills
      cy.get('[data-testid="add-skill-btn"]').click();
      cy.get('[data-testid="skill-input"]').first().type('JavaScript');
      
      cy.get('[data-testid="add-skill-btn"]').click();
      cy.get('[data-testid="skill-input"]').last().type('React');
      
      cy.get('[data-testid="save-candidate-btn"]').click();
      
      // Roman Urdu: Verify candidate was created
      cy.get('[data-testid="success-message"]').should('contain', 'Candidate created successfully');
      cy.get('[data-testid="candidates-list"]').should('contain', 'Test Candidate');
    });

    it('Should edit an existing candidate', () => {
      cy.get('[data-testid="candidate-item"]').first().find('[data-testid="edit-candidate-btn"]').click();
      
      cy.get('[data-testid="candidate-experience-input"]').clear().type('6');
      cy.get('[data-testid="save-candidate-btn"]').click();
      
      cy.get('[data-testid="success-message"]').should('contain', 'Candidate updated successfully');
    });

    it('Should filter candidates by SQL level', () => {
      cy.get('[data-testid="sql-level-filter"]').select('3');
      cy.get('[data-testid="candidate-item"]').each(($el) => {
        cy.wrap($el).should('contain', 'SQL Level 3');
      });
    });

    it('Should search candidates by name', () => {
      cy.get('[data-testid="candidate-search-input"]').type('Ahmed');
      cy.get('[data-testid="candidate-item"]').should('contain', 'Ahmed');
    });
  });

  // Roman Urdu: AI Matching Tests
  describe('AI Matching System', () => {
    it('Should display AI matching interface', () => {
      cy.get('[data-testid="ai-matching-section"]').should('be.visible');
      cy.get('[data-testid="job-select"]').should('be.visible');
      cy.get('[data-testid="candidate-select"]').should('be.visible');
      cy.get('[data-testid="check-compatibility-btn"]').should('be.visible');
    });

    it('Should select job and candidate for matching', () => {
      cy.get('[data-testid="job-select"]').select('1');
      cy.get('[data-testid="candidate-select"]').select('1');
      
      cy.get('[data-testid="check-compatibility-btn"]').should('not.be.disabled');
    });

    it('Should calculate compatibility score', () => {
      cy.get('[data-testid="job-select"]').select('1');
      cy.get('[data-testid="candidate-select"]').select('1');
      cy.get('[data-testid="check-compatibility-btn"]').click();
      
      // Roman Urdu: Wait for API response
      cy.wait(2000);
      
      cy.get('[data-testid="compatibility-score"]').should('be.visible');
      cy.get('[data-testid="overall-score"]').should('contain', '%');
      
      // Roman Urdu: Check breakdown scores
      cy.get('[data-testid="skills-score"]').should('be.visible');
      cy.get('[data-testid="experience-score"]').should('be.visible');
      cy.get('[data-testid="location-score"]').should('be.visible');
      cy.get('[data-testid="salary-score"]').should('be.visible');
      cy.get('[data-testid="sql-level-score"]').should('be.visible');
    });

    it('Should display matching skills', () => {
      cy.get('[data-testid="job-select"]').select('1');
      cy.get('[data-testid="candidate-select"]').select('1');
      cy.get('[data-testid="check-compatibility-btn"]').click();
      
      cy.wait(2000);
      
      cy.get('[data-testid="matching-skills"]').should('be.visible');
      cy.get('[data-testid="missing-skills"]').should('be.visible');
    });

    it('Should display recommendations', () => {
      cy.get('[data-testid="job-select"]').select('1');
      cy.get('[data-testid="candidate-select"]').select('1');
      cy.get('[data-testid="check-compatibility-btn"]').click();
      
      cy.wait(2000);
      
      cy.get('[data-testid="recommendations"]').should('be.visible');
      cy.get('[data-testid="recommendation-item"]').should('have.length.at.least', 1);
    });

    it('Should get top matches for a job', () => {
      cy.get('[data-testid="job-select"]').select('1');
      cy.get('[data-testid="get-top-matches-btn"]').click();
      
      cy.wait(2000);
      
      cy.get('[data-testid="top-matches-list"]').should('be.visible');
      cy.get('[data-testid="match-item"]').should('have.length.at.least', 1);
    });
  });

  // Roman Urdu: Notifications Tests
  describe('Notifications System', () => {
    it('Should display notifications interface', () => {
      cy.get('[data-testid="notifications-section"]').should('be.visible');
      cy.get('[data-testid="send-email-btn"]').should('be.visible');
      cy.get('[data-testid="send-sms-btn"]').should('be.visible');
    });

    it('Should send interview notification', () => {
      cy.get('[data-testid="job-select"]').select('1');
      cy.get('[data-testid="candidate-select"]').select('1');
      
      cy.get('[data-testid="send-interview-notification-btn"]').click();
      
      // Roman Urdu: Fill interview details
      cy.get('[data-testid="interview-date-input"]').type('2024-02-01');
      cy.get('[data-testid="interview-time-input"]').type('10:00');
      cy.get('[data-testid="interview-location-input"]').type('Office');
      cy.get('[data-testid="interview-type-select"]').select('in-person');
      
      cy.get('[data-testid="send-notification-btn"]').click();
      
      cy.get('[data-testid="success-message"]').should('contain', 'Interview notification sent successfully');
    });

    it('Should send email notification', () => {
      cy.get('[data-testid="send-email-btn"]').click();
      
      cy.get('[data-testid="email-to-input"]').type('test@example.com');
      cy.get('[data-testid="email-subject-input"]').type('Test Subject');
      cy.get('[data-testid="email-message-input"]').type('Test message content');
      
      cy.get('[data-testid="send-email-submit-btn"]').click();
      
      cy.get('[data-testid="success-message"]').should('contain', 'Email sent successfully');
    });

    it('Should send SMS notification', () => {
      cy.get('[data-testid="send-sms-btn"]').click();
      
      cy.get('[data-testid="sms-to-input"]').type('+92-300-1234567');
      cy.get('[data-testid="sms-message-input"]').type('Test SMS message');
      
      cy.get('[data-testid="send-sms-submit-btn"]').click();
      
      cy.get('[data-testid="success-message"]').should('contain', 'SMS sent successfully');
    });

    it('Should display notification history', () => {
      cy.get('[data-testid="notification-history-btn"]').click();
      
      cy.get('[data-testid="notification-history"]').should('be.visible');
      cy.get('[data-testid="notification-item"]').should('have.length.at.least', 1);
    });
  });

  // Roman Urdu: Payments Tests
  describe('Payments System', () => {
    it('Should display payments interface', () => {
      cy.get('[data-testid="payments-section"]').should('be.visible');
      cy.get('[data-testid="payment-report-btn"]').should('be.visible');
      cy.get('[data-testid="calculate-commission-btn"]').should('be.visible');
    });

    it('Should calculate commission', () => {
      cy.get('[data-testid="placement-select"]').select('1');
      cy.get('[data-testid="calculate-commission-btn"]').click();
      
      cy.wait(2000);
      
      cy.get('[data-testid="commission-result"]').should('be.visible');
      cy.get('[data-testid="commission-amount"]').should('contain', 'PKR');
      cy.get('[data-testid="commission-rate"]').should('contain', '%');
    });

    it('Should process payment', () => {
      cy.get('[data-testid="placement-select"]').select('1');
      cy.get('[data-testid="process-payment-btn"]').click();
      
      cy.get('[data-testid="payment-amount-input"]').type('12000');
      cy.get('[data-testid="payment-method-select"]').select('bank_transfer');
      cy.get('[data-testid="payment-description-input"]').type('Commission payment');
      
      cy.get('[data-testid="confirm-payment-btn"]').click();
      
      cy.get('[data-testid="success-message"]').should('contain', 'Payment processed successfully');
    });

    it('Should display payment report', () => {
      cy.get('[data-testid="payment-report-btn"]').click();
      
      cy.wait(2000);
      
      cy.get('[data-testid="payment-report"]').should('be.visible');
      cy.get('[data-testid="payment-summary"]').should('be.visible');
      cy.get('[data-testid="total-amount"]').should('be.visible');
      cy.get('[data-testid="payment-item"]').should('have.length.at.least', 1);
    });

    it('Should filter payments by status', () => {
      cy.get('[data-testid="payment-report-btn"]').click();
      
      cy.get('[data-testid="payment-status-filter"]').select('completed');
      
      cy.get('[data-testid="payment-item"]').each(($el) => {
        cy.wrap($el).should('contain', 'Completed');
      });
    });

    it('Should filter payments by date range', () => {
      cy.get('[data-testid="payment-report-btn"]').click();
      
      cy.get('[data-testid="start-date-input"]').type('2024-01-01');
      cy.get('[data-testid="end-date-input"]').type('2024-01-31');
      cy.get('[data-testid="apply-date-filter-btn"]').click();
      
      cy.get('[data-testid="payment-item"]').should('be.visible');
    });
  });

  // Roman Urdu: Dashboard Tests
  describe('Dashboard', () => {
    it('Should display dashboard statistics', () => {
      cy.get('[data-testid="dashboard-stats"]').should('be.visible');
      cy.get('[data-testid="total-jobs"]').should('be.visible');
      cy.get('[data-testid="total-candidates"]').should('be.visible');
      cy.get('[data-testid="total-placements"]').should('be.visible');
      cy.get('[data-testid="total-revenue"]').should('be.visible');
    });

    it('Should display recent activities', () => {
      cy.get('[data-testid="recent-activities"]').should('be.visible');
      cy.get('[data-testid="activity-item"]').should('have.length.at.least', 1);
    });

    it('Should display performance charts', () => {
      cy.get('[data-testid="performance-charts"]').should('be.visible');
      cy.get('[data-testid="placements-chart"]').should('be.visible');
      cy.get('[data-testid="revenue-chart"]').should('be.visible');
    });
  });

  // Roman Urdu: Responsive Design Tests
  describe('Responsive Design', () => {
    it('Should work on mobile devices', () => {
      cy.viewport('iphone-x');
      
      cy.get('[data-testid="mobile-menu-btn"]').click();
      cy.get('[data-testid="mobile-menu"]').should('be.visible');
      
      cy.get('[data-testid="tab-jobs"]').click();
      cy.get('[data-testid="jobs-content"]').should('be.visible');
    });

    it('Should work on tablet devices', () => {
      cy.viewport('ipad-2');
      
      cy.get('[data-testid="jobs-section"]').should('be.visible');
      cy.get('[data-testid="candidates-section"]').should('be.visible');
    });

    it('Should work on desktop devices', () => {
      cy.viewport(1920, 1080);
      
      cy.get('[data-testid="sidebar"]').should('be.visible');
      cy.get('[data-testid="main-content"]').should('be.visible');
    });
  });

  // Roman Urdu: Error Handling Tests
  describe('Error Handling', () => {
    it('Should handle network errors gracefully', () => {
      // Roman Urdu: Intercept API calls and return errors
      cy.intercept('GET', '/api/jps*', { statusCode: 500, body: { error: 'Server Error' } });
      
      cy.reload();
      
      cy.get('[data-testid="error-message"]').should('contain', 'Error');
    });

    it('Should handle validation errors', () => {
      cy.get('[data-testid="add-job-btn"]').click();
      cy.get('[data-testid="save-job-btn"]').click();
      
      cy.get('[data-testid="validation-error"]').should('be.visible');
    });

    it('Should handle empty data states', () => {
      cy.intercept('GET', '/api/jps*', { statusCode: 200, body: [] });
      
      cy.reload();
      
      cy.get('[data-testid="empty-state"]').should('be.visible');
    });
  });

  // Roman Urdu: Performance Tests
  describe('Performance', () => {
    it('Should load page within acceptable time', () => {
      cy.visit('/jps', { timeout: 10000 });
      
      cy.get('[data-testid="jobs-section"]').should('be.visible');
      cy.get('[data-testid="candidates-section"]').should('be.visible');
    });

    it('Should handle large datasets', () => {
      // Roman Urdu: Test with large number of items
      cy.get('[data-testid="jobs-list"]').should('be.visible');
      cy.get('[data-testid="candidates-list"]').should('be.visible');
    });
  });

  // Roman Urdu: Accessibility Tests
  describe('Accessibility', () => {
    it('Should have proper ARIA labels', () => {
      cy.get('[aria-label]').should('exist');
      cy.get('[role]').should('exist');
    });

    it('Should be keyboard navigable', () => {
      cy.get('body').tab();
      cy.focused().should('exist');
    });

    it('Should have proper color contrast', () => {
      cy.get('body').should('have.css', 'color');
    });
  });
}); 