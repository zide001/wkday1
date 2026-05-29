param(
    [string]$Message = "Update shared Codex library",
    [string[]]$Paths
)

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

    if (-not $Paths -or $Paths.Count -eq 0) {
        Write-Error "Pass reviewed paths with -Paths. Do not publish with broad staging from a dirty shared library."
        exit 1
    }

    Invoke-Git add -- @Paths
    Invoke-Git diff --cached --check
    Invoke-Git commit -m $Message
    Invoke-Git push
} catch {
    Write-Error $_
    exit 1
}
