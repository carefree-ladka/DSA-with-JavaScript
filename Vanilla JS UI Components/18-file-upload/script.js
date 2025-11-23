class FileUploader {
    constructor() {
        this.files = new Map();
        this.maxFileSize = 5242880; // 5MB default
        this.allowMultiple = true;
        
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.fileList = document.getElementById('fileList');
        this.browseBtn = document.getElementById('browseBtn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
    }
    
    bindEvents() {
        // Drag and drop events
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // Click to browse
        this.browseBtn.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        
        // File input change
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        
        // Options
        document.getElementById('multipleFiles').addEventListener('change', (e) => {
            this.allowMultiple = e.target.checked;
            this.fileInput.multiple = this.allowMultiple;
        });
        
        document.getElementById('maxSize').addEventListener('change', (e) => {
            this.maxFileSize = parseInt(e.target.value);
        });
        
        // Actions
        document.getElementById('uploadAllBtn').addEventListener('click', () => this.uploadAll());
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
    }
    
    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        this.addFiles(files);
    }
    
    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.addFiles(files);
        e.target.value = ''; // Reset input
    }
    
    addFiles(files) {
        if (!this.allowMultiple) {
            this.files.clear();
            files = files.slice(0, 1);
        }
        
        files.forEach(file => {
            const fileId = this.generateFileId();
            const fileData = {
                id: fileId,
                file: file,
                status: 'pending',
                progress: 0,
                error: null
            };
            
            const validation = this.validateFile(file);
            if (!validation.valid) {
                fileData.status = 'error';
                fileData.error = validation.error;
            }
            
            this.files.set(fileId, fileData);
        });
        
        this.renderFiles();
        this.updateUI();
    }
    
    validateFile(file) {
        if (file.size > this.maxFileSize) {
            return {
                valid: false,
                error: `File size exceeds ${this.formatFileSize(this.maxFileSize)} limit`
            };
        }
        
        // Add more validation rules as needed
        return { valid: true };
    }
    
    generateFileId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }
    
    getFileIcon(file) {
        const type = file.type.toLowerCase();
        
        if (type.startsWith('image/')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('word') || type.includes('document')) return '📝';
        if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
        if (type.includes('text')) return '📃';
        if (type.includes('video')) return '🎥';
        if (type.includes('audio')) return '🎵';
        
        return '📁';
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    renderFiles() {
        this.fileList.innerHTML = '';
        
        this.files.forEach((fileData) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-icon">${this.getFileIcon(fileData.file)}</div>
                <div class="file-info">
                    <div class="file-name">${fileData.file.name}</div>
                    <div class="file-size">${this.formatFileSize(fileData.file.size)}</div>
                    ${fileData.status === 'uploading' || fileData.status === 'success' ? `
                        <div class="file-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${fileData.progress}%"></div>
                            </div>
                            <div class="file-status ${fileData.status}">${this.getStatusText(fileData)}</div>
                        </div>
                    ` : ''}
                    ${fileData.error ? `<div class="error-message">${fileData.error}</div>` : ''}
                </div>
                <div class="file-actions">
                    ${fileData.status === 'pending' ? `
                        <button class="file-btn upload-btn" onclick="fileUploader.uploadFile('${fileData.id}')">Upload</button>
                    ` : ''}
                    <button class="file-btn remove-btn" onclick="fileUploader.removeFile('${fileData.id}')">Remove</button>
                </div>
            `;
            
            this.fileList.appendChild(fileItem);
        });
    }
    
    getStatusText(fileData) {
        switch (fileData.status) {
            case 'uploading':
                return `Uploading... ${fileData.progress}%`;
            case 'success':
                return 'Upload complete';
            case 'error':
                return 'Upload failed';
            default:
                return 'Pending';
        }
    }
    
    async uploadFile(fileId) {
        const fileData = this.files.get(fileId);
        if (!fileData || fileData.status !== 'pending') return;
        
        fileData.status = 'uploading';
        fileData.progress = 0;
        
        this.renderFiles();
        
        try {
            await this.simulateUpload(fileData);
            fileData.status = 'success';
            fileData.progress = 100;
        } catch (error) {
            fileData.status = 'error';
            fileData.error = error.message;
        }
        
        this.renderFiles();
        this.updateUI();
    }
    
    async simulateUpload(fileData) {
        // Simulate file upload with progress
        return new Promise((resolve, reject) => {
            const duration = 2000 + Math.random() * 3000; // 2-5 seconds
            const interval = 100;
            const increment = (interval / duration) * 100;
            
            const progressInterval = setInterval(() => {
                fileData.progress = Math.min(100, fileData.progress + increment);
                this.renderFiles();
                
                if (fileData.progress >= 100) {
                    clearInterval(progressInterval);
                    
                    // Simulate random failure (10% chance)
                    if (Math.random() < 0.1) {
                        reject(new Error('Network error occurred'));
                    } else {
                        resolve();
                    }
                }
            }, interval);
        });
    }
    
    async uploadAll() {
        const pendingFiles = Array.from(this.files.values())
            .filter(fileData => fileData.status === 'pending');
        
        const uploadPromises = pendingFiles.map(fileData => 
            this.uploadFile(fileData.id)
        );
        
        await Promise.all(uploadPromises);
    }
    
    removeFile(fileId) {
        this.files.delete(fileId);
        this.renderFiles();
        this.updateUI();
    }
    
    clearAll() {
        this.files.clear();
        this.renderFiles();
        this.updateUI();
    }
    
    updateUI() {
        const hasFiles = this.files.size > 0;
        const hasPendingFiles = Array.from(this.files.values())
            .some(fileData => fileData.status === 'pending');
        
        document.getElementById('uploadAllBtn').disabled = !hasPendingFiles;
        
        // Update file list visibility
        this.fileList.style.display = hasFiles ? 'block' : 'none';
    }
}

// Initialize file uploader
const fileUploader = new FileUploader();

// Make it globally accessible for onclick handlers
window.fileUploader = fileUploader;