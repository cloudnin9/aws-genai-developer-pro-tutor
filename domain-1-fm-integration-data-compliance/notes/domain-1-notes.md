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

### FM Customization

- Bedrock customization methods: **Supervised FT** (labeled pairs), **Reinforcement FT** (prompts + Lambda rewards), **Distillation** (teacher→student, no labels needed), **Continued Pre-Training** (unlabeled corpus)
- Two-step pattern: Continued Pre-Training (unlabeled domain corpus) → Supervised Fine-Tuning (labeled task data)
- **LoRA is NOT in Bedrock** — Bedrock does full-rank fine-tuning; LoRA requires SageMaker HyperPod/Training Jobs
- LoRA-supported models via SageMaker: Nova (Micro, Lite, Pro, Nova 2), Llama 3 70B, GPT OSS 120B, JumpStart models
- Custom Bedrock fine-tuned models **require Provisioned Throughput** — on-demand not available
- **SageMaker Model Registry**: Model Groups → Model Versions → Approval Status → EventBridge → CodePipeline → deploy
- Approval status change fires EventBridge event = CI/CD hook for automated deployment

### Data Validation and Processing Pipelines

- Ingestion pipeline: **Parse → Chunk → Embed → Write to vector store** (fixed order)
- Parsing and chunking strategies are **immutable** after data source creation — plan before connecting
- Parser options: **Default** (text/HTML/markdown), **BDA** (tables/charts/multimodal, template-driven), **FM parser** (custom prompt, max control, higher cost)
- Chunking options: `NONE`, `FIXED_SIZE`, `HIERARCHICAL` (parent+child), `SEMANTIC` (meaning-based)
- Default chunking if omitted: ~300 tokens with sentence boundary preservation
- **POST_CHUNKING Lambda**: only customization point in pipeline — use for custom chunking logic or attaching chunk-level metadata (needed for retrieval filtering)
- **Structured data** (Redshift, Glue) skips embeddings — Bedrock converts NL to SQL directly
- `StartIngestionJob` = async batch sync | `KnowledgeBaseDocuments` API = real-time direct ingestion
- Multimodal parsers (BDA, FM) require an **S3 URI** to store extracted images/charts
- Poor retrieval on **tables/charts** → fix the **parser**; poor retrieval on **prose** → fix the **chunking strategy**

### Vector Store Solutions

- Vector store holds embeddings; ANN search finds semantically similar vectors at query time
- **Binary vectors → OpenSearch only** (Serverless + Managed Clusters); all others use float32
- **GraphRAG → Neptune Analytics**: combine graph traversals + vector similarity for connected entity knowledge
- **ACID + SQL + vector → Aurora PostgreSQL + pgvector**: financial/transactional workloads
- **Cost-optimized infrequent access → S3 Vectors**: up to 90% savings, ~100ms latency, zero idle cost, up to 2B vectors/index
- **Quick-create** (Bedrock auto-provisions index): OpenSearch Serverless, Aurora PostgreSQL, S3 Vectors only
- Three required field mappings on every index: `vectorField`, `textField`, `metadataField`
- Aurora gotcha: metadata filtering requires extra fields defined **at index-creation time** (other stores do not)
- Dimension mismatch between embedding model and vector store config → **ingestion failure**
- Third-party stores (Pinecone, Redis, MongoDB) require credentials in **AWS Secrets Manager**
- OpenSearch Serverless charges OCU even when idle; S3 Vectors has **zero idle cost**
- Embedding model dimension reference: Titan G1 = 1,536 | Titan V2 = 1,024/512/256 | Cohere = 1,024

### Vector Store Metadata, Indexing, and Maintenance

