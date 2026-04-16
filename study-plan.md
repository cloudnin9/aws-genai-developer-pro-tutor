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
| Mon | Solution architecture design with FMs (Well-Architected GenAI Lens) | 1.1 | [ ] |
| Tue | FM selection, configuration, and cross-region inference | 1.2 | [ ] |
| Wed | FM customization: fine-tuning deployment, LoRA, SageMaker Model Registry | 1.2 | [ ] |
| Thu | Data validation and processing pipelines for FM consumption | 1.3 | [ ] |
| Fri | Vector store design: OpenSearch, Aurora pgvector, DynamoDB, Bedrock KB | 1.4 | [ ] |
| Sat | Vector store metadata, indexing strategies, and data maintenance | 1.4 | [ ] |
| Sun | Quiz: Domain 1 Part 1 checkpoint | — | [ ] |

### Week 2 — RAG, Prompt Engineering, and Governance (Domain 1 Part 2)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Document chunking strategies (fixed-size, hierarchical, semantic) | 1.5 | [ ] |
| Tue | Embedding models, hybrid search, reranking | 1.5 | [ ] |
| Wed | Query handling: expansion, decomposition, transformation | 1.5 | [ ] |
| Thu | Prompt management: Bedrock Prompt Management, templates, governance | 1.6 | [ ] |
| Fri | Advanced prompting: chain-of-thought, prompt chaining, Prompt Flows | 1.6 | [ ] |
| Sat | Prompt quality assurance, regression testing, feedback loops | 1.6 | [ ] |
| Sun | Quiz: Domain 1 Part 2 checkpoint | — | [ ] |

### Week 3 — Implementation and Integration Part 1 (Domain 2, 26%)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Agentic AI: Strands Agents, Agent Squad, multi-agent systems | 2.1 | [ ] |
| Tue | Agent tool integration: MCP servers, function calling, custom tools | 2.1 | [ ] |
| Wed | Agent orchestration: ReAct patterns, human-in-the-loop, guardrails | 2.1 | [ ] |
| Thu | Model deployment: Lambda, Bedrock provisioned throughput, SageMaker endpoints | 2.2 | [ ] |
| Fri | FM API integration: sync/async, streaming, rate limiting, error handling | 2.4 | [ ] |
| Sat | Model routing: static, dynamic, content-based, intelligent routing | 2.4 | [ ] |
| Sun | Quiz: Domain 2 Part 1 checkpoint | — | [ ] |

### Week 4 — Implementation Part 2 + Safety Start (Domain 2 + Domain 3, 20%)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Enterprise integration: API Gateway, EventBridge, legacy systems | 2.3 | [ ] |
| Tue | CI/CD for GenAI: CodePipeline, CodeBuild, GenAI gateway patterns | 2.3 | [ ] |
| Wed | App integration: Amplify, Q Business, Bedrock Data Automation | 2.5 | [ ] |
| Thu | Developer productivity: Q Developer, debugging FM apps with X-Ray | 2.5 | [ ] |
| Fri | Input/output safety: Bedrock Guardrails, content filtering, moderation | 3.1 | [ ] |
| Sat | Hallucination reduction: grounding, fact-checking, structured outputs | 3.1 | [ ] |
| Sun | Scenario drill: End-to-end agentic RAG architecture | — | [ ] |

### Week 5 — AI Safety, Security, and Governance (Domain 3 continued)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Prompt injection defense, adversarial testing, jailbreak detection | 3.1 | [ ] |
| Tue | Data security: VPC endpoints, IAM, Lake Formation, encryption | 3.2 | [ ] |
| Wed | Privacy: PII detection (Comprehend, Macie), data masking, anonymization | 3.2 | [ ] |
| Thu | Governance: model cards, data lineage (Glue), audit logging (CloudTrail) | 3.3 | [ ] |
| Fri | Responsible AI: transparency, fairness evaluation, bias monitoring | 3.4 | [ ] |
| Sat | Compliance frameworks, organizational policies, automated checks | 3.3 | [ ] |
| Sun | Quiz: Domain 3 checkpoint | — | [ ] |

### Week 6 — Optimization + Testing + Full Review (Domains 4–5, 23%)

| Day | Topic | Task Ref | Status |
|-----|-------|----------|--------|
| Mon | Cost optimization: token efficiency, model tiering, caching strategies | 4.1 | [ ] |
| Tue | Performance: latency optimization, batch inference, auto-scaling | 4.2 | [ ] |
| Wed | Monitoring: CloudWatch, Model Invocation Logs, observability dashboards | 4.3 | [ ] |
| Thu | Evaluation: FM quality metrics, LLM-as-a-Judge, RAG evaluation, agent eval | 5.1 | [ ] |
| Fri | Troubleshooting: context overflow, retrieval issues, prompt debugging | 5.2 | [ ] |
| Sat | Full practice exam (timed, 75 questions, 180 minutes) | — | [ ] |
| Sun | Review wrong answers, reinforce weak domains | — | [ ] |

---

## Key Service Differentiators

| Comparison | Key Decision Factor |
|------------|---------------------|
| RAG vs Fine-tuning | Dynamic external data vs model behavior change |
| Bedrock vs SageMaker | Managed FM access vs custom model training/deployment |
| Agents vs Knowledge Bases | Action execution and tool use vs document retrieval |
| Bedrock Guardrails vs custom filters | Managed content safety vs custom moderation logic |
| Provisioned Throughput vs On-Demand | Predictable workloads vs variable traffic |
| Strands Agents vs Step Functions | Agent autonomy vs deterministic orchestration |
| Semantic cache vs prompt cache | Similar query reuse vs identical prefix reuse |

---

## Study Commands

- `"Teach me"` — structured lecture with key points and exam tips
- `"Quiz me on [topic]"` — targeted multiple-choice questions
- `"Give me a scenario for [domain]"` — architecture decision practice
- `"Explain [concept]"` — concept breakdown with key points
- `"What's the difference between X and Y"` — service comparison
- `"What are my weak areas"` — reads `progress/tracker.md` and targets gaps
