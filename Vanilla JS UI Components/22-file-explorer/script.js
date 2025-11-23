class FileExplorer {
    constructor() {
        this.fileSystem = this.getSampleFileSystem();
        this.selectedItem = null;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    getSampleFileSystem() {
        return {
            name: 'project-root',
            type: 'folder',
            expanded: true,
            children: [
                {
                    name: 'src',
                    type: 'folder',
                    expanded: true,
                    children: [
                        {
                            name: 'components',
                            type: 'folder',
                            expanded: false,
                            children: [
                                { name: 'Header.js', type: 'file' },
                                { name: 'Footer.js', type: 'file' },
                                { name: 'Sidebar.js', type: 'file' }
                            ]
                        },
                        {
                            name: 'utils',
                            type: 'folder',
                            expanded: false,
                            children: [
                                { name: 'helpers.js', type: 'file' },
                                { name: 'constants.js', type: 'file' }
                            ]
                        },
                        { name: 'index.js', type: 'file' },
                        { name: 'App.js', type: 'file' },
                        { name: 'styles.css', type: 'file' }
                    ]
                },
                {
                    name: 'public',
                    type: 'folder',
                    expanded: false,
                    children: [
                        { name: 'index.html', type: 'file' },
                        { name: 'favicon.ico', type: 'file' }
                    ]
                },
                {
                    name: 'docs',
                    type: 'folder',
                    expanded: false,
                    children: [
                        { name: 'README.md', type: 'file' },
                        { name: 'API.md', type: 'file' },
                        {
                            name: 'examples',
                            type: 'folder',
                            expanded: false,
                            children: [
                                { name: 'basic.js', type: 'file' },
                                { name: 'advanced.py', type: 'file' }
                            ]
                        }
                    ]
                },
                { name: 'package.json', type: 'file' },
                { name: '.gitignore', type: 'file' },
                { name: 'webpack.config.js', type: 'file' }
            ]
        };
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const treeItem = e.target.closest('.tree-item');
            if (!treeItem) return;

            const path = treeItem.dataset.path;
            const item = this.findItemByPath(path);

            if (e.target.closest('.toggle-icon') && item.type === 'folder') {
                this.toggleFolder(item);
                this.render();
            } else {
                this.selectItem(treeItem, item);
            }
        });
    }

    findItemByPath(path, root = this.fileSystem, currentPath = '') {
        const fullPath = currentPath ? `${currentPath}/${root.name}` : root.name;
        
        if (fullPath === path) return root;
        
        if (root.children) {
            for (const child of root.children) {
                const found = this.findItemByPath(path, child, fullPath);
                if (found) return found;
            }
        }
        
        return null;
    }

    toggleFolder(folder) {
        folder.expanded = !folder.expanded;
    }

    selectItem(element, item) {
        document.querySelectorAll('.tree-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedItem = item;
    }

    getFileIcon(fileName, type) {
        if (type === 'folder') {
            return '📁';
        }
        
        const ext = fileName.split('.').pop().toLowerCase();
        const icons = {
            js: '📄',
            html: '🌐',
            css: '🎨',
            json: '⚙️',
            md: '📝',
            py: '🐍',
            java: '☕',
            cpp: '⚡',
            xml: '📋',
            ico: '🖼️'
        };
        
        return icons[ext] || '📄';
    }

    getFileExtension(fileName) {
        if (fileName.startsWith('.')) return 'hidden';
        return fileName.split('.').pop().toLowerCase();
    }

    render() {
        const container = document.getElementById('fileTree');
        container.innerHTML = this.renderTree(this.fileSystem);
    }

    renderTree(item, depth = 0, path = '') {
        const currentPath = path ? `${path}/${item.name}` : item.name;
        const indent = '  '.repeat(depth);
        
        let html = '';
        
        if (item.type === 'folder') {
            const toggleIcon = item.expanded ? '▼' : '▶';
            const folderIcon = this.getFileIcon(item.name, 'folder');
            
            html += `
                <div class="tree-item folder" data-path="${currentPath}">
                    ${indent ? `<div class="indent" style="width: ${depth * 16}px;"></div>` : ''}
                    <div class="toggle-icon ${!item.expanded ? 'collapsed' : ''}">${toggleIcon}</div>
                    <div class="file-icon folder ${item.expanded ? 'open' : ''}">${folderIcon}</div>
                    <div class="file-name">${item.name}</div>
                </div>
            `;
            
            if (item.expanded && item.children) {
                html += `<div class="children expanded">`;
                for (const child of item.children) {
                    html += this.renderTree(child, depth + 1, currentPath);
                }
                html += `</div>`;
            }
        } else {
            const fileIcon = this.getFileIcon(item.name, 'file');
            const extension = this.getFileExtension(item.name);
            
            html += `
                <div class="tree-item file" data-path="${currentPath}">
                    ${depth > 0 ? `<div class="indent" style="width: ${depth * 16}px;"></div>` : ''}
                    <div class="file-icon ${extension}">${fileIcon}</div>
                    <div class="file-name">${item.name}</div>
                </div>
            `;
        }
        
        return html;
    }
}

// Initialize the file explorer
const fileExplorer = new FileExplorer();