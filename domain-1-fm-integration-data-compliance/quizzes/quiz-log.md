# Domain 1 Quizzes

## Quiz Log

| Date | Topic | Score | Notes |
|------|-------|-------|-------|
| 2026-04-18 | Solution Architecture / Well-Architected GenAI Lens | 1/1 (100%) | Correctly identified RAG+Cross-Region Inference over fine-tuning for dynamic doc Q&A |
| 2026-04-18 | RAG vs Fine-tuning | 3/5 (60%) | Weak area: over-indexing on fine-tuning; reached for fine-tune when RAG or prompt engineering was correct |
| 2026-04-18 | FM Selection / Cross-Region Inference / Circuit Breakers | 5/5 (100%) | Perfect — CRIS types, PT requirement for custom models, retry vs circuit breaker, Prompt Routing distinction |
| 2026-04-18 | RAG vs Fine-tuning vs Pre-training (CPT, Distillation, Reinforcement FT) | 5/5 (100%) | Perfect — correctly applied CPT→FT sequence, distillation, and three-layer combo |
| 2026-04-19 | FM Customization: LoRA, Model Registry, Deployment | 1/1 (100%) | Correctly identified CPT→SFT→Provisioned Throughput+Model Registry for compliance scenario |
| 2026-04-19 | Data Validation and Processing Pipelines | 4/5 (80%) | Missed Q5: semantic chunking does not fix table retrieval — parser (BDA) must be fixed first |
| 2026-04-19 | Vector Store Design: OpenSearch, Aurora pgvector, Neptune, S3 Vectors | 10/10 (100%) | Perfect — binary vector constraint, GraphRAG, dimension mismatch, S3 Vectors cost, quick-create stores, Aurora metadata filtering gotcha |
| 2026-04-20 | Embeddings, Hybrid Search, and Reranking | 5/5 (100%) | Perfect — multilingual model, HYBRID validation error on Aurora pgvector, reranking IAM, binary vectors for cost, reranker for precision |