- **Metadata sidecar**: `<filename>.<ext>.metadata.json` placed alongside source file in S3 — Bedrock attaches key-value pairs to every chunk derived from that document
- Metadata enables **filtering at query time** — narrows vector search without scanning all vectors
- **Aurora exception**: requires a dedicated table column per metadata attribute (pre-defined before ingestion); all other stores use a single flexible string field
- OpenSearch index **engine must be `faiss`** (not `nmslib`) for Bedrock metadata filtering to work
- `nmslib` → `faiss` migration requires creating a **new** vector index and a **new** knowledge base
- **Sync is incremental**: only added/modified/deleted documents are reprocessed; unchanged docs are skipped
- **Metadata-only optimization**: when only `.metadata.json` files change (non-CSV, no custom Lambda), Bedrock updates metadata without calling the embedding model → **no token cost**
- CSV files are **always fully re-ingested** when their metadata changes (no metadata-only shortcut)
- After sync on non-Aurora stores, new vectors may take **a few minutes** to become queryable
- **HNSW parameters**: `ef_construction` (build quality), `m` (graph connections), `ef_search` (search breadth) — all trade recall vs latency/memory
- **Quantization**: Binary (32x compression, OpenSearch only) | Scalar (4x, good recall/cost balance)
- **Auto-optimize** (OpenSearch Serverless): upload dataset to S3 as Parquet/JSONL, set recall/latency thresholds → automated HNSW tuning in 30–60 min on managed infra (no impact on collection)
- **ISM (Index State Management)**: automates hot → warm → cold → delete lifecycle for OpenSearch managed clusters — critical for cost control as KB grows

### Chunking Strategies (Task 1.5)

- **Ingestion pipeline order**: Parse → Chunk → Embed → Write to vector store
- **Standard/Fixed-size**: configurable max tokens + overlap %; predictable, cheap, good for uniform content
- **Default chunking** (if none specified): ~300 tokens, respects sentence boundaries
- **No chunking**: entire document = 1 chunk; loses `x-amz-bedrock-kb-document-page-number` metadata filter and page citations; requires pre-splitting files externally
- **Hierarchical**: parent chunks (large) contain child chunks (small); child retrieved for precision → replaced by parent at retrieval time for broader context; return count may be less than requested (child→parent deduplication)
- Hierarchical not recommended with S3 vector bucket; >8000 combined tokens risks metadata size limits
- **Semantic**: NLP + FM boundary detection; parameters: `max_tokens`, `buffer_size` (surrounding sentences for boundary embedding), `breakpoint_percentile_threshold`; buffer=1 → 3 sentences examined; **extra FM cost at ingestion**
- Higher `breakpoint_percentile_threshold` → fewer, larger chunks
- **Multimodal**: Nova embeddings chunk at embedding model level (1–30s, default 5s); BDA converts to text first then applies text chunking
- Video files: only `video_chunk_duration` applies even if audio embedded; `audio_chunk_duration` = standalone audio files only
- Decision rule: small self-contained docs → no chunking; uniform text → fixed-size; precision + context trade-off → hierarchical; topic-coherent prose, cost not a concern → semantic

### Retrieval Mechanisms (RAG)

#### Embeddings (Task 1.5)

- Embedding models convert text to dense vectors; Bedrock KB uses them at **ingestion and query time**
- **Titan Embeddings G1 - Text**: 1536 dims, float only — legacy model
- **Titan Text Embeddings V2**: 256/512/1024 dims, float **and binary** — recommended default; flexible cost/accuracy tuning
- **Cohere Embed English v3**: 1024 dims, float and binary — single language
- **Cohere Embed Multilingual v3**: 1024 dims, float and binary — 100+ languages in one model
- **Titan Multimodal Embeddings G1**: 1024 dims, float only
- **Binary vectors**: ~32x storage savings vs float, small accuracy trade-off — OpenSearch Serverless + Cohere/Titan V2 only
- Smaller dimensions = cheaper storage; larger = better recall — choose Titan V2 1024 for high-stakes, 256 for cost-sensitive

#### Hybrid Search and Search Strategy

