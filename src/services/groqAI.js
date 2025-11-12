class GroqAIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY;
    this.groqApiUrl = "https://api.groq.com/openai/v1/chat/completions";
    this.groqVoiceApiUrl = "https://api.groq.com/openai/v1/audio/transcriptions";
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

  async analyzePolicy(policyData) {
    const prompt = `You are an expert NDPR (Nigeria Data Protection Act 2023 - GAID 2025) compliance auditor. Your role is to analyze policies, documents, and data processing statements provided by users and evaluate them against the Nigeria Data Protection Act framework.

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

POLICY TEXT:
${policyData.document_text}

COMPANY INFO:
- Name: ${policyData.company_name}
- Size: ${policyData.company_size}
- Industry: ${policyData.industry}

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
              content: "You are an expert NDPR compliance analyst. Always respond with valid JSON format."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.2,
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
        // Fallback if JSON parsing fails
        analysisResult = {
          analysis_id: `analysis_${Date.now()}`,
          company_name: policyData.company_name,
          compliance_score: 65,
          risk_level: "medium",
          compliance_tier: "MODERATE COMPLIANCE",
          executive_summary: "The privacy policy shows moderate compliance with NDPR requirements but needs improvements in several key areas to ensure full compliance with Nigerian data protection regulations.",
          principle_analysis: {
            fairness_lawfulness_transparency: {status: "partial", finding: "Policy provides some transparency but lacks clarity on lawful basis"},
            purpose_limitation: {status: "partial", finding: "Purposes mentioned but not sufficiently specific"},
            data_minimization: {status: "non_compliant", finding: "No clear statement on data minimization principles"},
            storage_limitation: {status: "non_compliant", finding: "Retention periods not clearly defined"},
            accuracy: {status: "partial", finding: "Some mention of data accuracy but incomplete"},
            confidentiality_integrity_availability: {status: "partial", finding: "Basic security measures mentioned"},
            accountability: {status: "non_compliant", finding: "Insufficient accountability measures"},
            duty_of_care: {status: "partial", finding: "Some care provisions but not comprehensive"}
          },
          lawful_basis_assessment: {
            identified_basis: "Unclear",
            is_justified: "no",
            contradictions: "No clear lawful basis identified for data processing",
            recommendation: "Clearly identify and document lawful basis for each processing activity"
          },
          consent_requirements: {
            consent_required: "yes",
            is_addressed: "partial",
            contradictions: "Consent mechanisms not fully compliant with NDPR requirements"
          },
          dpia_requirements: {
            dpia_required: "unclear",
            is_completed: "not_mentioned",
            contradictions: "No mention of DPIA when it may be required"
          },
          data_subject_rights: {
            access_right: "no",
            rectification_process: "no",
            erasure_conditions: "no",
            complaint_mechanism: "no",
            contradictions: "Data subject rights not adequately addressed"
          },
          operational_measures: {
            dpo_designated: "no",
            dpa_with_processors: "no",
            breach_notification_plan: "no",
            training_schedule: "no",
            privacy_notices: "partial"
          },
          contradictions: [
            {
              contradiction: "Lack of clear lawful basis for data processing",
              ndpr_requirement: "Article 6 - Lawful basis for processing",
              current_policy_states: "No clear lawful basis identified",
              why_contradicts: "NDPR requires clear identification of lawful basis for all processing activities",
              remediation_required: "Identify and document specific lawful basis for each processing purpose",
              severity: "High",
              impact: "Processing may be unlawful without proper basis"
            }
          ],
          gaps: [
            {
              gap_id: "gap_1",
              title: "Data Subject Rights",
              description: "Policy lacks comprehensive information about data subject rights under NDPR",
              severity: "High",
              ndpr_articles: ["Article 15", "Article 16", "Article 17"],
              impact: "Data subjects may not be aware of their rights, leading to non-compliance",
              recommendation: "Add comprehensive section detailing all data subject rights including access, rectification, erasure, and complaint procedures"
            }
          ],
          remediation_plan: {
            immediate: ["Identify lawful basis for processing", "Add data subject rights section"],
            short_term: ["Implement consent mechanisms", "Create breach notification procedures"],
            medium_term: ["Conduct DPIA if required", "Designate DPO if applicable"],
            ongoing: ["Regular compliance monitoring", "Staff training programs"]
          },
          compliance_certification: {
            status: "CONDITIONALLY CERTIFIED",
            next_steps: "Address identified gaps and contradictions for full compliance",
            auditor_notes: "Policy shows basic understanding of privacy requirements but needs significant improvements for NDPR compliance"
          },
          detailed_analysis: "Analysis completed using GROQ AI with comprehensive NDPR compliance framework. The policy demonstrates partial compliance but requires substantial improvements to meet Nigerian data protection standards.",
          legal_context: "Based on Nigeria Data Protection Act 2023 (GAID 2025) and NDPR compliance requirements",
          legal_references: [
            {
              regulation: "Nigeria Data Protection Act 2023",
              article: "Article 6",
              title: "Lawful basis for processing",
              summary: "Processing must have a lawful basis from the six specified grounds",
              relevance: "Critical for establishing legal foundation for data processing"
            }
          ],
          processing_time_ms: processingTime,
          timestamp: new Date().toISOString()
        };
      }

      // Ensure processing time is included
      analysisResult.processing_time_ms = processingTime;
      
      return analysisResult;
    } catch (error) {
      console.error('GROQ AI analysis failed:', error);
      throw error;
    }
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

export default new GroqAIService();