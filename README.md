# wkday1

这是用于在多台电脑上的 Codex 之间同步的共享资料库。

目标：

- 用 Git 保存和同步 Codex 可调用的长期资料。
- 把素材、提示词、项目背景、工作流说明放在同一套目录里。
- 让另一台电脑克隆同一个仓库后，Codex 可以直接读取这些内容。

## 目录

- `materials/`：素材库，放图片、文档、参考资料、数据文件等。
- `knowledge/`：长期知识、个人偏好、项目背景、账号下常用上下文。
- `prompts/`：常用提示词、角色设定、任务模板。
- `workflows/`：固定工作流，例如发布、整理资料、生成内容、复盘。
- `projects/`：项目级资料，每个项目一个子目录。
- `skills/`：本机用户级 Codex skills 备份，可复制到另一台电脑的 `~/.codex/skills/`。
- `inbox/`：临时丢进来的材料，之后再整理归档。
- `scripts/`：同步和检查脚本。

## 另一台电脑接入

在另一台电脑上执行：

```powershell
git clone https://github.com/zide001/wkday1.git
cd wkday1
```

之后两个 Codex 都围绕这个仓库工作：

```powershell
git pull --rebase
git add .
git commit -m "Update shared Codex library"
git push
```

## 使用规则

1. 敏感账号、密码、密钥不要直接提交到 Git。
2. 大文件优先放 `materials/`，如果超过 GitHub 限制，改用 Git LFS 或外部对象存储。
3. 每次重要整理后提交一次，提交说明写清楚变更内容。
4. 另一台电脑开始工作前先 `git pull --rebase`，结束后再 `git push`。
