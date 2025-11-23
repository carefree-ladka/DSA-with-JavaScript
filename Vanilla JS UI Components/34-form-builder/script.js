class FormBuilder {
    constructor() {
        this.schema = null;
        this.formData = {};
    }

    loadSample() {
        const sampleSchema = {
            fields: [
                {
                    name: "firstName",
                    type: "text",
                    label: "First Name",
                    required: true,
                    validation: { minLength: 2 }
                },
                {
                    name: "email",
                    type: "email",
                    label: "Email Address",
                    required: true,
                    validation: { pattern: "^[^@]+@[^@]+\\.[^@]+$" }
                },
                {
                    name: "age",
                    type: "number",
                    label: "Age",
                    validation: { min: 18, max: 100 }
                },
                {
                    name: "country",
                    type: "select",
                    label: "Country",
                    options: ["USA", "Canada", "UK", "Australia"],
                    required: true
                },
                {
                    name: "interests",
                    type: "checkbox",
                    label: "Interests",
                    options: ["Sports", "Music", "Travel", "Technology"]
                },
                {
                    name: "gender",
                    type: "radio",
                    label: "Gender",
                    options: ["Male", "Female", "Other"]
                },
                {
                    name: "bio",
                    type: "textarea",
                    label: "Biography",
                    validation: { maxLength: 500 }
                }
            ]
        };
        
        document.getElementById('schemaInput').value = JSON.stringify(sampleSchema, null, 2);
    }

    renderForm() {
        try {
            const schemaText = document.getElementById('schemaInput').value;
            this.schema = JSON.parse(schemaText);
            this.createForm();
        } catch (error) {
            alert('Invalid JSON schema');
        }
    }

    createForm() {
        const container = document.getElementById('formContainer');
        container.innerHTML = '';
        
        const form = document.createElement('form');
        form.id = 'dynamicForm';
        
        this.schema.fields.forEach(field => {
            const formGroup = this.createFormGroup(field);
            form.appendChild(formGroup);
        });
        
        container.appendChild(form);
    }

    createFormGroup(field) {
        const group = document.createElement('div');
        group.className = `form-group ${field.required ? 'required' : ''}`;
        
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.name);
        group.appendChild(label);
        
        const input = this.createInput(field);
        group.appendChild(input);
        
        return group;
    }

    createInput(field) {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
                return this.createTextInput(field);
            case 'select':
                return this.createSelect(field);
            case 'checkbox':
                return this.createCheckboxGroup(field);
            case 'radio':
                return this.createRadioGroup(field);
            case 'textarea':
                return this.createTextarea(field);
            default:
                return this.createTextInput(field);
        }
    }

    createTextInput(field) {
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.id = field.name;
        
        if (field.validation) {
            if (field.validation.minLength) input.minLength = field.validation.minLength;
            if (field.validation.maxLength) input.maxLength = field.validation.maxLength;
            if (field.validation.min) input.min = field.validation.min;
            if (field.validation.max) input.max = field.validation.max;
            if (field.validation.pattern) input.pattern = field.validation.pattern;
        }
        
        input.addEventListener('input', () => this.updateFormData(field.name, input.value));
        return input;
    }

    createSelect(field) {
        const select = document.createElement('select');
        select.name = field.name;
        select.id = field.name;
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select an option';
        select.appendChild(defaultOption);
        
        field.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        
        select.addEventListener('change', () => this.updateFormData(field.name, select.value));
        return select;
    }

    createCheckboxGroup(field) {
        const container = document.createElement('div');
        container.className = 'checkbox-group';
        
        field.options.forEach(option => {
            const item = document.createElement('div');
            item.className = 'checkbox-item';
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = field.name;
            input.value = option;
            input.id = `${field.name}_${option}`;
            
            const label = document.createElement('label');
            label.textContent = option;
            label.setAttribute('for', input.id);
            
            input.addEventListener('change', () => this.updateCheckboxData(field.name));
            
            item.appendChild(input);
            item.appendChild(label);
            container.appendChild(item);
        });
        
        return container;
    }

    createRadioGroup(field) {
        const container = document.createElement('div');
        container.className = 'radio-group';
        
        field.options.forEach(option => {
            const item = document.createElement('div');
            item.className = 'radio-item';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = field.name;
            input.value = option;
            input.id = `${field.name}_${option}`;
            
            const label = document.createElement('label');
            label.textContent = option;
            label.setAttribute('for', input.id);
            
            input.addEventListener('change', () => this.updateFormData(field.name, input.value));
            
            item.appendChild(input);
            item.appendChild(label);
            container.appendChild(item);
        });
        
        return container;
    }

    createTextarea(field) {
        const textarea = document.createElement('textarea');
        textarea.name = field.name;
        textarea.id = field.name;
        textarea.rows = 4;
        
        if (field.validation && field.validation.maxLength) {
            textarea.maxLength = field.validation.maxLength;
        }
        
        textarea.addEventListener('input', () => this.updateFormData(field.name, textarea.value));
        return textarea;
    }

    updateFormData(name, value) {
        this.formData[name] = value;
    }

    updateCheckboxData(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        this.formData[name] = Array.from(checkboxes).map(cb => cb.value);
    }

    validateForm() {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
        
        this.schema.fields.forEach(field => {
            const value = this.formData[field.name];
            const group = document.querySelector(`[for="${field.name}"]`).parentNode;
            
            if (field.required && (!value || value === '')) {
                this.showError(group, 'This field is required');
                isValid = false;
            }
            
            if (field.validation && value) {
                const validation = field.validation;
                
                if (validation.minLength && value.length < validation.minLength) {
                    this.showError(group, `Minimum length is ${validation.minLength}`);
                    isValid = false;
                }
                
                if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
                    this.showError(group, 'Invalid format');
                    isValid = false;
                }
            }
        });
        
        alert(isValid ? 'Form is valid!' : 'Please fix the errors');
        return isValid;
    }

    showError(group, message) {
        group.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        group.appendChild(errorDiv);
    }

    getFormData() {
        console.log('Form Data:', this.formData);
        alert('Check console for form data');
    }
}

const formBuilder = new FormBuilder();