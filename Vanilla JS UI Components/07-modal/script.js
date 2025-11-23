class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.backdrop = this.modal.querySelector('.modal-backdrop');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.title = document.getElementById('modalTitle');
        this.body = document.getElementById('modalBody');
        this.footer = document.getElementById('modalFooter');
        
        this.isOpen = false;
        this.focusableElements = [];
        this.previousFocus = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.backdrop.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (this.isOpen) {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'Tab') {
                    this.handleTabKey(e);
                }
            }
        });
        
        // Demo buttons
        document.getElementById('openModal').addEventListener('click', () => {
            this.open({
                title: 'Simple Modal',
                body: '<p>This is a simple modal example. You can put any content here.</p><p>Try pressing Escape or clicking outside to close.</p>',
                footer: '<button class="btn btn-secondary" onclick="modal.close()">Close</button>'
            });
        });
        
        document.getElementById('openConfirm').addEventListener('click', () => {
            this.confirm({
                title: 'Confirm Action',
                message: 'Are you sure you want to delete this item? This action cannot be undone.',
                confirmText: 'Delete',
                cancelText: 'Cancel',
                onConfirm: () => {
                    alert('Item deleted!');
                }
            });
        });
        
        document.getElementById('openForm').addEventListener('click', () => {
            this.openForm();
        });
    }
    
    open(options = {}) {
        this.previousFocus = document.activeElement;
        
        this.title.textContent = options.title || '';
        this.body.innerHTML = options.body || '';
        this.footer.innerHTML = options.footer || '';
        
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        
        this.isOpen = true;
        
        // Set up focus trap
        this.setupFocusTrap();
        
        // Focus first focusable element or close button
        setTimeout(() => {
            const firstFocusable = this.focusableElements[0] || this.closeBtn;
            firstFocusable.focus();
        }, 100);
        
        return this;
    }
    
    close() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        
        this.isOpen = false;
        
        // Restore focus
        if (this.previousFocus) {
            this.previousFocus.focus();
        }
        
        return this;
    }
    
    confirm(options = {}) {
        const {
            title = 'Confirm',
            message = 'Are you sure?',
            confirmText = 'OK',
            cancelText = 'Cancel',
            onConfirm = () => {},
            onCancel = () => {}
        } = options;
        
        const body = `<p>${message}</p>`;
        const footer = `
            <button class="btn btn-secondary" id="cancelBtn">${cancelText}</button>
            <button class="btn btn-danger" id="confirmBtn">${confirmText}</button>
        `;
        
        this.open({ title, body, footer });
        
        // Bind confirm/cancel actions
        setTimeout(() => {
            document.getElementById('confirmBtn').addEventListener('click', () => {
                onConfirm();
                this.close();
            });
            
            document.getElementById('cancelBtn').addEventListener('click', () => {
                onCancel();
                this.close();
            });
        }, 0);
        
        return this;
    }
    
    openForm() {
        const body = `
            <form id="modalForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="4"></textarea>
                </div>
            </form>
        `;
        
        const footer = `
            <button class="btn btn-secondary" onclick="modal.close()">Cancel</button>
            <button class="btn btn-primary" id="submitBtn">Submit</button>
        `;
        
        this.open({
            title: 'Contact Form',
            body,
            footer
        });
        
        // Handle form submission
        setTimeout(() => {
            const form = document.getElementById('modalForm');
            const submitBtn = document.getElementById('submitBtn');
            
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (form.checkValidity()) {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    
                    alert(`Form submitted!\n${JSON.stringify(data, null, 2)}`);
                    this.close();
                } else {
                    form.reportValidity();
                }
            });
        }, 0);
    }
    
    setupFocusTrap() {
        const focusableSelectors = [
            'button:not([disabled])',
            'input:not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])'
        ];
        
        this.focusableElements = Array.from(
            this.modal.querySelectorAll(focusableSelectors.join(', '))
        );
    }
    
    handleTabKey(e) {
        if (this.focusableElements.length === 0) return;
        
        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

// Initialize modal
const modal = new Modal();

// Export for global access
window.modal = modal;