- Configured via `overrideSearchType` in `KnowledgeBaseVectorSearchConfiguration`
- `SEMANTIC`: ANN vector similarity only — available on **all** vector store types
- `HYBRID`: vector similarity **+** BM25 keyword search — **OpenSearch Serverless only**, requires a filterable text field in the index
- Setting HYBRID on a non-OSS store (e.g., Aurora pgvector) → **validation error**
- Omit `overrideSearchType` → Bedrock AUTO-selects (safe default)
- Use HYBRID when queries include exact product codes, SKUs, proper nouns, or domain terms that don't embed reliably

#### Reranking

- Optional second-pass re-scoring of retrieved chunks **after** initial vector/hybrid retrieval
- Vector search = similarity (cosine); reranking = relevance (cross-encoder query-chunk scoring) — not the same
- Model: **Cohere Rerank** (via Bedrock)
- API: `Rerank` endpoint on **Agents for Bedrock Runtime**; can also be used standalone (not just inside KB queries)
- Configure via `rerankingConfiguration` inside `KnowledgeBaseVectorSearchConfiguration`
- IAM required: `bedrock:Rerank` + `bedrock:InvokeModel`
- Adds latency — use when precision matters more than speed
- "Topically related but not precisely relevant" retrieval problem → fix with reranking

### Query Handling (Task 1.5)

- **Query expansion** enriches a single query before embedding — HyDE (embed hypothetical answer), multi-query, reformulation
- **Query decomposition** (`QUERY_DECOMPOSITION`) splits a multi-part query into independent sub-queries; only native `QueryTransformationType` in Bedrock
- Enable decomposition via `orchestrationConfiguration.queryTransformationConfiguration.type = QUERY_DECOMPOSITION`
- With decomposition: `numberOfRerankedResults` can be up to **5×** `numberOfResults`; without: capped at `numberOfResults` silently
- **Metadata filtering** = hard exclusion **before** retrieval — filters on structured attributes, not chunk text; applies at candidate selection stage
- **BM25 keyword search** (Hybrid) = soft relevance score **during** retrieval — scores exact token matches in chunk text; **OpenSearch Serverless only** (AWS API explicitly states all other vector stores only support SEMANTIC)
- Key distinction: metadata filter narrows the pool → BM25 scores what remains
- Use metadata filter when: you know a structured attribute at query time (region, date, category)
- Use Hybrid/BM25 when: query contains exact tokens that don't embed well (product codes, SKUs, IDs, acronyms)
- **MCP servers** = query routing endpoints for agents; fan out sub-tasks to heterogeneous sources; not a vector search mechanism
- Core APIs: `Retrieve` (chunks + scores), `RetrieveAndGenerate` (full RAG pipeline), `RetrieveAndGenerateStream` (streaming), `GenerateQuery` (NL→SQL for structured stores)
- Default `numberOfResults` = 5; `startsWith`/`stringContains` metadata filters not supported on S3 Vectors
- Guardrails apply to input/output only — NOT to retrieved chunks

### Prompt Engineering and Governance

- **Bedrock Prompt Management**: centralized store for prompts as ARN-addressable resources; enables governance, versioning, and team-wide reuse
- **Variables**: `{{curly_brace}}` syntax; values supplied at runtime — must be provided or call fails
- **Variants**: up to 3 side-by-side configurations (different model/params/text) for A/B comparison before committing
- **DRAFT → VERSION lifecycle**: draft is mutable; versions are **immutable** — update draft and create a new version; production apps pin to version
- **Template types**: `TEXT` (basic) | `CHAT` (Converse API: system prompt, history, tool use, prompt caching)
- **KMS encryption** = customer-managed key for compliance/data residency
- **CloudTrail** captures prompt lifecycle events = audit trail for governance scenarios
- **Bedrock Flows**: consumes versioned prompts as prompt nodes — ARN reference in the flow definition
- `centralize + version + audit trail` scenario → Bedrock Prompt Management + CloudTrail

