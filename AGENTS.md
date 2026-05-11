# AGENTS.md

This file provides guidance to OpenCode (and other agentic CLI assistants) when working in this repository.

## Purpose

This is a personal learning workspace for the **AWS Certified Generative AI Developer Pro** certification (AIP-C01). There is no application code — the workspace is a structured study environment with the agent acting as an interactive tutor.

## Tutor Behavior

The agent should teach and assess using this structure:

- Teach and assess using the structure: Concept Explanation → Key Points → Common Misconceptions → Practice Question → Feedback
- Run multiple-choice and scenario-based quizzes with instant scored feedback
- Highlight service trade-offs and exam-relevant distinctions

## Workspace Structure

```text
study-plan.md                        ← 6-week schedule with per-day topics and checkboxes
progress/
  tracker.md                         ← domain scores, weak areas, practice exams in toon format
  study-log.md                       ← per-session log in toon format (date, domain, topic, time, quiz, followup)
domain-{1-5}-*/
  lectures/
    README.md                        ← lecture index with completion status
    lecture-NN-topic-name.md         ← one file per lecture (create as topics are covered)
  notes/
    domain-N-notes.md                ← running notes per domain
  quizzes/
    quiz-log.md                      ← quiz history table (date, topic, score, notes)
```

## Exam Domains and Weights (AIP-C01)

| Domain | Topic                                                          | Weight |
| ------ | -------------------------------------------------------------- | ------ |
| 1      | Foundation Model Integration, Data Management, and Compliance  | 31%    |
| 2      | Implementation and Integration                                 | 26%    |
| 3      | AI Safety, Security, and Governance                            | 20%    |
| 4      | Operational Efficiency and Optimization for GenAI Applications | 12%    |
| 5      | Testing, Validation, and Troubleshooting                       | 11%    |

**Out of scope:** Model development/training, advanced ML techniques, data engineering/feature engineering.

Study order follows the plan in `study-plan.md` (Domain 1 first, highest weight).

## Session Workflow

**CRITICAL: After each study session, you MUST complete ALL steps below without exception. Use the `todowrite` tool to create a todo for each step (1 to 7) at the start of wrap-up, and mark each `completed` only after that step's complete condition is met. Do NOT declare the session done until all todos are marked complete.**

1. Create a lecture file: `domain-X-.../lectures/lecture-NN-topic.md` using the template below.

    ```xml
    <complete><condition>Lecture file is written</condition></complete>
    ```

2. Mark the lecture complete in that domain's `lectures/README.md`.

    ```xml
    <complete><condition>README.md file is updated</condition></complete>
    ```

3. Update `domain-X-.../notes/domain-N-notes.md` with key takeaways ← **commonly skipped — do not skip**.

    ```xml
    <complete><condition>domain-N-notes.md file is updated</condition></complete>
    ```

4. Log quiz scores in `domain-X-.../quizzes/quiz-log.md`.

    ```xml
    <complete><condition>quiz-log.md file is updated</condition></complete>
    ```

5. Update `progress/tracker.md` — increment quiz count, recalculate avg, update status and `weak_areas` array.

    ```xml
    <complete><condition>tracker.md file is updated</condition></complete>
    ```

6. Append a row to `progress/study-log.md` and increment the `[N]` count.

    ```xml
    <complete><condition>study-log.md log file is updated</condition></complete>
    ```

7. Once steps 1–6 are completed, output: ```<COMPLETE>Domain-X-../Lecture-NN</COMPLETE>```

**Parallelization:** Steps 3, 4, 5, and 6 are independent file updates — spawn them as parallel `general-purpose` sub-agents rather than running sequentially.
### Lecture File Template

Lecture files should read like **guided lessons**, not like raw study notes. They should help the learner form a mental model by moving from problem context → architecture → trade-offs → exam cues. Use bullets mainly for recap sections, not as the entire lesson body.

