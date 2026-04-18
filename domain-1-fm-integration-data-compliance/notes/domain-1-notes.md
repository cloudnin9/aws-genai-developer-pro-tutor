# Domain 1: Foundation Model Integration, Data Management, and Compliance

**Exam Weight: 31% (highest weight)**

## Tasks

- Task 1.1: Analyze requirements and design GenAI solutions
- Task 1.2: Select and configure FMs
- Task 1.3: Implement data validation and processing pipelines for FM consumption
- Task 1.4: Design and implement vector store solutions
- Task 1.5: Design retrieval mechanisms for FM augmentation
- Task 1.6: Implement prompt engineering strategies and governance

---

## Notes

### GenAI Solution Architecture

- GenAI Lens extends Well-Architected (6 pillars) with GenAI-specific best practices — must be imported into WA Tool as a custom lens
- Architecture decision hierarchy: Prompt Engineering → RAG → Fine-tuning → Custom model (cost/complexity increases each step)
- **RAG = what the model knows (no retraining)** | **Fine-tuning = how the model behaves**
- Bedrock = managed FM access | SageMaker = custom model lifecycle
- Dynamic model switching without code change = API Gateway + Lambda + AppConfig
- Circuit breaker for FM failures = Step Functions
- Cross-Region Inference = resilience for models with limited regional availability (not just latency)
- PoC before full deployment is an explicit exam best practice (Skill 1.1.2) using Amazon Bedrock

### FM Selection and Configuration

- Three inference modes: **On-Demand** (pay-per-token, default), **Provisioned Throughput** (reserved MUs, required for custom models), **Cross-Region Inference** (managed multi-region routing via inference profiles)
- Custom/fine-tuned models **cannot** use on-demand — must purchase Provisioned Throughput
- FM selection dimensions: modality, context window, latency, cost, compliance/data residency, customizability, task benchmarks
- Use **Bedrock Model Evaluation** to compare models on your own data before committing
- **Cross-Region Inference (CRIS)**: Geographic (data stays within a geography, compliance) vs Global (~10% cheaper, max throughput, data crosses all commercial Regions)
- CRIS costs based on source Region — no additional routing cost; no manual Region enablement needed; all data stays on AWS network
- CloudTrail: `additionalEventData.inferenceRegion` shows which Region processed a CRIS request
- **Intelligent Prompt Routing**: routes each prompt to cheapest model in a family that still meets quality bar (Anthropic/Meta, English only) — NOT the same as CRIS
- CRIS = same model, different regions. Prompt Routing = different models, same region/family.
- **Circuit breaker** (Step Functions Retry/Catch): stops calling a failed FM endpoint; transitions CLOSED → OPEN → HALF-OPEN. Use when failures are prolonged/repeated.
- Retry with backoff = transient/occasional errors. Circuit breaker = sustained/repeated failures.

### Data Validation and Processing Pipelines

> Add notes here

### Vector Store Solutions

> Add notes here

### Retrieval Mechanisms (RAG)

> Add notes here

### Prompt Engineering and Governance

> Add notes here
