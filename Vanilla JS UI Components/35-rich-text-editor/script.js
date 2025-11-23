class RichTextEditor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.history = [];
        this.historyIndex = -1;
        this.maxHistory = 50;
        this.init();
    }

    init() {
        this.saveState();
        this.setupEventListeners();
        this.updateCounts();
    }

    setupEventListeners() {
        this.editor.addEventListener('input', () => {
            this.updateCounts();
            this.saveState();
        });

        this.editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'b':
                        e.preventDefault();
                        this.execCommand('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.execCommand('italic');
                        break;
                    case 'u':
                        e.preventDefault();
                        this.execCommand('underline');
                        break;
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
                        }
                        break;
                }
            }
        });

        this.editor.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
        });

        // Update toolbar button states
        this.editor.addEventListener('selectionchange', () => {
            this.updateToolbarState();
        });

        document.addEventListener('selectionchange', () => {
            if (document.activeElement === this.editor) {
                this.updateToolbarState();
            }
        });
    }

    execCommand(command, value = null) {
        this.editor.focus();
        document.execCommand(command, false, value);
        this.saveState();
        this.updateToolbarState();
    }

    updateToolbarState() {
        const commands = ['bold', 'italic', 'underline'];
        commands.forEach(command => {
            const button = document.querySelector(`[onclick="editor.execCommand('${command}')"]`);
            if (button) {
                button.classList.toggle('active', document.queryCommandState(command));
            }
        });
    }

    saveState() {
        const content = this.editor.innerHTML;
        
        // Don't save if content hasn't changed
        if (this.history[this.historyIndex] === content) return;
        
        // Remove future history if we're not at the end
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        this.history.push(content);
        
        // Limit history size
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        } else {
            this.historyIndex++;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.editor.innerHTML = this.history[this.historyIndex];
            this.updateCounts();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.editor.innerHTML = this.history[this.historyIndex];
            this.updateCounts();
        }
    }

    insertLink() {
        const url = prompt('Enter URL:');
        if (url) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedText = range.toString();
                
                if (selectedText) {
                    this.execCommand('createLink', url);
                } else {
                    const link = document.createElement('a');
                    link.href = url;
                    link.textContent = url;
                    range.insertNode(link);
                    this.saveState();
                }
            }
        }
    }

    insertImage() {
        const url = prompt('Enter image URL:');
        if (url) {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Inserted image';
            img.style.maxWidth = '100%';
            
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.insertNode(img);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                this.saveState();
            }
        }
    }

    updateCounts() {
        const text = this.editor.textContent || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        
        document.getElementById('wordCount').textContent = `Words: ${words}`;
        document.getElementById('charCount').textContent = `Characters: ${chars}`;
    }

    getContent() {
        return this.editor.innerHTML;
    }

    setContent(html) {
        this.editor.innerHTML = html;
        this.saveState();
        this.updateCounts();
    }

    getPlainText() {
        return this.editor.textContent || '';
    }
}

const editor = new RichTextEditor();