#### Prompt Caching

- Caches computed KV state of the **token prefix** — subsequent calls reuse prefix, only compute the dynamic suffix
- Place a **cache point** at the end of static content (system + document); dynamic user question never cached
- **Minimum 1,024 tokens** per checkpoint (Claude models) — small prefixes not worth caching
- **TTL 5 min** (default, all models) — resets on every cache hit; sufficient for high-frequency sessions
- **TTL 1 hour** (Claude 4.5 variants only) — for workflows where same content is accessed <every 5 min but within an hour; 1-hour entries must appear **before** 5-min entries
- **Cost model**: cache write > standard input; cache read < standard input — only cost-effective with repeated reuse
- Cacheable fields: `system`, `messages`, `tools` — user's latest message is NOT cached
- **Prompt caching ≠ semantic caching**: prompt caching = exact token prefix inside model; semantic caching = similar query matching outside model via embeddings
- Use prompt caching when: same large context is reused across multiple questions in same session
- Use semantic caching when: different users ask similar questions (avoid full model invocation)
- Decision rule: same large prefix + frequent questions in session → prompt caching (5-min TTL); different users, similar intent → semantic caching; infrequent reuse within an hour → prompt caching (1-hour TTL)

### Advanced Prompting, Prompt Chaining, and Flows

- Prompt engineering optimizes textual input to improve output quality; Bedrock docs recommend prompt refinement, RAG, or better model selection to reduce hallucinations
- **Chain-of-thought instruction patterns** are explicitly called out in Task 1.6.5 — they improve reasoning without changing model weights
- **Prompt chaining** breaks a complex task into sequential LLM calls; use it when one stage's output should feed the next or when you need auditable intermediate outputs
- AWS Prescriptive Guidance says prompt chaining fits tasks that exceed a single call's reasoning depth or need validation/filtering between stages
- **Amazon Bedrock Prompt Flows** links prompt nodes, FMs, knowledge bases, and Lambda into a visual workflow
- Flows lifecycle: **working draft → immutable version → alias** for application deployment
- **AWS Step Functions** can also orchestrate Bedrock prompt chaining; prefer it for deterministic control, retries, and broader AWS workflow logic
- Better prompting improves output quality, but it does **not** replace RAG when the model needs private or current facts

#### CoT Variants

- **Zero-shot CoT**: append "Think step by step" — low cost, good baseline
- **Few-shot CoT**: include 2–5 worked examples with reasoning; higher token cost, higher accuracy
- **Self-consistency CoT**: sample N paths, take majority vote — for high-stakes reliability, highest cost
- **Extended thinking (Bedrock)**: `thinkingConfig` API parameter on Claude — native CoT with visible reasoning trace; different from prompt-level CoT
- **ReAct**: interleaved Reason + Act (tool call) cycles — foundation of Bedrock Agents

#### Prompt Flows Node Reference

| Node | Key Constraint |
|------|---------------|
| Input | Max 1 per flow |
| Output | Multiple allowed |
| Condition | First match wins; `==`, `!=`, `>`, `>=`, `<`, `<=`, `and`, `or`, `not` |
| Iterator | Serial, not parallel; splits array into items |
| Collector | Aggregates Iterator items back into array |
| DoWhile | `maxIterations` default = 10 |
| Prompt | Guardrails apply |
| KnowledgeBase | Without `modelId` → raw chunks (array); with `modelId` → generated text (RAG); guardrails apply in RAG mode only |
| InlineCode | Python 3.12 only; max 5/flow; NOT available in async flows |

- **PrepareFlow** required before first invocation after changes — validates connections and schema
- **Async InvokeFlow** supports up to 24-hour runtimes
- **Step Functions vs Prompt Flows**: Step Functions for deterministic/auditable orchestration; Prompt Flows for Bedrock-native prompt-centric chaining
