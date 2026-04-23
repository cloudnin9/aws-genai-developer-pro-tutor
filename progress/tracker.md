# Progress Tracker

domains[5]{id,topic,weight,quizzes,avg_score,status}:
  1,FM Integration / Data / Compliance,31%,12,88%,in_progress
  2,Implementation & Integration,26%,0,-,not_started
  3,AI Safety / Security / Governance,20%,0,-,not_started
  4,Operational Efficiency & Optimization,12%,0,-,not_started
  5,Testing / Validation / Troubleshooting,11%,0,-,not_started

weak_areas[5]:
  1,RAG vs Fine-tuning decision — over-indexed on fine-tuning (resolved 2026-04-18 with 5/5 on expanded quiz)
  2,Parser vs chunking for table retrieval — chose semantic chunking instead of BDA parser (2026-04-19 Lecture 04 Q5)
  3,No chunking constraints — missed that it disables x-amz-bedrock-kb-document-page-number metadata filter (2026-04-19 Lecture 07 Q4)
  4,Multimodal chunk duration rules — audio_chunk_duration only applies to standalone audio files not video-with-audio (2026-04-19 Lecture 07 Q5)
  5,Prompt caching vs semantic caching — chose semantic caching for same-session large-prefix scenario; correct answer was prompt caching (2026-04-23 Lecture 10 Q2)

practice_exams[0]{date,score,notes}:
