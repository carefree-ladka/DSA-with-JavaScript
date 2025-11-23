class Stepper {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        
        this.steps = document.querySelectorAll('.step');
        this.stepContents = document.querySelectorAll('.step-content');
        this.connectors = document.querySelectorAll('.step-connector');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.progressFill = document.getElementById('progressFill');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.submitBtn.addEventListener('click', () => this.submit());
        
        // Step click navigation
        this.steps.forEach((step, index) => {
            step.addEventListener('click', () => {
                const stepNumber = index + 1;
                if (stepNumber <= this.currentStep || this.isStepCompleted(stepNumber - 1)) {
                    this.goToStep(stepNumber);
                }
            });
        });
        
        // Form validation on input
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => this.validateCurrentStep());
            input.addEventListener('blur', () => this.saveFormData());
        });
    }
    
    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveFormData();
            
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateUI();
                
                if (this.currentStep === this.totalSteps) {
                    this.populateReview();
                }
            }
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }
    
    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            this.saveFormData();
            this.currentStep = stepNumber;
            this.updateUI();
            
            if (stepNumber === this.totalSteps) {
                this.populateReview();
            }
        }
    }
    
    validateCurrentStep() {
        const currentContent = document.querySelector(`[data-content="${this.currentStep}"]`);
        const requiredInputs = currentContent.querySelectorAll('input[required], select[required]');
        
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });
        
        // Custom validation for step 2 (password confirmation)
        if (this.currentStep === 2) {
            const password = currentContent.querySelector('input[name="password"]').value;
            const confirmPassword = currentContent.querySelector('input[name="confirmPassword"]').value;
            
            if (password !== confirmPassword) {
                isValid = false;
                currentContent.querySelector('input[name="confirmPassword"]').style.borderColor = '#ef4444';
            }
        }
        
        return isValid;
    }
    
    saveFormData() {
        const currentContent = document.querySelector(`[data-content="${this.currentStep}"]`);
        const inputs = currentContent.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                this.formData[input.name] = input.checked;
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }
    
    populateReview() {
        // Personal Information
        const personalData = [
            { label: 'First Name', value: this.formData.firstName },
            { label: 'Last Name', value: this.formData.lastName },
            { label: 'Date of Birth', value: this.formData.dateOfBirth },
            { label: 'Phone Number', value: this.formData.phone }
        ].filter(item => item.value);
        
        this.renderReviewSection('reviewPersonal', personalData);
        
        // Account Details
        const accountData = [
            { label: 'Email', value: this.formData.email },
            { label: 'Username', value: this.formData.username }
        ].filter(item => item.value);
        
        this.renderReviewSection('reviewAccount', accountData);
        
        // Preferences
        const preferencesData = [
            { label: 'Language', value: this.formData.language },
            { label: 'Timezone', value: this.formData.timezone },
            { label: 'Newsletter', value: this.formData.newsletter ? 'Yes' : 'No' },
            { label: 'Notifications', value: this.formData.notifications ? 'Yes' : 'No' }
        ].filter(item => item.value);
        
        this.renderReviewSection('reviewPreferences', preferencesData);
    }
    
    renderReviewSection(containerId, data) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        data.forEach(item => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <span class="review-label">${item.label}:</span>
                <span class="review-value">${item.value}</span>
            `;
            container.appendChild(reviewItem);
        });
    }
    
    updateUI() {
        // Update step indicators
        this.steps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            }
        });
        
        // Update connectors
        this.connectors.forEach((connector, index) => {
            if (index < this.currentStep - 1) {
                connector.classList.add('completed');
            } else {
                connector.classList.remove('completed');
            }
        });
        
        // Update step content
        this.stepContents.forEach((content, index) => {
            const stepNumber = index + 1;
            
            if (stepNumber === this.currentStep) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        
        // Update buttons
        this.prevBtn.disabled = this.currentStep === 1;
        
        if (this.currentStep === this.totalSteps) {
            this.nextBtn.style.display = 'none';
            this.submitBtn.style.display = 'inline-block';
        } else {
            this.nextBtn.style.display = 'inline-block';
            this.submitBtn.style.display = 'none';
        }
        
        // Update progress bar
        const progress = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    isStepCompleted(stepNumber) {
        return stepNumber < this.currentStep;
    }
    
    submit() {
        this.saveFormData();
        
        if (this.validateCurrentStep()) {
            // Simulate form submission
            this.showSuccess();
        }
    }
    
    showSuccess() {
        const container = document.querySelector('.stepper-content');
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 20px;">✅</div>
                <h2 style="color: #10b981; margin-bottom: 15px;">Success!</h2>
                <p style="color: #64748b; font-size: 18px;">Your form has been submitted successfully.</p>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 30px;">Start Over</button>
            </div>
        `;
        
        // Hide action buttons
        document.querySelector('.stepper-actions').style.display = 'none';
        
        // Complete all steps visually
        this.steps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('completed');
        });
        
        this.connectors.forEach(connector => {
            connector.classList.add('completed');
        });
        
        this.progressFill.style.width = '100%';
    }
}

// Initialize stepper
new Stepper();