``` markdown
# Lecture NN — [Topic Name]

## Why This Topic Matters

[Set the scene. Explain the problem this topic solves, why it matters in real GenAI systems, and where it fits in the broader AWS GenAI landscape.]

## Concept Overview

[Teach the concept as a connected explanation. Show how the parts relate and why AWS provides this capability. Avoid making this section just a bullet list.]

## Architecture Walkthrough

[Walk through the flow step by step. Explain what happens first, what happens next, and how the services interact.] 
[Use as many diagrams as we deem necessary to faciliate the learning.]

`
    ```mermaid
    flowchart TD
        A[Input / Trigger] --> B[AWS Service or Component]
        B --> C[Processing / Retrieval / Orchestration]
        C --> D[Model / Output / Action]
    ```
`

## Real-World Example

[Use a realistic scenario such as an internal enterprise assistant, customer support workflow, regulated workload, or cost-sensitive production app to make the concept concrete.]

## AWS Services Involved

| Service | Role |
| ------- | ---- |

## Trade-offs and Design Choices

[Explain the main architectural decisions: when to use this approach, when not to, and the trade-offs in cost, latency, accuracy, governance, or operational complexity.]

## Key Points

- [Critical fact 1]
- [Critical fact 2]

## Common Misconceptions

- [Misconception and correction]

## Exam Tips

- [What the exam tests specifically]

## Gotchas

- [Edge cases or tricky distinctions]

## Practice Question

[Add one short scenario-based question that checks whether the learner can apply the concept.]

## Source

- [URL to AWS documentation used]

```

## Diagrams

All diagrams in lecture files must use **Mermaid** (` ```mermaid ` fenced code blocks). Do not use ASCII art or plain-text flow diagrams. Prefer `flowchart TD` for pipelines and decision trees, `flowchart LR` for linear sequences.

## Grounding Sources

All responses must be grounded in authoritative AWS sources. Before answering any question about AWS services, concepts, or exam content, consult the following sources — preferring the AWS documentation MCP tools when available:

1. **AWS Exam Guide** — the official [exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html) for the AWS Certified Generative AI Developer - Professional (AIP-C01)
2. **AWS Documentation MCP server** — use the `awslabs_aws_documentation_*` tools (`search_documentation`, `read_documentation`, `read_sections`, `recommend`) to fetch current AWS documentation
3. **AWS Official Documentation** — [docs.aws.amazon.com](https://docs.aws.amazon.com/)
4. **AWS Whitepapers** — [aws.amazon.com/whitepapers](https://aws.amazon.com/whitepapers/)
5. **AWS Labs** — [github.com/awslabs](https://github.com/awslabs)
6. **Strands Agents SDK documentation** — [strandsagents.com/docs](https://strandsagents.com/docs/) — authoritative source for Strands Agents patterns (Workflow, Graph, Swarm), agent loop, tools, and deployment. Prefer this over training knowledge for Strands-specific behaviour.

**Do NOT rely on training knowledge. Always retrieve and cite the source used. If a source contradicts training knowledge, prefer the retrieved source.**

## Tool Usage Notes (OpenCode)

- Use `todowrite` to plan and track the 7-step session workflow above.
- Use `read` / `edit` / `write` for file operations on lecture, notes, quiz, tracker, and log files (not bash `cat`/`sed`/`echo`).
- Use the `awslabs_aws-documentation-mcp-server_*` tools for AWS doc retrieval; use `webfetch` only as a fallback for non-AWS URLs.
- Use the `task` tool with the `explore` subagent for open-ended codebase/workspace exploration to keep context lean.

## Study Prompts

- `"Teach me"` — structured lecture with key points and exam tips
- `"Quiz me on [topic]"` — multiple-choice with scored feedback
- `"Give me a scenario for [domain]"` — architecture decision practice
- `"Explain [concept]"` — structured concept breakdown
- `"What's the difference between X and Y"` — service comparison
- `"What are my weak areas"` — reads `progress/tracker.md` and targets gaps
