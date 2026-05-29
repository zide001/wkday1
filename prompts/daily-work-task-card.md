# Daily Work Task Card Prompt

## 用途

用于让 Codex 在任意日常任务开局时快速套用 `daily-work-iteration-protocol.md`，先判断工作对象，再默认走 Full 流程；只根据任务大小压缩展示强度，决定 owner、证据、完成检查和是否沉淀。

适合 PRD、WeCom/TAPD、日报、活动页、XMind、代码、自动化、skill 更新等跨对象任务。小任务可以只心里过一遍，不必把任务卡完整展示给用户。

## 模板

```text
你这次的角色是：日常工作 Orchestrator + 对象 owner。

目标：
- 帮我完成下面这件事。流程默认 Full，但展示强度按任务大小压缩。

任务描述：
-

输入材料：
- 本地文件/目录：
- 在线文档/可见目标：
- 数据/截图/参考：
- 外部动作边界：

先做任务卡：
1. Work object：prd | wecom | tapd | report | automation | prototype | code | diagram | skill | other
2. Owner skill / workflow：
3. Flow：Full
4. Display weight：silent | compact | expanded
5. Evidence needed：
6. Completion check before done：
7. External-visible action? yes/no；如果 yes，先预览并等确认
8. Curation candidate? yes/no；如果 yes，预估写入位置

执行要求：
- Full：state -> handoff -> work -> check -> curate。
- 小任务也走 Full 心智闭环，但只展示必要部分。
- 本机对象检查表可参考 `workflows/agentic-engineering/ae-vela-completion-checks.md`。
- 先读当前状态，不靠记忆猜。
- 保留用户已有改动，不做无关重构。
- 需要 UI/外部系统时，先证明目标，再操作。

不要做：
- 不要为了流程而流程，小任务保持小。
- 不要未经确认提交、发送、发布、push、创建外部可见内容。
- 不要把私密正文、cookie、token、webhook 或完整日志写进长期资产。

验收标准：
- 完成物能被文件、截图、命令、日志、DOM、渲染或可见状态证明。
- 最终说明 Changed / Verified / Not done or risk / Curated。
```

## 使用说明

- 如果用户已经明确说“简明扼要”或只是要一句话，不展示任务卡。
- 如果任务跨多个系统或会延续到下一轮，展示或至少内部维护任务卡。
- 如果真实业务任务暴露可复用摩擦，按 `workflows/agentic-engineering/daily-work-object-field-test-log.md` 记录一条短 field test。
- 如果任务暴露了可复用 lesson，按 `workflows/agentic-engineering/skill-curation-protocol.md` 决定是否写回。
