# PRD 多角色流水线

## 用途

用于把 AE-Vela 的“阶段为骨、角色为肉、交接为筋、知识复利”迁移到日常 PRD 工作。

默认定位：

- 这是 `prd-coach` 的默认工作姿态。
- 所有 PRD 任务都先按 Owner / Writer / Reviewer / Formatter / Curator 分工理解。
- 小需求可以压缩角色和展示过程，但不要取消独立审稿和沉淀判断这两个思维动作。

适用场景：

- 复杂 PRD、跨团队需求、实验策略、上线风险高的需求。
- 用户明确希望“一个写、一个审、一个格式化、最后沉淀经验”。
- 当前 PRD 已经反复改过，但问题散在背景、结构、格式、验收、指标或上线策略里。

不适用场景：

- 只改一句话、改标题、补一个字段。
- 一次性低风险需求，直接用 `prd-coach` 的普通写作/审稿模式即可。

## 角色分工

| 角色 | 负责 | 不负责 | 产物 |
|---|---|---|---|
| Owner / Orchestrator | 明确目标、范围、资料、验收标准、最终拍板 | 不陷入具体措辞 | brief、handoff、最终结论 |
| PRD Writer | 写初稿、补齐规则、流程、异常、指标、验收 | 不自己给自己过审 | clean PRD draft |
| PRD Reviewer | 找业务假设、边界、实现、风险、指标、上线问题 | 不直接重写全文 | verdict + issue list |
| Formatter / Publisher | 适配企业微信/TAPD/Word/PDF 格式 | 不改产品判断 | publish-ready version |
| Curator | 判断经验是否沉淀到 skill/prompt/workflow/knowledge | 不把过程聊天全部沉淀 | curation decision |

## 阶段流程

| 阶段 | 动作 | 退出条件 |
|---|---|---|
| Intake | Owner 明确任务对象、目标、输入材料、截止/场景 | 知道这次是写、审、改、发布还是复盘 |
| Draft | Writer 生成 PRD 初稿 | PRD 主体完整，缺口集中列出 |
| Review | Reviewer 按 rubric 审稿 | 返回 `pass / needs-revision / block` |
| Revise | Writer 只处理必须修改项 | Reviewer 的 blocking issues 已关闭 |
| Format | Formatter 转成目标载体可用格式 | 能粘贴/导入/提交到目标位置 |
| Curate | Owner/Curator 判断沉淀位置 | 明确写入或不写入长期资产 |

## 快速模式

小需求不要走完整流水线，压缩为：

```text
Owner brief -> Writer draft -> Reviewer checklist -> final answer
```

触发完整模式的信号：

- 跨研发/测试/数据/运营多方协作。
- 涉及实验、灰度、回滚、埋点、收益判断。
- 涉及上线风险、权限、合规、结算、付费、数据口径。
- 用户要求输出到企业微信、TAPD 或正式评审文档。
- 已经出现“写了但不够能评审/不够能实现”的反馈。

## Handoff 模板

```yaml
from: owner-orchestrator
to: prd-writer | prd-reviewer | formatter | curator
intent: draft-prd | review-prd | format-prd | curate-learning
target_surface: chat | wecom-doc | tapd | word | pdf
context_pointers:
  - source-doc-or-file-or-visible-target
inputs:
  background: ""
  current_draft: ""
  constraints: []
acceptance_criteria:
  - ""
forbidden:
  - "不要把助手口吻写进正式 PRD"
  - "不要把不确定信息写成已确认事实"
return_format:
  verdict: pass | needs-revision | block
  artifacts: []
  must_fix: []
  optional_improvements: []
  open_questions: []
  curation_candidate: true | false
```

## Reviewer 返回格式

Reviewer 必须先给 verdict：

```text
verdict: pass | needs-revision | block

一句话判断:
必须修改:
可选优化:
缺失信息:
上线/协同风险:
是否需要二次审稿:
```

判断标准：

- `pass`：可以进入格式化/发布，只剩轻微文字优化。
- `needs-revision`：主体方向正确，但存在必须补齐的规则、边界、指标、验收或上线动作。
- `block`：目标/范围/关键事实不清，继续写会误导研发或评审。

## Formatter 检查

格式化不重新做产品判断，只检查目标载体：

- 企业微信 PRD：标题、作者、需求列表、详细需求、固定尾部模块、表格可读。
- TAPD：标题、描述、必填字段、人员字段、富文本/表格保留。
- Word/PDF：字号、标题层级、表格宽度、页数、可读性。
- Chat：先结论，再正文，再复盘建议；正式正文内不要出现助手痕迹。

## Curator 沉淀规则

每次 PRD 完成后问五个问题：

1. 这次是否暴露了一个以后会重复的 PRD 缺口？
2. 这次是否形成了一个可复用模板、检查项、判断阈值或表达模式？
3. 这个经验是 PRD 内容方法，还是 WeCom/TAPD/格式执行经验？
4. 它已经被本次真实任务验证了吗？
5. 写入长期资产会不会让 skill 变臃肿？

归属：

| 经验类型 | 写入位置 |
|---|---|
| PRD 思路、结构、rubric、表达模式 | `skills/prd-coach/` |
| 企业微信粘贴、表格、文档定位、发布细节 | `skills/wecom-doc-editor/` |
| TAPD 字段、草稿、提交、人员选择 | `skills/tapd-prd-draft/` |
| 跨 skill 的 PRD 流水线 | `workflows/agentic-engineering/` |
| 常用启动提示词 | `prompts/` |
| 稳定个人偏好或长期判断 | `knowledge/` |

默认纪律：

- 自动捕获可以宽，长期写入要窄。
- 没有真实验证的经验只进入项目 notes，不升级为 skill 规则。
- 只写能防止未来踩坑或明显加速复用的内容。
- Curator 由 Commander 后台执行；没有可沉淀内容时不提示用户，有窄范围写回时只在最终回复里简短说明。
- 只有跨 skill 大改、默认规则变化、commit/push、外部提交、隐私内容或高风险操作才显式问用户。

## 完成汇报模板

```text
完成情况：
- Writer 做了什么
- Reviewer 判定是什么
- Formatter 产物是否可用
- Curator 判断是否沉淀，以及沉淀到哪里

验证：
- 检查过的文件/页面/渲染/表格/提交状态

风险：
- 仍需用户确认的信息
- 未执行的外部动作
```
