// Document view page logic
// documentData is embedded in the HTML page

class DocumentViewer {
    constructor(data) {
        this.data = data;
        this.init();
    }

    init() {
        this.renderDocument();
        this.setupViewNavigation();
    }

    renderDocument() {
        const container = document.getElementById('document-container');
        
        const classification = this.data.classification?.classification || {};
        const baseMetadata = this.data.base_metadata || {};

        const title = classification.document_title || 'Untitled Document';
        const project = classification.project || '';
        const docType = classification.document_type || '';
        const dateCreated = baseMetadata.date_created || '';

        // Create header
        const header = document.createElement('div');
        header.className = 'document-header';
        header.innerHTML = `
            <h1 class="document-title">${this.escapeHtml(title)}</h1>
            <div class="document-meta">
                ${project ? `<span class="document-badge badge-project">${this.formatLabel(project)}</span>` : ''}
                ${docType ? `<span class="document-badge badge-type">${this.formatLabel(docType)}</span>` : ''}
                ${dateCreated ? `<span class="document-date">${this.formatDate(dateCreated)}</span>` : ''}
            </div>
        `;
        container.appendChild(header);

        // Create views
        const views = [
            { id: 'quality', label: 'Document Quality', data: this.data.document_quality },
            { id: 'classification', label: 'Classification', data: this.data.classification },
            { id: 'conceptual', label: 'Conceptual Assessment', data: this.data.conceptual_assessment },
            { id: 'analysis', label: 'Analysis', data: this.data.analysis },
            { id: 'semantic', label: 'Semantic Analysis', data: this.data.semantic_analysis },
            { id: 'contextual', label: 'Contextual Framing', data: this.data.contextual_framing },
            { id: 'validity', label: 'Validity & Integrity', data: this.data.validity_integrity },
            { id: 'external', label: 'External Value', data: this.data.external_value },
            { id: 'seo', label: 'SEO', data: this.data.seo },
            { id: 'quotes', label: 'Quotes', data: this.data.quotes }
        ].filter(view => view.data);

        // Create navigation
        const nav = document.createElement('div');
        nav.className = 'view-navigation';

        views.forEach((view, index) => {
            const button = document.createElement('button');
            button.className = `view-button ${index === 0 ? 'active' : ''}`;
            button.textContent = view.label;
            button.dataset.viewId = view.id;
            nav.appendChild(button);
        });

        container.appendChild(nav);

        // Create view contents
        views.forEach((view, index) => {
            const viewContent = document.createElement('div');
            viewContent.className = `view-content ${index === 0 ? 'active' : ''}`;
            viewContent.dataset.viewId = view.id;
            viewContent.innerHTML = this.renderViewData(view.id, view.data);
            container.appendChild(viewContent);
        });
    }

