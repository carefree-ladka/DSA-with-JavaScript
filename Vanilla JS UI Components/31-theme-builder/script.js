class ThemeBuilder {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('primaryColor').addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--primary-color', e.target.value);
        });
        
        document.getElementById('backgroundColor').addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--bg-color', e.target.value);
        });
        
        document.getElementById('textColor').addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--text-color', e.target.value);
        });

        // System theme detection
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.currentTheme === 'system') {
                this.applySystemTheme();
            }
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    applyTheme(theme) {
        document.documentElement.removeAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'system') {
            this.applySystemTheme();
        }
    }

    applySystemTheme() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }

    exportTheme() {
        const theme = {
            primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim(),
            textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
            mode: this.currentTheme
        };
        
        const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'theme.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    importTheme() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const theme = JSON.parse(e.target.result);
                        this.applyCustomTheme(theme);
                    } catch (error) {
                        alert('Invalid theme file');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    applyCustomTheme(theme) {
        document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
        document.documentElement.style.setProperty('--bg-color', theme.backgroundColor);
        document.documentElement.style.setProperty('--text-color', theme.textColor);
        
        document.getElementById('primaryColor').value = theme.primaryColor;
        document.getElementById('backgroundColor').value = theme.backgroundColor;
        document.getElementById('textColor').value = theme.textColor;
    }

    saveTheme(theme) {
        localStorage.setItem('selectedTheme', theme);
    }

    loadTheme() {
        return localStorage.getItem('selectedTheme') || 'light';
    }
}

const themeBuilder = new ThemeBuilder();