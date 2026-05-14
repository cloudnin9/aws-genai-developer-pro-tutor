# AWS Certified Generative AI Developer - Professional (AIP-C01) — Study Plan

## Exam Overview

| Domain | Topic | Weight |
|--------|-------|--------|
| Domain 1 | Foundation Model Integration, Data Management, and Compliance | 31% |
| Domain 2 | Implementation and Integration | 26% |
| Domain 3 | AI Safety, Security, and Governance | 20% |
| Domain 4 | Operational Efficiency and Optimization for GenAI Applications | 12% |
| Domain 5 | Testing, Validation, and Troubleshooting | 11% |

**Exam format:** 75 questions (65 scored + 10 unscored), 180 minutes, passing score 750/1000

**Out of scope:** Model development/training, advanced ML techniques, data engineering/feature engineering

---

## Week-by-Week Plan

### Week 1 — FM Integration Foundations (Domain 1 Part 1, 31%)

> Domain 1 is the heaviest domain at 31%. Covers FM selection, architecture design, data pipelines, and vector stores.

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Solution architecture design with FMs (Well-Architected GenAI Lens) | 1.1 | [x] |
| Tue | FM selection, configuration, and cross-region inference | 1.2 | [x] |
| Wed | FM customization: fine-tuning deployment, LoRA, SageMaker Model Registry | 1.2 | [x] |
| Thu | Data validation and processing pipelines: Glue Data Quality, SageMaker Data Wrangler | 1.3 | [x] |
| Fri | Vector store design: OpenSearch, Aurora pgvector, DynamoDB, Bedrock KB | 1.4 | [x] |
| Sat | Vector store metadata, indexing strategies, and data maintenance | 1.4 | [x] |
| Sun | Quiz: Domain 1 Part 1 checkpoint | — | [ ] |

### Week 2 — RAG, Prompt Engineering, and Governance (Domain 1 Part 2)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Document chunking strategies (fixed-size, hierarchical, semantic) | 1.5 | [x] |
| Tue | Embedding models, hybrid search, reranking | 1.5 | [x] |
| Wed | Query handling: expansion, decomposition, transformation, Amazon Comprehend intent | 1.5 | [x] |
| Thu | Prompt management: Bedrock Prompt Management, Bedrock Prompt Flows, templates, governance | 1.6 | [x] |
| Fri | Advanced prompting: chain-of-thought, prompt chaining, Prompt Flows | 1.6 | [x] |
| Sat | Prompt quality assurance, regression testing, feedback loops | 1.6 | [x] |
| Sun | Quiz: Domain 1 Part 2 checkpoint | — | [ ] |

### Week 2 Extension — Domain 1 Gap-Fill Lectures

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Multimodal data pipelines: Transcribe, Rekognition, Textract, Bedrock Data Automation | 1.3 | [x] |
| Tue | Dynamic model selection, AppConfig feature flags, rollback, lifecycle management | 1.2 | [x] |
| Wed | Prompt governance, audit trails (CloudTrail), clarification workflows | 1.6 | [x] |
| Thu | KB automated sync, change detection, API Gateway for retrieval, Lambda batch embeddings | 1.5 | [x] |
| Fri | Quiz: Domain 1 gap-fill checkpoint | — | [ ] |

### Week 3 — Implementation and Integration Part 1 (Domain 2, 26%)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Agentic AI: Strands Agents, Agent Squad, multi-agent systems | 2.1 | [x] |
| Tue | Agent tool integration: MCP servers, function calling, custom tools | 2.1 | [x] |
| Wed | Agent orchestration: ReAct patterns, human-in-the-loop, guardrails | 2.1 | [x] |
| Thu | Model deployment: Lambda, Bedrock provisioned throughput, SageMaker endpoints | 2.2 | [x] |
| Fri | FM API integration: sync/async, streaming, SQS/SNS async patterns, error handling | 2.4 | [ ] |
| Sat | Model routing: static, dynamic, content-based, AppConfig feature flags | 2.4 | [ ] |
| Sun | Quiz: Domain 2 Part 1 checkpoint | — | [ ] |

### Week 4 — Implementation Part 2 + Safety Start (Domain 2 + Domain 3, 20%)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Enterprise integration: API Gateway, EventBridge, SQS/SNS, legacy systems | 2.3 | [ ] |
| Tue | CI/CD for GenAI: CodePipeline, CodeBuild, GenAI gateway patterns | 2.3 | [ ] |
| Wed | App integration: Amplify, Q Business, Bedrock Data Automation, Outposts/Wavelength | 2.5 | [ ] |
| Thu | Developer productivity: Q Developer, debugging FM apps with X-Ray | 2.5 | [ ] |
| Fri | **Amazon Bedrock AgentCore**: Runtime, Memory, Tool Registry, Code Interpreter, Browser, Gateway, Identity | 2.1 | [ ] |
| Sat | **AWS Step Functions for GenAI**: state machines, parallel branches, Map states, error handling | 2.3 | [ ] |
| Sun | **Containerized FM deployment**: ECS, EKS, Fargate, container patterns | 2.2 | [ ] |

### Week 4 Extension — AI Safety Part 1 (Domain 3)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Input/output safety: Bedrock Guardrails, content filtering, AWS WAF endpoint protection | 3.1 | [ ] |
| Tue | Hallucination reduction: grounding, fact-checking, structured outputs | 3.1 | [ ] |
| Wed | Scenario drill: End-to-end agentic RAG architecture with safety layers | — | [ ] |

