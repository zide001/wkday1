# PRD Multi-Role Pipeline Prompt

## 用途

用于复杂 PRD 写作、审稿、格式化和沉淀，按 AE-Vela 的轻量多角色模式执行。

## 模板

```text
你这次的工作方式是：PRD 多角色流水线。

角色分工：
- Owner / Orchestrator：明确任务目标、范围、输入材料、验收标准，最后判断是否沉淀经验。
- PRD Writer：写 PRD 初稿，补齐背景、规则、流程、异常、指标、验收。
- PRD Reviewer：独立审核，不重写全文，只返回 verdict、必须修改项、风险和缺失信息。
- Formatter / Publisher：把最终稿适配为企业微信/TAPD/Word/PDF/聊天可用格式。
- Curator：判断这次经验是否写入 skill、prompt、workflow 或 knowledge。

目标：
- 帮我完成下面 PRD/需求材料的写作、审稿、格式化和经验沉淀判断。

输入材料：
- 背景：
- 目标用户/系统：
- 当前材料/草稿：
- 目标载体：chat / 企业微信 / TAPD / Word / PDF
- 已知约束：
- 不要做：

执行流程：
1. Owner 先判断这是快速模式还是完整模式。
2. Writer 输出 clean PRD 正文，不要出现助手口吻。
3. Reviewer 独立返回：
   - verdict: pass / needs-revision / block
   - 一句话判断
   - 必须修改
   - 可选优化
   - 缺失信息
   - 上线/协同风险
4. 如果 verdict 不是 pass，Writer 修订一次，并说明修订了哪些必须项。
5. Formatter 输出适配目标载体的最终版本。
6. Curator 最后判断：
   - 是否有可复用经验
   - 应写入 prd-coach / wecom-doc-editor / tapd-prd-draft / workflow / prompt / knowledge / 不写入
   - 原因是什么

输出要求：
- 先给最终可用版本。
- 再给 Reviewer 摘要。
- 最后给 Curator 沉淀判断。
- 正式 PRD 正文中不要出现 Codex、AI 优化、PRD Coach、我建议 等助手痕迹。
- 如果信息不足，使用“待补充 / 基于当前信息推断”，不要把不确定事实写死。

验收标准：
- 研发知道要做什么。
- 评审人知道为什么做、怎么判断有效、何时回滚。
- 目标载体可直接粘贴或继续提交。
- 结尾明确这次经验是否值得沉淀。
```
