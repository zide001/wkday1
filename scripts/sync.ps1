Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Invoke-Git {
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]]$GitArgs
    )

    & git @GitArgs
    if ($LASTEXITCODE -ne 0) {
        throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
    }
}

try {
    Invoke-Git status --short

    $Dirty = & git status --porcelain
    if ($LASTEXITCODE -ne 0) {
        throw "git status --porcelain failed with exit code $LASTEXITCODE"
    }
    if ($Dirty) {
        Write-Error "Worktree is dirty. Review, commit, or stash scoped changes before pull --rebase."
        exit 1
    }

    Invoke-Git pull --rebase
    Invoke-Git status --short
} catch {
    Write-Error $_
    exit 1
}
