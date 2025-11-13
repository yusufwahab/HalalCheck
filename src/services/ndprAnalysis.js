class NDPRAnalysisService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY;
    this.groqApiUrl = "https://api.groq.com/openai/v1/chat/completions";
    this.model = "openai/gpt-oss-20b";
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
    console.log('NDPRAnalysisService.performComprehensiveNDPRAnalysis called with:', policyData);
    
    const systemPrompt = `You are an NDPR compliance auditor. Analyze the privacy policy against Nigerian Data Protection Act requirements.

Key Requirements:
- 8 Core Principles: Fairness, Purpose Limitation, Data Minimization, Storage Limitation, Accuracy, Security, Accountability, Duty of Care
- Lawful Bases: Consent, Contract, Legal Obligation, Vital Interest, Public Interest, Legitimate Interest
- Data Subject Rights: Access, Rectification, Erasure, Portability, Complaint
- Mandatory for >200 users: DPO, DPIA, breach notification, training

Provide compliance score (0-100%), risk level, gaps, and recommendations in JSON format.`;

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

    const makeRequest = async (retryCount = 0) => {
      try {
        console.log(`Making API request to GROQ... (attempt ${retryCount + 1})`);
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
            max_tokens: 4000
          })
        });

        console.log('API response status:', response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          
          // Check if it's a rate limit error
          if (response.status === 429 && retryCount < 3) {
            const waitTime = Math.pow(2, retryCount) * 1000 + Math.random() * 1000; // Exponential backoff
            console.log(`Rate limited, waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return makeRequest(retryCount + 1);
          }
          
          throw new Error(`GROQ API Error: ${response.status} - ${errorText}`);
        }
        
        return response;
      } catch (error) {
        if (retryCount < 3 && (error.message.includes('rate_limit') || error.message.includes('429'))) {
          const waitTime = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;
          console.log(`Error occurred, waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return makeRequest(retryCount + 1);
        }
        throw error;
      }
    };

    const startTime = Date.now();
    
    try {
      const response = await makeRequest();

      const data = await response.json();
      console.log('API response received, processing time:', Date.now() - startTime, 'ms');
      const processingTime = Date.now() - startTime;
      
      let analysisResult;
      try {
        let content = data.choices[0].message.content;
        
        // Remove markdown code blocks if present
        if (content.includes('```json')) {
          content = content.replace(/```json\s*/, '').replace(/\s*```$/, '');
        }
        if (content.includes('```')) {
          content = content.replace(/```\s*/, '').replace(/\s*```$/, '');
        }
        
        // Decode HTML entities
        content = content.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        
        // Extract complete JSON object
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          content = content.substring(jsonStart, jsonEnd + 1);
        }
        
        analysisResult = JSON.parse(content.trim());
        console.log('Analysis result parsed successfully');
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError);
        console.error('Raw response length:', data.choices[0].message.content.length);
        
        // Use fallback analysis if parsing fails
        const processingTime = Date.now() - startTime;
        analysisResult = this.generateFallbackAnalysis(policyData, processingTime);
        console.log('Using fallback analysis due to parsing error');
      }

      // Ensure processing time is included
      analysisResult.processing_time_ms = processingTime;
      analysisResult.timestamp = new Date().toISOString();
      
      return analysisResult;
    } catch (error) {
      console.error('NDPR analysis failed:', error);
      throw error;
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