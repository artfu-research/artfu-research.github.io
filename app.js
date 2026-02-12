// Main directory page logic
class DocumentDirectory {
    constructor() {
        this.documents = [];
        this.filteredDocuments = [];
        this.init();
    }

    async init() {
        await this.loadDocuments();
        this.setupEventListeners();
        this.populateFilters();
        this.renderTiles();
    }

    async loadDocuments() {
        try {
            const response = await fetch('documents-index.json');
            this.documents = await response.json();
            this.filteredDocuments = [...this.documents];
            console.log(`Loaded ${this.documents.length} documents`);
        } catch (error) {
            console.error('Error loading documents:', error);
            document.getElementById('loading').innerHTML = '<p>Error loading documents. Please try again.</p>';
        }
    }

    setupEventListeners() {
        document.getElementById('search').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        document.getElementById('filter-type').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('filter-project').addEventListener('change', () => {
            this.applyFilters();
        });
    }

    populateFilters() {
        const types = new Set();
        const projects = new Set();

        this.documents.forEach(doc => {
            if (doc.document_type) types.add(doc.document_type);
            if (doc.project) projects.add(doc.project);
        });

        const typeSelect = document.getElementById('filter-type');
        Array.from(types).sort().forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = this.formatLabel(type);
            typeSelect.appendChild(option);
        });

        const projectSelect = document.getElementById('filter-project');
        Array.from(projects).sort().forEach(project => {
            const option = document.createElement('option');
            option.value = project;
            option.textContent = this.formatLabel(project);
            projectSelect.appendChild(option);
        });
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            this.filteredDocuments = [...this.documents];
        } else {
            this.filteredDocuments = this.documents.filter(doc => {
                const searchableText = JSON.stringify(doc).toLowerCase();
                return searchableText.includes(searchTerm);
            });
        }
        
        this.applyFilters();
    }

    applyFilters() {
        const typeFilter = document.getElementById('filter-type').value;
        const projectFilter = document.getElementById('filter-project').value;

        let filtered = [...this.filteredDocuments];

        if (typeFilter) {
            filtered = filtered.filter(doc => doc.document_type === typeFilter);
        }

        if (projectFilter) {
            filtered = filtered.filter(doc => doc.project === projectFilter);
        }

        this.renderTiles(filtered);
    }

    renderTiles(documents = this.filteredDocuments) {
        const container = document.getElementById('tiles-container');
        const loading = document.getElementById('loading');
        const noResults = document.getElementById('no-results');

        loading.style.display = 'none';
        
        if (documents.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        container.innerHTML = '';

        const grouped = this.groupByDate(documents);
        
        Object.keys(grouped).sort().reverse().forEach(dateKey => {
            const dateHeader = document.createElement('h2');
            dateHeader.className = 'date-header';
            dateHeader.textContent = this.formatDate(dateKey);
            dateHeader.style.cssText = 'margin: 40px 0 20px 0; font-size: 1.5rem; color: #495057;';
            container.appendChild(dateHeader);

            grouped[dateKey].forEach(doc => {
                const tile = this.createTile(doc);
                container.appendChild(tile);
            });
        });
    }

    groupByDate(documents) {
        const grouped = {};
        
        documents.forEach(doc => {
            if (doc.date_created) {
                const dateKey = doc.date_created.split(' ')[0];
                if (!grouped[dateKey]) {
                    grouped[dateKey] = [];
                }
                grouped[dateKey].push(doc);
            }
        });

        return grouped;
    }

    createTile(doc) {
        const tile = document.createElement('div');
        tile.className = 'tile';

        const title = doc.title || 'Untitled Document';
        const project = doc.project || '';
        const docType = doc.document_type || '';
        const dateCreated = doc.date_created || '';
        const primaryFocus = doc.primary_focus || '';

        tile.innerHTML = `
            <div class="tile-header">
                <div class="tile-header-content">
                    <h3 class="tile-title">${this.escapeHtml(title)}</h3>
                    <div class="tile-meta">
                        ${project ? `<span class="tile-badge badge-project">${this.formatLabel(project)}</span>` : ''}
                        ${docType ? `<span class="tile-badge badge-type">${this.formatLabel(docType)}</span>` : ''}
                        ${dateCreated ? `<span class="tile-date">${this.formatDate(dateCreated)}</span>` : ''}
                    </div>
                    ${primaryFocus ? `<div class="tile-description">${this.escapeHtml(primaryFocus)}</div>` : ''}
                </div>
                <button class="tile-button" onclick="window.location.href='documents/${doc.slug}.html'">
                    View Details →
                </button>
            </div>
        `;

        return tile;
    }

    formatLabel(str) {
        if (!str) return '';
        return str
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateStr.split('-');
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        
        if (dateStr.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
            const [datePart] = dateStr.split(' ');
            const [year, month, day] = datePart.split('-');
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        
        return dateStr;
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DocumentDirectory();
});