### Week 5 — AI Safety, Security, and Governance (Domain 3 continued)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Prompt injection defense, adversarial testing, jailbreak detection | 3.1 | [ ] |
| Tue | Data security: VPC endpoints, IAM, IAM Access Analyzer, IAM Identity Center, Lake Formation, KMS encryption | 3.2 | [ ] |
| Wed | Privacy: PII detection (Comprehend, Macie), Amazon Detective, data masking, anonymization | 3.2 | [ ] |
| Thu | Governance: model cards, data lineage (Glue), CloudTrail audit logging | 3.3 | [ ] |
| Fri | Responsible AI: transparency, fairness evaluation, SageMaker Clarify, bias monitoring | 3.4 | [ ] |
| Sat | Human review workflows: Amazon A2I, human loop design, escalation patterns | 3.1 | [ ] |
| Sun | Compliance frameworks, organizational policies, automated checks | 3.3 | [ ] |

### Week 6 — Optimization + Testing + Full Review (Domains 4–5, 23%)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Cost optimization: token efficiency, model tiering, prompt caching, semantic caching, S3 Lifecycle policies | 4.1 | [ ] |
| Tue | Performance: latency optimization, batch inference, auto-scaling, SageMaker Inference Recommender | 4.2 | [ ] |
| Wed | Monitoring: CloudWatch, Model Invocation Logs, CloudTrail, QuickSight, Managed Grafana, observability dashboards | 4.3 | [ ] |
| Thu | FM evaluation: quality metrics, LLM-as-a-Judge, RAG evaluation, SageMaker Clarify metrics | 5.1 | [ ] |
| Fri | Agent evaluation: Bedrock Agent Evaluations, deployment validation, reporting | 5.1 | [ ] |
| Sat | Troubleshooting: context overflow, retrieval issues, prompt debugging, X-Ray tracing | 5.2 | [ ] |
| Sun | Full practice exam (timed, 75 questions, 180 minutes) | — | [ ] |

### Week 7 — Final Review

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Review wrong answers from practice exam | — | [ ] |
| Tue | Reinforce weak domains | — | [ ] |
| Wed | Scenario drills: safety architecture, cost optimization, agentic RAG | — | [ ] |
| Thu | Service differentiators rapid review | — | [ ] |
| Fri | Final practice exam (timed, 75 questions, 180 minutes) | — | [ ] |

---

## Key Service Differentiators

| Comparison | Key Decision Factor |
|------------|---------------------|
| RAG vs Fine-tuning | Dynamic external data vs model behavior change |
| Bedrock vs SageMaker | Managed FM access vs custom model training/deployment |
| Agents vs Knowledge Bases | Action execution and tool use vs document retrieval |
| Bedrock AgentCore vs Strands Agents | Managed fully-hosted agent platform vs SDK-based agent development |
| Bedrock Guardrails vs custom filters | Managed content safety vs custom moderation logic |
| Provisioned Throughput vs On-Demand | Predictable workloads vs variable traffic |
| Strands Agents vs Step Functions | Agent autonomy vs deterministic orchestration |
| Semantic cache vs prompt cache | Similar query reuse vs identical prefix reuse |
| AWS WAF vs Guardrails | Network-layer endpoint protection vs FM input/output safety |
| IAM Access Analyzer vs IAM Identity Center | Policy analysis/unused access vs SSO/workforce identity federation |
| Amazon A2I vs HITL in Bedrock Agents | Standalone human review service vs agent-native pause-and-resume |
| CloudWatch vs CloudTrail | Operational metrics/alarms vs audit log of API calls |
| QuickSight vs Managed Grafana | BI dashboards and ML insights vs time-series operational metrics |

---

## In-Scope AWS Services (AIP-C01)

Key services confirmed in-scope per official exam guide:

**Bedrock family:** Bedrock, Bedrock Knowledge Bases, Bedrock Prompt Management, Bedrock Prompt Flows, **Amazon Bedrock AgentCore**

**Compute / Containers:** Lambda, ECS, EKS, Fargate, EC2, Outposts, Wavelength

**Orchestration:** AWS Step Functions, EventBridge, SQS, SNS, AppConfig

**ML / AI:** SageMaker (endpoints, Clarify, Data Wrangler, Inference Recommender, Model Registry), Amazon Comprehend, Amazon Transcribe, Amazon Rekognition, Amazon Textract, Amazon A2I

**Security / Identity:** IAM, IAM Access Analyzer, IAM Identity Center, KMS, Macie, Amazon Detective, AWS WAF, VPC endpoints, Lake Formation

**Data / Storage:** S3 (Lifecycle, Intelligent-Tiering), Aurora, DynamoDB, OpenSearch, Glue (Data Quality), AWS Lake Formation

**Developer Tools:** CodePipeline, CodeBuild, X-Ray, Q Developer, CloudFormation

**Observability:** CloudWatch, CloudTrail, Amazon QuickSight, Amazon Managed Grafana

**Integration:** API Gateway, Amplify, Q Business

---

## Study Commands

- `"Teach me"` — structured lecture with key points and exam tips
- `"Quiz me on [topic]"` — targeted multiple-choice questions
- `"Give me a scenario for [domain]"` — architecture decision practice
- `"Explain [concept]"` — concept breakdown with key points
- `"What's the difference between X and Y"` — service comparison
- `"What are my weak areas"` — reads `progress/tracker.md` and targets gaps
