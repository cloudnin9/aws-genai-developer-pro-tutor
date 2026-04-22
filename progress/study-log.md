# Study Log

log[9]{date,domain,topic,time,quiz,followup}:
  [1] 2026-04-18,1,Solution Architecture / Well-Architected GenAI Lens,~30m,1/1 100%,Lecture 01 complete
  [2] 2026-04-18,1,FM Selection / Cross-Region Inference / Circuit Breakers,~20m,-,Lecture 02 complete
  [3] 2026-04-19,1,FM Customization: LoRA / Model Registry / Deployment,~25m,1/1 100%,Lecture 03 complete; clarified LoRA is SageMaker-only not Bedrock
  [4] 2026-04-19,1,Data Validation and Processing Pipelines,~30m,4/5 80%,Lecture 04 complete; weak area: parser vs chunking for table retrieval
  [5] 2026-04-19,1,Vector Store Design: OpenSearch / Aurora pgvector / Neptune / S3 Vectors,~20m,10/10 100%,Lecture 05 complete; strong on binary vector constraint and GraphRAG routing
  [6] 2026-04-19,1,Vector Store Metadata / Indexing / Maintenance,~25m,1/1 100%,Lecture 06 complete; strong on metadata-only optimization and faiss engine requirement
  [7] 2026-04-19,1,Chunking Strategies: Fixed-size / Hierarchical / Semantic / Multimodal,~30m,3/5 60%,Lecture 07 complete; weak areas: no-chunking metadata filter loss and multimodal audio_chunk_duration scope
  [8] 2026-04-20,1,Embeddings / Hybrid Search / Reranking,~30m,5/5 100%,Lecture 08 complete; strong on HYBRID constraint (OSS only) and reranking IAM; noted HYBRID prerequisite = filterable text field not metadata fields
  [9] 2026-04-20,1,Query Handling: Expansion / Decomposition / MCP,~35m,3/3 100%,Lecture 09 complete; clarified metadata filtering (hard exclusion pre-retrieval) vs BM25 keyword search (soft score during retrieval)
