# Lecture 11 — Advanced Prompting: CoT, Prompt Flows, Chaining

## Concept Overview

Advanced prompting encompasses three levels of sophistication: reasoning techniques applied within a single prompt (CoT), structured multi-step orchestration across prompts (chaining), and fully managed visual flow execution (Bedrock Prompt Flows). Each layer adds control, auditability, and composability at a cost.

---

## Chain-of-Thought (CoT) Prompting

CoT improves model accuracy on complex, multi-step problems by making the model reason step-by-step before producing a final answer.

### Three CoT Variants

| Variant | How | When |
|---------|-----|------|
| **Zero-shot CoT** | Append "Think step by step" to the prompt | Quick accuracy boost, no examples available |
| **Few-shot CoT** | Include 2–5 worked examples with full reasoning steps | Higher accuracy, more tokens/cost |
| **Self-consistency CoT** | Sample N reasoning paths, take majority vote | High-stakes outputs requiring reliability |

### Bedrock-Specific: Extended Thinking

Claude models on Bedrock support **extended thinking** via `thinkingConfig` in the InvokeModel API. This is a native CoT that externalizes the reasoning trace in the response. Different from prompt-level CoT — it is a model-level feature.

```json
{
  "thinking": {
    "type": "enabled",
    "budget_tokens": 5000
  }
}
```

### Related Techniques

| Technique | Description |
|-----------|-------------|
| **Tree-of-Thought (ToT)** | Explores multiple reasoning branches, backtracks on dead ends; higher compute |
| **ReAct** | Interleaves Reasoning (think) + Acting (tool call) steps; foundation of Bedrock Agents |

---

## Prompt Chaining

Prompt chaining breaks a complex task into multiple sequential (or parallel/conditional) prompt calls, where outputs of one prompt feed as inputs to the next.

### Topologies

| Topology | Description | Use Case |
|----------|-------------|----------|
| **Sequential** | Output → next prompt's input | Multi-step pipelines |
| **Parallel** | Independent prompts run concurrently | Multi-perspective analysis |
| **Conditional** | Branch based on output content | Routing, classification-first flows |

### Orchestration Options

| Option | Best For |
|--------|----------|
| **AWS Step Functions** | Deterministic, auditable orchestration with retries/error handling |
| **Bedrock Prompt Flows** | Visual, managed prompt chaining within Bedrock |
| **Lambda** | Custom logic, arbitrary integration |

---

## Amazon Bedrock Prompt Flows

Prompt Flows is a managed service for visually composing and executing multi-step prompt chains. Flows consist of nodes connected by edges.

### Lifecycle

```mermaid
flowchart LR
  A[CreateFlow] --> B[PrepareFlow] --> C[CreateFlowVersion] --> D[CreateFlowAlias] --> E[InvokeFlow]
```

- **PrepareFlow** validates node connections and schema compatibility before execution.
- **CreateFlowVersion** snapshots the flow (immutable). Aliases point to versions.
- **InvokeFlow** executes the flow; async invocation supports up to 24-hour runtimes.

### Node Types

#### Logic Nodes

| Node | Key Facts |
|------|-----------|
| **Input** | Max 1 per flow. Entry point. |
| **Output** | Multiple allowed per flow. |
| **Condition** | Evaluates expressions; **first match wins**. Supports `==`, `!=`, `>`, `>=`, `<`, `<=`, `and`, `or`, `not`. |
| **Iterator** | Splits an array into individual items. **Serial, not parallel.** |
| **Collector** | Aggregates Iterator outputs back into array. |
| **DoWhile** | Loops until condition is met. `maxIterations` default = 10. |

#### Data / Action Nodes

| Node | Key Facts |
|------|-----------|
| **Prompt** | Calls a Bedrock FM with a prompt template. Guardrails apply here. |
| **Agent** | Invokes a Bedrock Agent. |
| **KnowledgeBase** | Without `modelId` → returns raw retrieved results (array). With `modelId` → returns generated text (RAG). Guardrails apply in RAG mode only. |
| **Lambda** | Arbitrary custom logic. |
| **InlineCode** | Python 3.12 only. Max 5 per flow. Not supported in async flows. |
| **S3 Storage** | Writes output to S3. |
| **S3 Retrieval** | Reads from S3. |
| **Lex** | Integrates an Amazon Lex bot. |

### Guardrails in Prompt Flows

Guardrails apply **only** to:
1. **Prompt nodes** — always
2. **KnowledgeBase nodes** — only when `modelId` is set (RetrieveAndGenerate mode)

Guardrails do NOT apply to Agent nodes, Lambda nodes, or raw retrieval (KnowledgeBase without modelId).

---

## AWS Services Involved

| Service | Role |
|---------|------|
| Amazon Bedrock Prompt Flows | Managed visual prompt chain orchestration |
| AWS Step Functions | Deterministic workflow orchestration with retries |
| AWS Lambda | Custom processing within flows |
| Amazon Bedrock Agents | Agentic tool-use within flows via Agent node |
| Amazon Bedrock Knowledge Bases | Retrieval within flows via KnowledgeBase node |
| Amazon S3 | Input/output storage for flow artifacts |
| Amazon Lex | Conversational interface node |

---

## Common Misconceptions

- **"Iterator runs in parallel"** — False. Iterator is serial. Use parallel branches for concurrency.
- **"Guardrails apply to all nodes"** — False. Only Prompt nodes and KnowledgeBase nodes in RAG mode.
- **"KnowledgeBase node always generates a response"** — False. Without `modelId`, it returns raw retrieved chunks (array), not generated text.
- **"Condition node evaluates all matching conditions"** — False. First match wins; subsequent conditions are skipped.
- **"Extended thinking = CoT prompting"** — They achieve similar goals, but extended thinking is a Bedrock API parameter (`thinkingConfig`), not a prompt technique.

---

## Exam Tips

- Expect scenario questions where you must identify the correct Prompt Flows node for a task (e.g., loop = DoWhile; branch = Condition; split array = Iterator + Collector).
- Know that `InvokeFlow` supports async (up to 24 hours) — used for long-running batch flows.
- The KnowledgeBase node's `modelId` presence/absence changes its output type entirely — common exam distinction.
- Condition node "first match wins" is a frequently tested gotcha.
- Step Functions vs Prompt Flows: Step Functions for deterministic/auditable orchestration with complex error handling; Prompt Flows for prompt-centric, Bedrock-native chaining.

---

## Gotchas

- **InlineCode** is Python 3.12 only, capped at 5 per flow, and not available in async flow invocations.
- **DoWhile** `maxIterations` defaults to 10 — if not set, long loops will terminate unexpectedly.
- **Multiple Output nodes** are allowed — useful for parallel result paths.
- **PrepareFlow is required** before you can invoke a flow for the first time after changes.

---

## Source

- [Amazon Bedrock Prompt Flows node types](https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html)
- [Amazon Bedrock Prompt Flows overview](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html)
- [Extended Thinking — Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/extended-thinking.html)
