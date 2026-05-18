param(
    [string]$Message = "Update shared Codex library"
)

git status --short
git add .
git commit -m $Message
git push
