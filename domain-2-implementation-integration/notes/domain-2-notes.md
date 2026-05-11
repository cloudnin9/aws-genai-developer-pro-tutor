# Domain 2: Implementation and Integration

**Exam Weight: 26%**

## Tasks

- Task 2.1: Implement agentic AI solutions and tool integrations
- Task 2.2: Implement model deployment strategies
- Task 2.3: Design and implement enterprise integration architectures
- Task 2.4: Implement FM API integrations
- Task 2.5: Implement application integration patterns and development tools

---

## Notes

### Agentic AI (Strands Agents, Agent Squad, MCP)

- **Agent loop (ReAct):** Perceive → Reason → Act → Observe → Repeat
- **Bedrock Agents** = fully managed; **supervisor-collaborator hierarchy only** (single supported topology); Anthropic Claude + Amazon Nova supported
- **Bedrock supervisor routing** = runtime NL reasoning (non-deterministic); synchronous; no peer-to-peer — collaborators cannot call each other
- **Strands Agents** = open-source SDK (AWS-released); model-first design; supports four topologies (supervisor-collaborator, Workflow, Graph, Swarm); strongest AWS integration among open-source frameworks; supports non-Bedrock providers
- **Agent Squad** (formerly Multi-Agent Orchestrator) = classifier-based dynamic routing + multi-turn memory; sits in front of agents as a dispatch layer; Python + TypeScript; Lambda-native; not an agent execution framework
- Bedrock multi-agent: supervisor must be **saved before collaborators can be associated** (hard constraint)
- Each collaborator in Bedrock multi-agent has its own tools, KBs, and **independent guardrails**
- Overlapping agent responsibilities = explicit anti-pattern (supervisor uses natural language role descriptions)
- Multi-agent adds cost and latency — only use when tasks genuinely decompose into specialized domains

#### Strands Coordination Topologies

| Pattern | Topology | Control | Parallelism | Cycles | Bedrock native |
|---------|----------|---------|-------------|--------|----------------|
| Supervisor-collaborator | Hierarchical tree | Runtime NL reasoning | Limited (fan-out) | No | Yes |
| Workflow | DAG (pre-defined) | Deterministic (dep graph) | **Yes** — independent tasks | No | No — use Step Functions |
| Graph | Developer-defined nodes + edges | Dynamic — LLM selects path at each node | Possible | **Yes** | No |
| Swarm | Peer mesh | Emergent | Yes | Yes | No |

- **Strands Workflow** = pre-defined Task DAG; **independent tasks run in parallel**; deterministic; no LLM path selection; no cycles
- **Strands Graph** = developer-defined nodes + edges; **LLM decides which edge to follow at each node**; cycles allowed; controlled but dynamic
- **Strands Swarm** = no supervisor; agents hand off to peers; emergent coordination; cycles allowed
- For deterministic sequential orchestration alongside Bedrock Agents → use **Step Functions** (AWS recommendation; managed equivalent of Workflow pattern)
- **Agent Squad + Strands combined:** Agent Squad = routing/dispatch layer; Strands Agents = execution layer behind it; more predictable at scale than Bedrock supervisor NL routing for intent-based use cases
- Framework comparison: Strands Agents and LangChain/LangGraph have the strongest workflow complexity; LangChain has strongest FM selection; Bedrock Agents is the only fully managed option

### Agent Tool Integration (Function Calling, Action Groups, MCP)

#### Converse API Function Calling

- Tool loop is **client-managed**: define `toolSpec` JSON schema → model returns `stopReason: "tool_use"` + `toolUseBlock` → your code runs the tool → send `toolResult` back
- `tool_choice` options: `auto` (model decides), `any` (model must call some tool — use for guaranteed structured output), `tool` (must call named tool)
- Loop continues until `stopReason: "end_turn"`

#### Bedrock Agents Action Groups

- **Schema types:** OpenAPI (stored in S3, ARN-referenced) for existing REST APIs; function detail schema (inline) for new tools
- **Execution modes:**
  - Lambda-backed: AWS invokes Lambda synchronously; hard 15-minute limit
  - Return of Control (RoC): agent returns `ActionGroupInvocationInput` to the *calling application*; caller executes the action and responds with `ActionGroupInvocationOutput`; use when Lambda timeout is a constraint or caller holds required context (e.g., transaction IDs)
- **Orchestration pipeline:** Pre-processing → Orchestration loop (ReAct: FM decides → action / KB → observation → repeat) → Post-processing (**off by default**)
- Post-processing adds latency and cost — only enable for genuine output transformation needs

#### AgentCore Gateway (MCP)

| Mode | Catalog | Semantic search | Notes |
|------|---------|-----------------|-------|
| DEFAULT | Pre-indexed | Yes (vector embeddings) | Requires `SynchronizeGatewayTargets` after catalog changes |
| DYNAMIC | Live discovery | No | Incompatible with semantic search and 3LO OAuth |

- Auth options: None (internal VPC only) / OAuth 2LO (M2M) / OAuth 3LO (user-delegated) / IAM SigV4 (AWS-native)
- Exam pattern: user-delegated access → 3LO; M2M backend → 2LO; AWS service tool → SigV4

### Agent Orchestration (ReAct, Human-in-the-Loop, Guardrails)

- **ReAct loop**: FM alternates Reason (rationale) → Act (action prediction) → Observe (result) until `stopReason: end_turn`
- `stopReason: tool_use` → invoke action group, KB, or clarify; `stopReason: end_turn` → return final answer
- **Four stages** (only Orchestration cannot be disabled):
  - Pre-processing: validate/categorise input — can be disabled
  - Orchestration: the ReAct loop — **cannot be disabled**
  - KB response generation: summarise retrieved chunks — can be disabled
  - Post-processing: format final answer — **off by default**, must be explicitly enabled
- **User confirmation**: per-action-group setting; pauses loop; returns `returnControl` + `invocationInputs` to calling application; user sends back CONFIRM or DENY via `sessionState.returnControlInvocationResults.confirmationState`; does **not** apply to KB queries
- **Guardrails**: policy-level content filters; evaluate at every input/output boundary; a violation returns a blocked message and halts that step; charged even when no block occurs
- **Guardrail cost model**: blocked input = guardrail charge only; blocked response = guardrail + FM inference; no block = guardrail + FM inference
- **User confirmation vs guardrails**: complementary — confirmation gates specific irreversible actions on human consent; guardrails enforce content policy across all interactions
- **Prompt injection risk**: tool API responses can contain malicious instructions; user confirmation is a key mitigation
- **Custom orchestration**: Lambda replaces the ReAct engine; first state always = `START`; events: `INVOKE_MODEL`, `INVOKE_ACTION_GROUP`, `FINISH`
- **Advanced prompts**: change what FM sees at each stage; can inject few-shot examples, constraints; Lambda parser can transform raw FM output before agent acts
- Advanced prompts = control *what the FM sees*; custom orchestration = control *when/whether FM is called*
- Orchestration loop has a **maximum step limit** — agent returns error rather than looping indefinitely

### Model Deployment (Lambda, Provisioned Throughput, SageMaker)

> Add notes here

### FM API Integration (Sync/Async, Streaming, Rate Limiting)

> Add notes here

### Model Routing (Static, Dynamic, Content-Based)

> Add notes here

### Enterprise Integration (API Gateway, EventBridge, CI/CD)

> Add notes here

### App Integration (Amplify, Q Business, Bedrock Data Automation)

> Add notes here

### Developer Productivity (Q Developer, X-Ray, Debugging)

> Add notes here