    setupViewNavigation() {
        const buttons = document.querySelectorAll('.view-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const viewId = button.dataset.viewId;
                
                // Update active button
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active view
                document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
                document.querySelector(`.view-content[data-view-id="${viewId}"]`).classList.add('active');
            });
        });
    }

    renderViewData(viewId, data) {
        const renderers = {
            quality: () => this.renderDocumentQuality(data),
            classification: () => this.renderClassification(data),
            conceptual: () => this.renderConceptualAssessment(data),
            analysis: () => this.renderAnalysis(data),
            semantic: () => this.renderSemanticAnalysis(data),
            contextual: () => this.renderContextualFraming(data),
            validity: () => this.renderValidityIntegrity(data),
            external: () => this.renderExternalValue(data),
            seo: () => this.renderSEO(data),
            quotes: () => this.renderQuotes(data)
        };

        return renderers[viewId] ? renderers[viewId]() : '<p>No data available</p>';
    }

    renderDocumentQuality(data) {
        const quality = data.document_quality || {};
        
        return `
            <div class="data-section">
                <h4 class="section-title">Writing Quality</h4>
                <div class="data-grid">
                    ${this.renderErrorMetric('Grammar', quality.grammar_errors)}
                    ${this.renderErrorMetric('Spelling', quality.spelling_errors)}
                    ${this.renderErrorMetric('Punctuation', quality.punctuation_errors)}
                </div>
            </div>
            
            <div class="data-section">
                <h4 class="section-title">Expertise Assessment</h4>
                <div class="data-item">
                    <div class="data-label">Author Expertise Level</div>
                    <div class="data-value">
                        ${this.renderScaleBadge(quality.author_expertise_level?.level || 'unknown')}
                        <p style="margin-top: 8px; color: #666; font-size: 0.95rem;">
                            ${quality.author_expertise_level?.scale_definitions?.[quality.author_expertise_level?.level] || ''}
                        </p>
                    </div>
                </div>
                <div class="data-item">
                    <div class="data-label">Intended Audience Level</div>
                    <div class="data-value">
                        ${this.renderScaleBadge(quality.intended_audience_level?.level || 'unknown')}
                        <p style="margin-top: 8px; color: #666; font-size: 0.95rem;">
                            ${quality.intended_audience_level?.scale_definitions?.[quality.intended_audience_level?.level] || ''}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    renderErrorMetric(label, errorData) {
        if (!errorData) return '';
        
        return `
            <div class="data-item">
                <div class="data-label">${label} Errors</div>
                <div class="data-value">
                    <strong>${errorData.count || 0}</strong> errors
                    ${errorData.severity ? `<br>${this.renderScaleBadge(errorData.severity.level)}` : ''}
                </div>
            </div>
        `;
    }

    renderClassification(data) {
        const classification = data.classification || {};
        
        return `
            <div class="data-section">
                <div class="data-item">
                    <div class="data-label">Primary Focus</div>
                    <div class="data-value">${this.escapeHtml(classification.primary_focus || 'N/A')}</div>
                </div>
                <div class="data-item">
                    <div class="data-label">Document Type</div>
                    <div class="data-value">${this.formatLabel(classification.document_type || 'N/A')}</div>
                </div>
                <div class="data-item">
                    <div class="data-label">Stage</div>
                    <div class="data-value">${this.formatLabel(classification.stage || 'N/A')}</div>
                </div>
                <div class="data-item">
                    <div class="data-label">Status</div>
                    <div class="data-value">${this.formatLabel(classification.document_status || 'N/A')}</div>
                </div>
                ${classification.has_subprojects && classification.subprojects?.length > 0 ? `
                    <div class="data-item">
                        <div class="data-label">Subprojects</div>
                        <div class="data-value tag-list">
                            ${classification.subprojects.map(sp => `<span class="tag">${this.escapeHtml(sp)}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderConceptualAssessment(data) {
        const assessment = data.conceptual_assessment || {};
        
        return `
            <div class="data-section">
                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-label">Conceptual Density</div>
                        <div class="data-value">${this.formatLabel(assessment.conceptual_density || 'N/A')}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Conceptual Value</div>
                        <div class="data-value">${this.formatLabel(assessment.conceptual_value || 'N/A')}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Novelty</div>
                        <div class="data-value">${this.formatLabel(assessment.novelty || 'N/A')}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Confidence/Stability</div>
                        <div class="data-value">${this.formatLabel(assessment.confidence_stability || 'N/A')}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Audience Readiness</div>
                        <div class="data-value">${this.formatLabel(assessment.audience_readiness || 'N/A')}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Document Polish</div>
                        <div class="data-value">${this.formatLabel(assessment.document_polish || 'N/A')}</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAnalysis(data) {
        const analysis = data.analysis || {};
        
        return `
            ${analysis.synopsis ? `
                <div class="data-section">
                    <h4 class="section-title">Synopsis</h4>
                    <div class="data-value">${this.escapeHtml(analysis.synopsis)}</div>
                </div>
            ` : ''}
            
            ${analysis.breakthrough_moments?.has_breakthroughs && analysis.breakthrough_moments.moments?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Breakthrough Moments</h4>
                    <ul class="data-list">
                        ${analysis.breakthrough_moments.moments.map(moment => `
                            <li>${this.escapeHtml(moment)}</li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${analysis.key_concepts?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Key Concepts</h4>
                    <div class="tag-list">
                        ${analysis.key_concepts.map(concept => `<span class="tag">${this.escapeHtml(concept)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${analysis.domains?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Domains</h4>
                    <div class="tag-list">
                        ${analysis.domains.map(domain => `<span class="tag">${this.formatLabel(domain)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${analysis.tags?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Tags</h4>
                    <div class="tag-list">
                        ${analysis.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${analysis.keywords?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Keywords</h4>
                    <div class="tag-list">
                        ${analysis.keywords.map(keyword => `<span class="tag">${this.escapeHtml(keyword)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    renderSemanticAnalysis(data) {
        const semantic = data.semantic_analysis || {};
        const spine = semantic.semantic_spine || {};
        const timeRelevance = semantic.time_relevance || {};
        
        return `
            ${spine.central_meaning ? `
                <div class="data-section">
                    <h4 class="section-title">Central Meaning</h4>
                    <div class="data-value">${this.escapeHtml(spine.central_meaning)}</div>
                </div>
            ` : ''}
            
            ${spine.change_in_understanding ? `
                <div class="data-section">
                    <h4 class="section-title">Change in Understanding</h4>
                    <div class="data-value">${this.escapeHtml(spine.change_in_understanding)}</div>
                </div>
            ` : ''}
            
            ${spine.why_it_matters ? `
                <div class="data-section">
                    <h4 class="section-title">Why It Matters</h4>
                    <div class="data-item">
                        <div class="data-label">Direction</div>
                        <div class="data-value">${this.escapeHtml(spine.why_it_matters.direction || '')}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Magnitude</div>
                        <div class="data-value">${this.formatLabel(spine.why_it_matters.magnitude || '')}</div>
                    </div>
                </div>
            ` : ''}
            
            <div class="data-section">
                <h4 class="section-title">Time Relevance</h4>
                <div class="data-grid">
                    ${Object.entries(timeRelevance).map(([key, value]) => `
                        <div class="data-item">
                            <div class="data-label">${this.formatLabel(key)}</div>
                            <div class="data-value">${value ? '✓' : '✗'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderContextualFraming(data) {
        const framing = data.contextual_framing || {};
        
        return `
            ${framing.questions_addressed?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Questions Addressed</h4>
                    <ul class="data-list">
                        ${framing.questions_addressed.map(q => `<li>${this.escapeHtml(q)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${framing.implications?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Implications</h4>
                    <ul class="data-list">
                        ${framing.implications.map(imp => `<li>${this.escapeHtml(imp)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${framing.daydream_questions?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Daydream Questions</h4>
                    <ul class="data-list">
                        ${framing.daydream_questions.map(q => `<li>${this.escapeHtml(q)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
    }

    renderValidityIntegrity(data) {
        const validity = data.validity_integrity || {};
        const claimVerification = validity.claim_verification || {};
        const logicConsistency = validity.logic_consistency || {};
        const methodological = validity.methodological_soundness || {};
        
        return `
            <div class="data-section">
                <h4 class="section-title">Claim Verification</h4>
                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-label">Hallucination Risk</div>
                        <div class="data-value">${this.renderScaleBadge(claimVerification.hallucination_risk?.level || 'unknown')}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Citation Quality</div>
                        <div class="data-value">${this.renderScaleBadge(claimVerification.citation_quality?.level || 'unknown')}</div>
                    </div>
                </div>
                ${claimVerification.unverified_claims?.claims?.length > 0 ? `
                    <div class="data-item">
                        <div class="data-label">Unverified Claims</div>
                        <ul class="data-list">
                            ${claimVerification.unverified_claims.claims.map(claim => `<li>${this.escapeHtml(claim)}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            
            <div class="data-section">
                <h4 class="section-title">Logic Consistency</h4>
                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-label">Has Contradictions</div>
                        <div class="data-value">${logicConsistency.has_contradictions ? 'Yes' : 'No'}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Has Fallacies</div>
                        <div class="data-value">${logicConsistency.has_fallacies ? 'Yes' : 'No'}</div>
                    </div>
                </div>
                ${logicConsistency.contradictions?.items?.length > 0 ? `
                    <div class="data-item">
                        <div class="data-label">Contradictions</div>
                        <ul class="data-list">
                            ${logicConsistency.contradictions.items.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${logicConsistency.fallacies_detected?.items?.length > 0 ? `
                    <div class="data-item">
                        <div class="data-label">Fallacies Detected</div>
                        <ul class="data-list">
                            ${logicConsistency.fallacies_detected.items.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            
            ${methodological.applicable ? `
                <div class="data-section">
                    <h4 class="section-title">Methodological Soundness</h4>
                    <div class="data-item">
                        <div class="data-label">Reproducibility Score</div>
                        <div class="data-value">${methodological.reproducibility_score?.score || 0} / 10</div>
                    </div>
                    ${methodological.has_methodological_flaws && methodological.flaws?.items?.length > 0 ? `
                        <div class="data-item">
                            <div class="data-label">Methodological Flaws</div>
                            <ul class="data-list">
                                ${methodological.flaws.items.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        `;
    }

    renderExternalValue(data) {
        const external = data.external_value || {};
        
        return `
            ${external.relevant_fields?.fields?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Relevant Fields</h4>
                    <div class="tag-list">
                        ${external.relevant_fields.fields.map(field => `<span class="tag">${this.formatLabel(field)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${external.relevant_disciplines?.disciplines?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Relevant Disciplines</h4>
                    <div class="tag-list">
                        ${external.relevant_disciplines.disciplines.map(disc => `<span class="tag">${this.formatLabel(disc)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${external.industry_relevance?.sectors?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Industry Relevance</h4>
                    <div class="tag-list">
                        ${external.industry_relevance.sectors.map(sector => `<span class="tag">${this.formatLabel(sector)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${external.potential_collaborators ? `
                <div class="data-section">
                    <h4 class="section-title">Potential Collaborators</h4>
                    
                    ${external.potential_collaborators.researcher_types?.length > 0 ? `
                        <div class="data-item">
                            <div class="data-label">Researcher Types</div>
                            <div class="tag-list">
                                ${external.potential_collaborators.researcher_types.map(type => `<span class="tag">${this.formatLabel(type)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${external.potential_collaborators.institution_types?.length > 0 ? `
                        <div class="data-item">
                            <div class="data-label">Institution Types</div>
                            <div class="tag-list">
                                ${external.potential_collaborators.institution_types.map(type => `<span class="tag">${this.formatLabel(type)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${external.potential_collaborators.specific_targets ? `
                        <div class="nested-object">
                            <h5 style="margin-bottom: 12px; font-weight: 600;">Specific Targets</h5>
                            
                            ${external.potential_collaborators.specific_targets.institutions?.length > 0 ? `
                                <div class="data-item">
                                    <div class="data-label">Institutions</div>
                                    <ul class="data-list">
                                        ${external.potential_collaborators.specific_targets.institutions.map(inst => `<li>${this.escapeHtml(inst)}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${external.potential_collaborators.specific_targets.companies?.length > 0 ? `
                                <div class="data-item">
                                    <div class="data-label">Companies</div>
                                    <ul class="data-list">
                                        ${external.potential_collaborators.specific_targets.companies.map(comp => `<li>${this.escapeHtml(comp)}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${external.potential_collaborators.specific_targets.individuals?.length > 0 ? `
                                <div class="data-item">
                                    <div class="data-label">Individuals</div>
                                    <ul class="data-list">
                                        ${external.potential_collaborators.specific_targets.individuals.map(ind => `<li>${this.escapeHtml(ind)}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${external.potential_collaborators.specific_targets.research_groups?.length > 0 ? `
                                <div class="data-item">
                                    <div class="data-label">Research Groups</div>
                                    <ul class="data-list">
                                        ${external.potential_collaborators.specific_targets.research_groups.map(group => `<li>${this.escapeHtml(group)}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        `;
    }

    renderSEO(data) {
        const seo = data.seo || {};
        
        return `
            ${seo.meta_description?.value ? `
                <div class="data-section">
                    <h4 class="section-title">Meta Description</h4>
                    <div class="data-value">${this.escapeHtml(seo.meta_description.value)}</div>
                </div>
            ` : ''}
            
            ${seo.meta_keywords?.keywords?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Meta Keywords</h4>
                    <div class="tag-list">
                        ${seo.meta_keywords.keywords.map(kw => `<span class="tag">${this.escapeHtml(kw)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${seo.og_tags ? `
                <div class="data-section">
                    <h4 class="section-title">Open Graph Tags</h4>
                    <div class="data-grid">
                        ${seo.og_tags.og_title?.value ? `
                            <div class="data-item">
                                <div class="data-label">OG Title</div>
                                <div class="data-value">${this.escapeHtml(seo.og_tags.og_title.value)}</div>
                            </div>
                        ` : ''}
                        ${seo.og_tags.og_description?.value ? `
                            <div class="data-item">
                                <div class="data-label">OG Description</div>
                                <div class="data-value">${this.escapeHtml(seo.og_tags.og_description.value)}</div>
                            </div>
                        ` : ''}
                        ${seo.og_tags.og_type?.value ? `
                            <div class="data-item">
                                <div class="data-label">OG Type</div>
                                <div class="data-value">${this.escapeHtml(seo.og_tags.og_type.value)}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
            
            ${seo.primary_keywords?.keywords?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Primary Keywords</h4>
                    <div class="tag-list">
                        ${seo.primary_keywords.keywords.map(kw => `<span class="tag">${this.escapeHtml(kw)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${seo.search_terms?.terms?.length > 0 ? `
                <div class="data-section">
                    <h4 class="section-title">Search Terms</h4>
                    <ul class="data-list">
                        ${seo.search_terms.terms.map(term => `<li>${this.escapeHtml(term)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
    }

    renderQuotes(data) {
        const quotes = data.quotes || {};
        
        if (!quotes.has_quotable_content || !quotes.extracted_quotes?.quotes?.length) {
            return '<p style="color: #666; font-style: italic;">No quotable content found in this document.</p>';
        }
        
        return `
            <div class="data-section">
                ${quotes.extracted_quotes.quotes.map(quote => `
                    <div style="margin-bottom: 20px; padding: 16px; background-color: #f8f9fa; border-left: 4px solid #4a90e2; border-radius: 4px;">
                        <p style="font-style: italic; margin-bottom: 8px;">"${this.escapeHtml(quote)}"</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderScaleBadge(level) {
        const formatted = this.formatLabel(level);
        const className = `scale-badge scale-${level.replace(/_/g, '-')}`;
        return `<span class="${className}">${formatted}</span>`;
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DocumentViewer(documentData);
});
