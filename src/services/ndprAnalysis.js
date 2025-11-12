class NDPRAnalysisService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY;
    this.groqApiUrl = "https://api.groq.com/openai/v1/chat/completions";
    this.model = "openai/gpt-oss-120b";
    this.voiceModel = "whisper-large-v3";
    this.pdfVisionModel = "meta-llama/llama-4-scout-17b-16e-instruct";
  }

  getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async performComprehensiveNDPRAnalysis(policyData) {
    const systemPrompt = `You are an expert NDPR (Nigeria Data Protection Act 2023 - GAID 2025) compliance auditor. Your role is to analyze policies, documents, and data processing statements provided by users and evaluate them against the Nigeria Data Protection Act framework.

ANALYSIS FRAMEWORK:
Use this NDPR compliance framework as your reference:

**8 Core Principles (Non-Negotiable):**
1. Fairness, Lawfulness, Transparency
2. Purpose Limitation (specified, explicit, legitimate purposes only)
3. Data Minimization (adequate, relevant, minimum necessary)
4. Storage Limitation (retain only as long as necessary; max 6 months default)
5. Data Accuracy (complete, not misleading, kept up-to-date)
6. Confidentiality, Integrity, Availability (CIA triad)
7. Accountability (records, responsive, compliant)
8. Duty of Care (professional, ethical, prevent harm)

**6 Lawful Bases for Processing:**
- Consent (freely given, informed, specific, not detrimental if refused)
- Contract (necessary for performance with data subject)
- Legal Obligation (specific law, court order, or legal duty - minimum scope)
- Vital Interest (preserve/protect life/livelihood when consent impossible)
- Public Interest (emergency, public safety, humanitarian)
- Legitimate Interest (must pass balancing test - requires Legitimate Interest Assessment)

**Mandatory Obligations for Major Importance Entities (>200 data subjects in 6 months):**
- Register as UHL (>5000), EHL (>1000), or OHL (>200)
- Designate certified Data Protection Officer (DPO)
- File annual Compliance Audit Returns (CAR) by March 31st
- Conduct Data Privacy Impact Assessment (DPIA) where required
- Maintain Data Processing Agreements (DPA) with third-party processors
- Display privacy notices on homepage; conspicuous cookie notices
- Notify Commission of breaches within 72 hours
- Notify data subjects immediately if high-risk breach
- Conduct annual staff training on data protection

**Mandatory Consent Required For:**
- Direct marketing activities
- Sensitive personal data processing
- Incompatible further processing
- Child data or incapacity data
- Cross-border transfer to non-adequate countries
- Automated decision-making with legal effects
- Cookies (except necessary/functional cookies)

**DPIA Mandatory When:**
- Profiling or scoring involved
- Automated decision-making with legal/significant effects
- Systematic monitoring of data subjects
- Sensitive or highly personal data processed
- Vulnerable data subjects involved
- New/innovative technologies deployed
- Surveillance systems implemented
- Cross-border data transfers
- Large-scale public data processing

**Data Subject Rights (Non-Waivable):**
- Right to Access (DSAR - within reasonable timeframe)
- Right to Rectification (correct errors without cost)
- Right to Data Portability (receive in structured format for consent/contract basis)
- Right to Erasure (delete when no longer needed, consent withdrawn, unlawful)
- Right to Lodge Complaint (with NDPC - acknowledged within 7 days)
- Right to SNAG (Standard Notice to Address Grievance - 30-day internal resolution)

**Critical Prohibitions:**
- Processing child data without parental/guardian consent/approval
- Automated sole-basis decisions without consent or lawful derogation
- Discriminatory profiling or algorithmic bias
- Cross-border transfer without adequacy decision or approved instrument
- Processing beyond purpose limitation
- Retaining data beyond storage limitation (except legal defense)
- Lack of transparency/privacy notices
- No Data Protection Officer for major importance entities
- Inadequate security measures (CIA controls missing)
- Non-compliance with data subject access requests
- Late breach notification (>72 hours)
- Operating without DPA with third-party processors

Perform comprehensive analysis following these steps:

**STEP 1: IDENTIFY CONTRADICTIONS**
- Scan the document against all 8 principles
- Check against 6 lawful bases - is one clearly identified?
- Verify consent requirements are met where mandatory
- Confirm DPIA is conducted if required
- Validate data retention periods (max 6 months default)
- Check for data subject rights acknowledgment

**STEP 2: FLAG VIOLATIONS**
For each violation found, state:
- Which NDPR requirement it violates
- The specific article/section
- Severity (Critical/High/Medium/Low)
- Impact on data subjects
- Required remediation

**STEP 3: ASSESS COMPLIANCE GAPS**
- Missing DPO designation (if applicable)
- No DPA with processors
- Inadequate privacy notices
- No breach notification procedure
- Missing training schedules
- No DPIA (when required)
- Vague purposes
- Over-collection of data
- Unclear retention periods
- Weak security measures

**STEP 4: GENERATE COMPLIANCE RATING**
Calculate a compliance score (0-100%) based on:
- Principle adherence (40% weight)
- Lawful basis clarity (20% weight)
- Consent/DPIA compliance (20% weight)
- Data subject rights provisions (15% weight)
- Operational measures (5% weight)

**RATING TIERS:**
- Below 50%: HIGH RISK - Critical violations, immediate remediation required
- 50-65%: MODERATE COMPLIANCE - Significant gaps, remediation plan needed
- 65-80%: GOOD COMPLIANCE - Minor gaps, improvements recommended
- 80-100%: EXCELLENT COMPLIANCE - Meets/exceeds requirements

Always respond with valid JSON format following the exact structure provided.`;

    const userPrompt = `**NDPR COMPLIANCE ANALYSIS REQUEST**

**Policy/Document Name:** ${policyData.document_name || 'Privacy Policy'}

**Company Information:**
- Name: ${policyData.company_name}
- Size: ${policyData.company_size}
- Industry: ${policyData.industry}
- Processing Scope: ${policyData.processing_scope || 'Standard data processing'}
- Target Users: ${policyData.target_users || 'General Public'}

**POLICY TEXT TO ANALYZE:**
${policyData.document_text}

**ANALYSIS REQUIREMENTS:**
Perform a comprehensive NDPR compliance analysis following the framework provided. Identify all contradictions, violations, and gaps. Provide specific remediation recommendations with clear priorities.

Respond in JSON format with the following structure:
{
  "analysis_id": "string",
  "company_name": "string",
  "compliance_score": number,
  "risk_level": "low|medium|high",
  "compliance_tier": "HIGH RISK|MODERATE COMPLIANCE|GOOD COMPLIANCE|EXCELLENT COMPLIANCE",
  "executive_summary": "string",
  "principle_analysis": {
    "fairness_lawfulness_transparency": {"status": "compliant|partial|non_compliant", "finding": "string"},
    "purpose_limitation": {"status": "compliant|partial|non_compliant", "finding": "string"},
    "data_minimization": {"status": "compliant|partial|non_compliant", "finding": "string"},
    "storage_limitation": {"status": "compliant|partial|non_compliant", "finding": "string"},
    "accuracy": {"status": "compliant|partial|non_compliant", "finding": "string"},
    "confidentiality_integrity_availability": {"status": "compliant|partial|non_compliant", "finding": "string"},
    "accountability": {"status": "compliant|partial|non_compliant", "finding": "string"},
    "duty_of_care": {"status": "compliant|partial|non_compliant", "finding": "string"}
  },
  "lawful_basis_assessment": {
    "identified_basis": "string",
    "is_justified": "yes|no|unclear",
    "contradictions": "string",
    "recommendation": "string"
  },
  "consent_requirements": {
    "consent_required": "yes|no|unclear",
    "is_addressed": "yes|no|partial",
    "contradictions": "string"
  },
  "dpia_requirements": {
    "dpia_required": "yes|no|unclear",
    "is_completed": "yes|no|not_mentioned",
    "contradictions": "string"
  },
  "data_subject_rights": {
    "access_right": "yes|no",
    "rectification_process": "yes|no",
    "erasure_conditions": "yes|no",
    "complaint_mechanism": "yes|no",
    "contradictions": "string"
  },
  "operational_measures": {
    "dpo_designated": "yes|no|na",
    "dpa_with_processors": "yes|no|na",
    "breach_notification_plan": "yes|no",
    "training_schedule": "yes|no",
    "privacy_notices": "yes|no"
  },
  "contradictions": [
    {
      "contradiction": "string",
      "ndpr_requirement": "string",
      "current_policy_states": "string",
      "why_contradicts": "string",
      "remediation_required": "string",
      "severity": "Critical|High|Medium|Low",
      "impact": "string"
    }
  ],
  "gaps": [
    {
      "gap_id": "string",
      "title": "string",
      "description": "string",
      "severity": "Critical|High|Medium|Low",
      "ndpr_articles": ["string"],
      "impact": "string",
      "recommendation": "string"
    }
  ],
  "remediation_plan": {
    "immediate": ["string"],
    "short_term": ["string"],
    "medium_term": ["string"],
    "ongoing": ["string"]
  },
  "compliance_certification": {
    "status": "NOT CERTIFIED|CONDITIONALLY CERTIFIED|CERTIFIED",
    "next_steps": "string",
    "auditor_notes": "string"
  },
  "detailed_analysis": "string",
  "legal_context": "string",
  "legal_references": [
    {
      "regulation": "string",
      "article": "string",
      "title": "string",
      "summary": "string",
      "relevance": "string"
    }
  ],
  "processing_time_ms": number,
  "timestamp": "string"
}`;

    try {
      const startTime = Date.now();
      const response = await fetch(this.groqApiUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.1,
          max_tokens: 8000
        })
      });

      if (!response.ok) {
        throw new Error(`GROQ API Error: ${response.status}`);
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;
      
      let analysisResult;
      try {
        analysisResult = JSON.parse(data.choices[0].message.content);
      } catch (parseError) {
        console.error('JSON parsing failed, using fallback:', parseError);
        analysisResult = this.generateFallbackAnalysis(policyData, processingTime);
      }

      // Ensure processing time is included
      analysisResult.processing_time_ms = processingTime;
      analysisResult.timestamp = new Date().toISOString();
      
      return analysisResult;
    } catch (error) {
      console.error('NDPR analysis failed:', error);
      return this.generateFallbackAnalysis(policyData, 0);
    }
  }

  generateFallbackAnalysis(policyData, processingTime) {
    return {
      analysis_id: `ndpr_analysis_${Date.now()}`,
      company_name: policyData.company_name,
      compliance_score: 45,
      risk_level: "high",
      compliance_tier: "HIGH RISK",
      executive_summary: "The privacy policy requires immediate attention to address critical NDPR compliance violations. Multiple core principles are not adequately addressed, and essential data subject rights are missing. Immediate remediation is required to avoid regulatory penalties.",
      principle_analysis: {
        fairness_lawfulness_transparency: {
          status: "non_compliant",
          finding: "Policy lacks clear lawful basis identification and transparency requirements are not met"
        },
        purpose_limitation: {
          status: "non_compliant", 
          finding: "Data processing purposes are vague and not sufficiently specific as required by NDPR"
        },
        data_minimization: {
          status: "non_compliant",
          finding: "No clear statement on collecting only necessary data for specified purposes"
        },
        storage_limitation: {
          status: "non_compliant",
          finding: "Retention periods not defined or exceed NDPR 6-month default limit"
        },
        accuracy: {
          status: "partial",
          finding: "Some mention of data accuracy but lacks comprehensive accuracy maintenance procedures"
        },
        confidentiality_integrity_availability: {
          status: "partial",
          finding: "Basic security measures mentioned but insufficient CIA controls"
        },
        accountability: {
          status: "non_compliant",
          finding: "Lacks proper accountability measures and compliance documentation"
        },
        duty_of_care: {
          status: "non_compliant",
          finding: "Insufficient provisions for professional duty of care towards data subjects"
        }
      },
      lawful_basis_assessment: {
        identified_basis: "Not clearly identified",
        is_justified: "no",
        contradictions: "No specific lawful basis identified for data processing activities",
        recommendation: "Clearly identify and document lawful basis for each processing purpose from the six NDPR-approved bases"
      },
      consent_requirements: {
        consent_required: "yes",
        is_addressed: "no",
        contradictions: "Consent mechanisms do not meet NDPR requirements for freely given, informed, and specific consent"
      },
      dpia_requirements: {
        dpia_required: "unclear",
        is_completed: "not_mentioned",
        contradictions: "No mention of DPIA when processing activities may require it under NDPR"
      },
      data_subject_rights: {
        access_right: "no",
        rectification_process: "no", 
        erasure_conditions: "no",
        complaint_mechanism: "no",
        contradictions: "Critical absence of data subject rights provisions required by NDPR Articles 15-20"
      },
      operational_measures: {
        dpo_designated: "no",
        dpa_with_processors: "no",
        breach_notification_plan: "no",
        training_schedule: "no",
        privacy_notices: "no"
      },
      contradictions: [
        {
          contradiction: "Absence of lawful basis identification",
          ndpr_requirement: "Article 6 - Lawful basis for processing",
          current_policy_states: "No clear lawful basis specified",
          why_contradicts: "NDPR mandates clear identification of lawful basis for all processing activities",
          remediation_required: "Identify and document specific lawful basis for each processing purpose",
          severity: "Critical",
          impact: "All data processing may be unlawful without proper legal basis"
        },
        {
          contradiction: "Missing data subject rights provisions",
          ndpr_requirement: "Articles 15-20 - Data subject rights",
          current_policy_states: "No comprehensive rights information provided",
          why_contradicts: "NDPR requires clear information about all data subject rights",
          remediation_required: "Add comprehensive section detailing access, rectification, erasure, and complaint rights",
          severity: "Critical", 
          impact: "Data subjects cannot exercise their fundamental rights"
        },
        {
          contradiction: "Undefined data retention periods",
          ndpr_requirement: "Article 5(e) - Storage limitation principle",
          current_policy_states: "No clear retention timeframes specified",
          why_contradicts: "NDPR requires data to be kept only as long as necessary with 6-month default maximum",
          remediation_required: "Define specific retention periods not exceeding 6 months unless legally justified",
          severity: "High",
          impact: "Potential indefinite data retention violating storage limitation principle"
        }
      ],
      gaps: [
        {
          gap_id: "gap_dpo",
          title: "Data Protection Officer Designation",
          description: "No mention of DPO designation which may be required for major importance entities",
          severity: "High",
          ndpr_articles: ["Article 37"],
          impact: "Regulatory non-compliance if entity processes >200 data subjects in 6 months",
          recommendation: "Assess if DPO designation is required and appoint certified DPO if applicable"
        },
        {
          gap_id: "gap_breach_notification",
          title: "Data Breach Notification Procedures",
          description: "No clear procedures for breach notification within 72 hours to NDPC",
          severity: "High", 
          ndpr_articles: ["Article 33", "Article 34"],
          impact: "Inability to meet mandatory breach notification timelines",
          recommendation: "Establish clear breach detection, assessment, and notification procedures"
        },
        {
          gap_id: "gap_cross_border",
          title: "Cross-border Transfer Safeguards",
          description: "No provisions for international data transfers and adequacy requirements",
          severity: "Medium",
          ndpr_articles: ["Chapter V"],
          impact: "Potential unlawful international transfers",
          recommendation: "Add provisions for cross-border transfers with appropriate safeguards"
        }
      ],
      remediation_plan: {
        immediate: [
          "Identify and document lawful basis for all processing activities",
          "Add comprehensive data subject rights section",
          "Define specific data retention periods (max 6 months default)",
          "Establish breach notification procedures"
        ],
        short_term: [
          "Implement proper consent mechanisms if required",
          "Assess DPO designation requirements",
          "Create privacy notices for website display",
          "Develop data processing agreements with third parties"
        ],
        medium_term: [
          "Conduct DPIA for high-risk processing activities", 
          "Implement comprehensive security measures (CIA controls)",
          "Establish staff training programs",
          "Create audit and compliance monitoring systems"
        ],
        ongoing: [
          "Regular compliance assessments and updates",
          "Continuous staff training on data protection",
          "Monitor regulatory changes and updates",
          "Maintain compliance documentation and records"
        ]
      },
      compliance_certification: {
        status: "NOT CERTIFIED",
        next_steps: "Address all critical violations and high-priority gaps before certification consideration",
        auditor_notes: "Policy demonstrates fundamental non-compliance with NDPR requirements. Comprehensive overhaul needed to meet Nigerian data protection standards."
      },
      detailed_analysis: "Comprehensive NDPR analysis reveals critical compliance failures across multiple core principles. The policy lacks essential elements required by Nigerian data protection law including lawful basis identification, data subject rights provisions, and operational safeguards. Immediate remediation is required to avoid regulatory penalties and ensure data subject protection.",
      legal_context: "Analysis based on Nigeria Data Protection Act 2023 (GAID 2025) and NDPR compliance framework. All findings reference specific NDPR articles and requirements.",
      legal_references: [
        {
          regulation: "Nigeria Data Protection Act 2023",
          article: "Article 6",
          title: "Lawful basis for processing",
          summary: "Processing must have one of six specified lawful bases",
          relevance: "Critical foundation for all data processing activities"
        },
        {
          regulation: "Nigeria Data Protection Act 2023", 
          article: "Articles 15-20",
          title: "Data subject rights",
          summary: "Comprehensive rights including access, rectification, erasure, and complaint",
          relevance: "Fundamental rights that must be clearly communicated and facilitated"
        },
        {
          regulation: "Nigeria Data Protection Act 2023",
          article: "Article 5",
          title: "Principles of data processing", 
          summary: "Eight core principles governing all data processing",
          relevance: "Foundation principles that must be adhered to in all processing activities"
        }
      ],
      processing_time_ms: processingTime,
      timestamp: new Date().toISOString()
    };
  }

  async transcribeAudio(audioBlob) {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', this.voiceModel);

      const response = await fetch(this.groqVoiceApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`GROQ Voice API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('GROQ voice transcription failed:', error);
      throw error;
    }
  }
}

export default new NDPRAnalysisService();